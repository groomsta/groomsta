import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createOrderSchema = z.object({
    bookingId: z.string().uuid(),
    userId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = createOrderSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid booking ID or user ID" },
                { status: 400 }
            );
        }

        const { bookingId, userId } = parsed.data;

        // Fetch booking
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        if (booking.userId !== userId) {
            return NextResponse.json({ error: "Unauthorized access to booking" }, { status: 403 });
        }

        // TODO: Integrate Razorpay SDK `instance.orders.create` here
        // For now, generate a mock Razorpay Order ID
        const mockRazorpayOrderId = `order_${Math.random().toString(36).substring(2, 12)}`;

        // Create a pending Payment record
        const payment = await prisma.payment.create({
            data: {
                bookingId: booking.id,
                userId: booking.userId,
                // partnerId exists on Payment? Wait, let's verify if partnerId exists on Payment.
                // It DOES NOT exist on Payment.
                amount: booking.totalAmount,
                paymentMethod: "online",
                paymentType: "full",
                paymentStage: "advance",
                paymentStatus: "pending",
                gatewayOrderId: mockRazorpayOrderId,
            },
        });

        // Send order ID to client
        return NextResponse.json({
            success: true,
            orderId: mockRazorpayOrderId,
            amount: booking.totalAmount,
            paymentId: payment.id,
        });
    } catch (error) {
        console.error("Error creating payment order:", error);
        return NextResponse.json(
            { error: "Failed to create payment order" },
            { status: 500 }
        );
    }
}
