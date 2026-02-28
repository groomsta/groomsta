import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import crypto from "crypto";

const verifyOtpSchema = z.object({
    phone: z.string().min(10).max(15),
    otp: z.string().length(4),
    role: z.enum(["customer", "partner"]).default("customer"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = verifyOtpSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid OTP format or phone number" }, { status: 400 });
        }

        const { phone, otp, role } = parsed.data;

        // Find the latest valid OTP
        const otpRecord = await prisma.otpVerification.findFirst({
            where: {
                phone,
                isUsed: false,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: "desc" },
        });

        if (!otpRecord) {
            return NextResponse.json({ error: "OTP expired or not requested" }, { status: 400 });
        }

        if (otpRecord.otp !== otp) {
            // Increment attempts
            await prisma.otpVerification.update({
                where: { id: otpRecord.id },
                data: { attempts: otpRecord.attempts + 1 },
            });
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        // Mark OTP as used
        await prisma.otpVerification.update({
            where: { id: otpRecord.id },
            data: { isUsed: true },
        });

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { phone },
            include: { wallet: true },
        });

        const isExistingUser = !!user;

        if (!user) {
            user = await prisma.user.create({
                data: { phone, isVerified: true },
                include: { wallet: true },
            });

            // Initialize wallet for new user
            await prisma.userWallet.create({
                data: {
                    userId: user.id,
                    balance: 0,
                }
            });
        }

        // If partner role, verify Partner record exists or needs to be onboarded
        let partnerId = null;
        if (role === "partner") {
            const partner = await prisma.partner.findUnique({
                where: { phone },
            });
            if (partner) {
                partnerId = partner.id;
            }
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        // Generate session token (mocking JWT with secure crypto string for MVP)
        const token = crypto.randomBytes(32).toString("hex");

        // Setup session
        await prisma.userSession.create({
            data: {
                userId: user.id,
                partnerId,
                refreshToken: token,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            }
        });

        // TODO: When integrating standard auth library (NextAuth/IronSession), set HTTP-only cookies here

        return NextResponse.json({
            success: true,
            message: "Authentication successful",
            user: {
                id: user.id,
                phone: user.phone,
                fullName: user.fullName,
                isExistingUser,
                role: partnerId ? "partner" : "customer",
                partnerId,
            },
            token, // Return token for client-side storage (standard SPA flow)
        });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
    }
}
