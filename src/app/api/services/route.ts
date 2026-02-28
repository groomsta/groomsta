import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/services — List all active categories with subcategories and services
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type"); // home, salon, or null for all
        const categorySlug = searchParams.get("category");

        // If a specific category slug is provided, return its subcategories and services
        if (categorySlug) {
            const category = await prisma.serviceCategory.findUnique({
                where: { slug: categorySlug },
                include: {
                    subcategories: {
                        where: { isActive: true },
                        orderBy: { displayOrder: "asc" },
                        include: {
                            services: {
                                where: {
                                    isActive: true,
                                    ...(type ? { serviceType: type } : {}),
                                },
                                orderBy: { displayOrder: "asc" },
                                include: {
                                    variants: { where: { isActive: true } },
                                    addons: { where: { isActive: true } },
                                },
                            },
                        },
                    },
                },
            });

            if (!category) {
                return NextResponse.json(
                    { error: "Category not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(category);
        }

        // Default: Return all categories with their subcategories
        const categories = await prisma.serviceCategory.findMany({
            where: { isActive: true },
            orderBy: { displayOrder: "asc" },
            include: {
                subcategories: {
                    where: { isActive: true },
                    orderBy: { displayOrder: "asc" },
                    include: {
                        _count: { select: { services: true } },
                    },
                },
            },
        });

        return NextResponse.json({ categories });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}
