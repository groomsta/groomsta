import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/notifications?userId=xxx — Get user's notifications
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const unreadOnly = searchParams.get("unreadOnly") === "true";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const where = {
            userId,
            ...(unreadOnly ? { isRead: false } : {}),
        };

        const [notifications, total, unreadCount] = await Promise.all([
            prisma.notification.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.notification.count({ where }),
            prisma.notification.count({
                where: { userId, isRead: false },
            }),
        ]);

        return NextResponse.json({
            notifications,
            unreadCount,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}

// PUT /api/notifications — Mark notifications as read
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { notificationIds, userId, markAllRead } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        if (markAllRead) {
            // Mark all unread notifications as read
            await prisma.notification.updateMany({
                where: { userId, isRead: false },
                data: { isRead: true, readAt: new Date() },
            });

            return NextResponse.json({
                success: true,
                message: "All notifications marked as read",
            });
        }

        if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
            return NextResponse.json(
                { error: "notificationIds array is required" },
                { status: 400 }
            );
        }

        await prisma.notification.updateMany({
            where: {
                id: { in: notificationIds },
                userId, // Ensure user can only mark their own notifications
            },
            data: { isRead: true, readAt: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: `${notificationIds.length} notification(s) marked as read`,
        });
    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json(
            { error: "Failed to update notifications" },
            { status: 500 }
        );
    }
}
