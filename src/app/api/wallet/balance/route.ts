import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        let wallet = await prisma.userWallet.findUnique({
            where: { userId },
        });

        // Auto-initialize wallet if it somehow doesn't exist
        if (!wallet) {
            wallet = await prisma.userWallet.create({
                data: { userId, balance: 0 },
            });
        }

        const recentTransactions = await prisma.walletTransaction.findMany({
            where: { walletId: wallet.id },
            orderBy: { createdAt: "desc" },
            take: 10,
        });

        return NextResponse.json({
            balance: wallet.balance,
            transactions: recentTransactions,
        });
    } catch (error) {
        console.error("Error fetching wallet balance:", error);
        return NextResponse.json(
            { error: "Failed to fetch wallet information" },
            { status: 500 }
        );
    }
}
