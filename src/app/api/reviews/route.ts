import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// POST /api/reviews — Create a review for a completed booking
const createReviewSchema = z.object({
    bookingId: z.string().uuid(),
    userId: z.string().uuid(),
    overallRating: z.number().min(1).max(5),
    professionalismRating: z.number().min(1).max(5).optional(),
    qualityRating: z.number().min(1).max(5).optional(),
    punctualityRating: z.number().min(1).max(5).optional(),
    reviewText: z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = createReviewSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid review data", details: parsed.error.issues },
                { status: 400 }
            );
        }

        const data = parsed.data;

        // Verify booking exists and belongs to the user
        const booking = await prisma.booking.findUnique({
            where: { id: data.bookingId },
            include: { reviews: true },
        });

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        if (booking.userId !== data.userId) {
            return NextResponse.json(
                { error: "You can only review your own bookings" },
                { status: 403 }
            );
        }

        if (booking.status !== "completed") {
            return NextResponse.json(
                { error: "Can only review completed bookings" },
                { status: 400 }
            );
        }

        if (booking.reviews.length > 0) {
            return NextResponse.json(
                { error: "This booking has already been reviewed" },
                { status: 409 }
            );
        }

        if (!booking.partnerId) {
            return NextResponse.json(
                { error: "No partner assigned to this booking" },
                { status: 400 }
            );
        }

        // Create review and update partner rating in a transaction
        const review = await prisma.$transaction(async (tx) => {
            const newReview = await tx.review.create({
                data: {
                    bookingId: data.bookingId,
                    userId: data.userId,
                    partnerId: booking.partnerId!,
                    overallRating: data.overallRating,
                    professionalismRating: data.professionalismRating ?? null,
                    qualityRating: data.qualityRating ?? null,
                    punctualityRating: data.punctualityRating ?? null,
                    reviewText: data.reviewText ?? null,
                },
            });

            // Update partner's average rating
            const ratingStats = await tx.review.aggregate({
                where: { partnerId: booking.partnerId! },
                _avg: { overallRating: true },
                _count: { id: true },
            });

            await tx.partner.update({
                where: { id: booking.partnerId! },
                data: {
                    averageRating: ratingStats._avg.overallRating ?? 0,
                    totalRatings: ratingStats._count.id,
                },
            });

            // Notify partner about the review
            await tx.notification.create({
                data: {
                    partnerId: booking.partnerId!,
                    notificationType: "new_review",
                    title: "New Review Received!",
                    message: `You received a ${data.overallRating}-star review for booking ${booking.bookingNumber}.`,
                    channels: ["push"],
                    bookingId: data.bookingId,
                },
            });

            return newReview;
        });

        return NextResponse.json({
            success: true,
            review: {
                id: review.id,
                overallRating: review.overallRating,
                reviewText: review.reviewText,
            },
            message: "Thank you for your review!",
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json(
            { error: "Failed to create review" },
            { status: 500 }
        );
    }
}

// GET /api/reviews?serviceId=xxx or ?partnerId=xxx
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const serviceId = searchParams.get("serviceId");
        const partnerId = searchParams.get("partnerId");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        let where: Record<string, unknown> = { isVisible: true };

        if (serviceId) {
            where = { ...where, booking: { serviceId } };
        } else if (partnerId) {
            where = { ...where, partnerId };
        } else {
            return NextResponse.json(
                { error: "serviceId or partnerId is required" },
                { status: 400 }
            );
        }

        const [reviews, total] = await Promise.all([
            prisma.review.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    user: {
                        select: { fullName: true, profileImageUrl: true },
                    },
                },
            }),
            prisma.review.count({ where }),
        ]);

        // Aggregate rating stats
        const stats = await prisma.review.aggregate({
            where,
            _avg: { overallRating: true },
            _count: { id: true },
        });

        // Rating distribution
        const distribution = await Promise.all(
            [5, 4, 3, 2, 1].map(async (stars) => ({
                stars,
                count: await prisma.review.count({
                    where: { ...where, overallRating: stars },
                }),
            }))
        );

        return NextResponse.json({
            reviews,
            stats: {
                averageRating: stats._avg.overallRating ?? 0,
                totalReviews: stats._count.id,
                distribution,
            },
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}
