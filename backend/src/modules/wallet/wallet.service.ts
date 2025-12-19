import { Prisma } from '@prisma/client';
import prisma from '../../shared/prisma';

export class WalletService {

    // Get or Create Wallet
    public static async getWallet(userId: string) {
        let wallet = await prisma.wallet.findUnique({
            where: { user_id: userId },
            include: { transactions: { orderBy: { created_at: 'desc' } } }
        });

        if (!wallet) {
            wallet = await prisma.wallet.create({
                data: {
                    user_id: userId,
                    balance: 0.00
                },
                include: { transactions: true }
            });
        }
        return wallet;
    }

    // Add Credits
    public static async addCredits(userId: string, amount: number, description: string, referenceId?: string) {
        // Transaction to ensure atomicity
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const wallet = await tx.wallet.findUnique({ where: { user_id: userId } });
            if (!wallet) throw new Error('Wallet not found');

            const newBalance = new Prisma.Decimal(wallet.balance).plus(amount);

            await tx.wallet.update({
                where: { user_id: userId },
                data: { balance: newBalance }
            });

            await tx.walletTransaction.create({
                data: {
                    wallet_id: wallet.id,
                    amount: new Prisma.Decimal(amount),
                    type: 'CREDIT',
                    description,
                    reference_id: referenceId
                }
            });

            return newBalance;
        });
    }

    // Deduct
    public static async deductCredits(userId: string, amount: number, description: string, referenceId?: string) {
        return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const wallet = await tx.wallet.findUnique({ where: { user_id: userId } });
            if (!wallet) throw new Error('Wallet not found');

            if (new Prisma.Decimal(wallet.balance).lessThan(amount)) {
                throw new Error('Insufficient wallet balance');
            }

            const newBalance = new Prisma.Decimal(wallet.balance).minus(amount);

            await tx.wallet.update({
                where: { user_id: userId },
                data: { balance: newBalance }
            });

            await tx.walletTransaction.create({
                data: {
                    wallet_id: wallet.id,
                    amount: new Prisma.Decimal(amount),
                    type: 'DEBIT',
                    description,
                    reference_id: referenceId
                }
            });

            return newBalance;
        });
    }
}
