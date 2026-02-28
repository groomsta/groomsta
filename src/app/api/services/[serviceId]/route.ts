import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/services/[serviceId] — Get service detail with variants, addons, and reviews
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ serviceId: string }> }
) {
    try {
        const { serviceId } = await params;

        const service = await prisma.service.findUnique({
            where: { id: serviceId },
            include: {
                subcategory: {
                    include: {
                        category: {
                            select: { id: true, name: true, slug: true },
                        },
                    },
                },
                variants: { where: { isActive: true } },
                addons: { where: { isActive: true } },
                partnerServices: {
                    where: { isAvailable: true },
                    include: {
                        partner: {
                            select: {
                                id: true,
                                fullName: true,
                                profileImageUrl: true,
                                averageRating: true,
                                totalRatings: true,
                                totalJobsCompleted: true,
                            },
                        },
                    },
                },
            },
        });

        if (!service) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }

        // Fetch aggregated review stats for this service (via bookings)
        const reviewStats = await prisma.review.aggregate({
            where: {
                booking: { serviceId },
                isVisible: true,
            },
            _avg: { overallRating: true },
            _count: { id: true },
        });

        // Fetch recent reviews
        const recentReviews = await prisma.review.findMany({
            where: {
                booking: { serviceId },
                isVisible: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: {
                user: {
                    select: { fullName: true, profileImageUrl: true },
                },
            },
        });

        return NextResponse.json({
            ...service,
            reviewStats: {
                averageRating: reviewStats._avg.overallRating ?? 0,
                totalReviews: reviewStats._count.id,
            },
            recentReviews,
        });
    } catch (error) {
        console.error("Error fetching service detail:", error);
        return NextResponse.json(
            { error: "Failed to fetch service" },
            { status: 500 }
        );
    }
}
