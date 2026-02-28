import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const sendOtpSchema = z.object({
    phone: z.string().min(10).max(15),
    purpose: z.enum(["login", "registration", "verification"]).default("login"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = sendOtpSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid phone number or purpose" }, { status: 400 });
        }

        const { phone, purpose } = parsed.data;

        // Generate a 4-digit OTP
        const otp = process.env.NODE_ENV === "production"
            ? Math.floor(1000 + Math.random() * 9000).toString()
            : "1234"; // Default OTP for development

        // Expire old non-used OTPs for this phone
        await prisma.otpVerification.updateMany({
            where: { phone, isUsed: false },
            data: { isUsed: true },
        });

        // Create new OTP record
        await prisma.otpVerification.create({
            data: {
                phone,
                otp,
                purpose,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
            },
        });

        // TODO: Integrate actual SMS Gateway (Twilio/MSG91) here when credentials are provided
        console.log(`[SMS-STUB] Sent OTP ${otp} to ${phone}`);

        return NextResponse.json({
            success: true,
            message: "OTP sent successfully",
            // Include OTP in dev environment only for easy testing
            ...(process.env.NODE_ENV !== "production" ? { mockOtp: otp } : {}),
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
    }
}
