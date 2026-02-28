import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/bookings/[bookingId] — Get booking detail
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ bookingId: string }> }
) {
    try {
        const { bookingId } = await params;

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                user: {
                    select: { id: true, fullName: true, phone: true, profileImageUrl: true },
                },
                partner: {
                    select: {
                        id: true,
                        fullName: true,
                        phone: true,
                        profileImageUrl: true,
                        averageRating: true,
                        totalJobsCompleted: true,
                    },
                },
                address: true,
                addons: true,
                statusHistory: {
                    orderBy: { createdAt: "asc" },
                },
                reviews: {
                    select: { id: true, overallRating: true, reviewText: true, createdAt: true },
                },
                payments: {
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        paymentType: true,
                        paymentMethod: true,
                        amount: true,
                        paymentStatus: true,
                        completedAt: true,
                    },
                },
            },
        });

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(booking);
    } catch (error) {
        console.error("Error fetching booking:", error);
        return NextResponse.json(
            { error: "Failed to fetch booking" },
            { status: 500 }
        );
    }
}

// PUT /api/bookings/[bookingId] — Cancel booking
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ bookingId: string }> }
) {
    try {
        const { bookingId } = await params;
        const body = await req.json();
        const { action, userId, reason } = body;

        if (action !== "cancel") {
            return NextResponse.json(
                { error: "Only 'cancel' action is supported" },
                { status: 400 }
            );
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { payments: true },
        });

        if (!booking) {
            return NextResponse.json(
                { error: "Booking not found" },
                { status: 404 }
            );
        }

        // Can only cancel pending or accepted bookings
        if (!["pending", "accepted"].includes(booking.status)) {
            return NextResponse.json(
                { error: `Cannot cancel a booking with status '${booking.status}'` },
                { status: 400 }
            );
        }

        // Calculate refund based on cancellation timing
        const hoursUntilBooking = (new Date(booking.bookingDate).getTime() - Date.now()) / (1000 * 60 * 60);
        let refundPercent = 100;
        if (hoursUntilBooking < 2) {
            refundPercent = 0; // No refund if less than 2 hours
        } else if (hoursUntilBooking < 6) {
            refundPercent = 50; // 50% refund if 2-6 hours before
        }

        const refundAmount = Number(booking.totalAmount) * refundPercent / 100;

        // Process cancellation in transaction
        const updatedBooking = await prisma.$transaction(async (tx) => {
            // Update booking status
            const updated = await tx.booking.update({
                where: { id: bookingId },
                data: {
                    status: "cancelled",
                    paymentStatus: refundAmount > 0 ? "refund_pending" : booking.paymentStatus,
                },
            });

            // Add status history
            await tx.bookingStatusHistory.create({
                data: {
                    bookingId,
                    fromStatus: booking.status,
                    toStatus: "cancelled",
                    changedByUserId: userId || booking.userId,
                    notes: reason || "Cancelled by customer",
                },
            });

            // Create refund record if applicable
            if (refundAmount > 0 && booking.payments.length > 0) {
                const payment = booking.payments[0];
                await tx.refund.create({
                    data: {
                        paymentId: payment.id,
                        bookingId,
                        userId: booking.userId,
                        refundAmount,
                        refundType: refundPercent === 100 ? "full" : "partial",
                        refundMethod: "wallet", // Default to wallet refund
                        refundStatus: "pending",
                        reason: reason || "Customer cancellation",
                        initiatedBy: "customer",
                    },
                });
            }

            // Notify user
            await tx.notification.create({
                data: {
                    userId: booking.userId,
                    notificationType: "booking_cancelled",
                    title: "Booking Cancelled",
                    message: refundAmount > 0
                        ? `Your booking ${booking.bookingNumber} has been cancelled. ₹${refundAmount.toFixed(0)} will be refunded to your wallet.`
                        : `Your booking ${booking.bookingNumber} has been cancelled.`,
                    channels: ["push", "email"],
                    bookingId,
                },
            });

            return updated;
        });

        return NextResponse.json({
            success: true,
            booking: {
                id: updatedBooking.id,
                bookingNumber: updatedBooking.bookingNumber,
                status: updatedBooking.status,
            },
            refund: {
                amount: refundAmount,
                percentage: refundPercent,
                method: "wallet",
            },
            message: refundAmount > 0
                ? `Booking cancelled. ₹${refundAmount.toFixed(0)} refund (${refundPercent}%) will be processed.`
                : "Booking cancelled. No refund applicable for late cancellations.",
        });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return NextResponse.json(
            { error: "Failed to cancel booking" },
            { status: 500 }
        );
    }
}
