
import prisma from '../../shared/prisma';
import { PayoutStatus } from '@prisma/client';
// import { razorpay } from '../../config/razorpay'; // Assume shared razorpay instance if available

export class PayoutService {

    // 1. Calculate Weekly Payouts
    static async calculateWeeklyPayouts() {
        // Logic: Find all transactions/bookings for past week where payout hasn't been processed.
        // For 'Dev 1' scope, we might mock the data aggregation or use Wallet Balance.

        // Simplified Logic: Fetch all Partners (Role=PARTNER) pending payouts.
        const partners = await prisma.user.findMany({
            where: { role: 'PARTNER' },
            include: { wallet: true }
        });

        const newPayouts = [];

        for (const partner of partners) {
            if (!partner.wallet) continue;

            const balance = Number(partner.wallet.balance);
            if (balance <= 0) continue;

            // DEDUCT 20% COMMISSION
            const commissionRate = 0.20;
            const payoutAmount = balance * (1 - commissionRate);

            // Create Payout Record
            const payout = await prisma.payout.create({
                data: {
                    partner_id: partner.id,
                    amount: payoutAmount,
                    status: 'PENDING',
                    cycle_start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last week
                    cycle_end: new Date()
                }
            });

            newPayouts.push(payout);
        }

        return newPayouts;
    }

    // 2. Initiate Transfer (Razorpay Payouts)
    static async initiateTransfer(payoutId: string) {
        const payout = await prisma.payout.findUnique({ where: { id: payoutId } });
        if (!payout || payout.status !== 'PENDING') {
            throw new Error('Invalid Payout or not in Pending state');
        }

        // --- RAZORPAY X LOGIC START ---
        // In real dev, we call razorpay.payouts.create({ account_number, amount... })
        // Here we simulate success for Dev 1.

        const mockTransferId = `payout_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        // --- RAZORPAY X LOGIC END ---

        // Update DB
        const updated = await prisma.payout.update({
            where: { id: payoutId },
            data: {
                status: 'PROCESSING',
                razorpay_payout_id: mockTransferId
            }
        });

        return updated;
    }

    // 3. Verify status (Webhook or Polling)
    static async verifyPayout(payoutId: string) {
        // Simulate marking as completed
        return await prisma.payout.update({
            where: { id: payoutId },
            data: { status: 'COMPLETED' }
        });
    }

    // 4. Get Partner Payouts
    static async getPartnerPayouts(partnerId: string) {
        return await prisma.payout.findMany({
            where: { partner_id: partnerId },
            orderBy: { created_at: 'desc' }
        });
    }
}
