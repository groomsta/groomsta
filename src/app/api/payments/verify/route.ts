import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const verifyPaymentSchema = z.object({
    razorpayOrderId: z.string(),
    razorpayPaymentId: z.string(),
    razorpaySignature: z.string(),
    paymentId: z.string().uuid(), // Internal DB ID
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = verifyPaymentSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid payment verification data" },
                { status: 400 }
            );
        }

        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId } = parsed.data;

        // TODO: Incorporate actual crypto SHA256 HMAC signature verification with Razorpay Secret
        // const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(razorpayOrderId + '|' + razorpayPaymentId).digest('hex');
        // if (expectedSignature !== razorpaySignature) { return error }

        const isSignatureValid = true; // Assuming valid for mock/dev

        if (!isSignatureValid) {
            // Mark payment failed
            await prisma.payment.update({
                where: { id: paymentId },
                data: { paymentStatus: "failed" },
            });

            return NextResponse.json({ error: "Invalid signature, payment verification failed" }, { status: 400 });
        }

        // Process valid payment inside a transaction
        await prisma.$transaction(async (tx) => {
            // 1. Update Payment record
            const payment = await tx.payment.update({
                where: { id: paymentId },
                data: {
                    paymentStatus: "completed",
                    completedAt: new Date(),
                    gatewayPaymentId: razorpayPaymentId, // Optionally update with the actual payment ref
                },
            });

            // 2. Update Booking Status (assuming booking moves to accepted or confirmed upon payment)
            await tx.booking.update({
                where: { id: payment.bookingId },
                data: {
                    paymentStatus: "completed",
                    status: "accepted", // In a live flow, maybe pending broadcast
                },
            });

            // 3. Status History 
            await tx.bookingStatusHistory.create({
                data: {
                    bookingId: payment.bookingId,
                    fromStatus: "pending",
                    toStatus: "accepted",
                    changedByUserId: payment.userId,
                    notes: "Payment completed successfully",
                }
            });

            // 4. Notify customer
            await tx.notification.create({
                data: {
                    userId: payment.userId,
                    notificationType: "payment_success",
                    title: "Payment Received",
                    message: `We received your payment of ₹${payment.amount} for booking ${payment.bookingId}.`,
                    channels: ["email", "push"],
                    bookingId: payment.bookingId,
                }
            });
        });

        return NextResponse.json({
            success: true,
            message: "Payment verified and booking updated successfully",
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { error: "Failed to verify payment" },
            { status: 500 }
        );
    }
}
