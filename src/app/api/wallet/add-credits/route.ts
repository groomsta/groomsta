import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const addCreditsSchema = z.object({
    userId: z.string().uuid(),
    amount: z.number().positive(),
    reason: z.string().max(255),
    referenceId: z.string().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = addCreditsSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid credit data", details: parsed.error.issues },
                { status: 400 }
            );
        }

        const data = parsed.data;

        const result = await prisma.$transaction(async (tx) => {
            let wallet = await tx.userWallet.findUnique({
                where: { userId: data.userId },
            });

            if (!wallet) {
                wallet = await tx.userWallet.create({
                    data: { userId: data.userId, balance: 0 },
                });
            }

            // Update balance
            const updatedWallet = await tx.userWallet.update({
                where: { id: wallet.id },
                data: { balance: { increment: data.amount } },
            });

            // Record transaction
            const transaction = await tx.walletTransaction.create({
                data: {
                    walletId: wallet.id,
                    userId: data.userId,
                    amount: data.amount,
                    balanceBefore: wallet.balance,
                    balanceAfter: updatedWallet.balance,
                    transactionType: "credit",
                    description: data.reason,
                    metadata: data.referenceId ? { referenceId: data.referenceId } : undefined,
                },
            });

            // Notify User
            await tx.notification.create({
                data: {
                    userId: data.userId,
                    notificationType: "wallet_credit",
                    title: "Wallet Credited!",
                    message: `₹${data.amount} has been added to your wallet for: ${data.reason}.`,
                    channels: ["push"],
                }
            });

            return { wallet: updatedWallet, transaction };
        });

        return NextResponse.json({
            success: true,
            balance: result.wallet.balance,
            transaction: result.transaction,
            message: `Successfully added ₹${data.amount} to wallet`,
        });
    } catch (error) {
        console.error("Error adding wallet credits:", error);
        return NextResponse.json(
            { error: "Failed to add credits to wallet" },
            { status: 500 }
        );
    }
}
