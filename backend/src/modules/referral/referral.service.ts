
import prisma from '../../shared/prisma';
import { v4 as uuidv4 } from 'uuid';
import { WalletService } from '../wallet/wallet.service';

export class ReferralService {

    // 1. Generate Referral Code (If one doesn't exist)
    static async generateReferralCode(userId: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('User not found');

        if (user.referral_code) return user.referral_code;

        // Generate Code: First 4 letters of name + Random
        const base = (user.full_name || 'USER').slice(0, 4).toUpperCase().replace(/\s/g, '');
        const random = Math.floor(1000 + Math.random() * 9000);
        const code = `${base}${random}`;

        // Save
        await prisma.user.update({
            where: { id: userId },
            data: { referral_code: code }
        });

        return code;
    }

    // 2. Apply Code (When Refree signs up or manually enters)
    static async applyReferralCode(refereeId: string, code: string) {
        // Find Referrer
        const referrer = await prisma.user.findUnique({ where: { referral_code: code } });
        if (!referrer) throw new Error('Invalid Referral Code');

        if (referrer.id === refereeId) throw new Error('Cannot refer yourself');

        // Check if Referee already referred
        const existing = await prisma.referral.findUnique({ where: { referee_id: refereeId } });
        if (existing) throw new Error('User already referred');

        // Create Referral Record
        const referral = await prisma.referral.create({
            data: {
                referrer_id: referrer.id,
                referee_id: refereeId,
                status: 'PENDING'
            }
        });

        // Trigger Instant Reward (₹100 to both) as per requirement
        await this.distributeRewards(referral.id);

        return referral;
    }

    // 3. Reward Logic
    private static async distributeRewards(referralId: string) {
        const referral = await prisma.referral.findUnique({ where: { id: referralId } });
        if (!referral || referral.status === 'COMPLETED') return;

        const rewardAmount = Number(referral.reward_amount); // 100

        // Transaction
        await prisma.$transaction(async (tx) => {
            // Credit Referrer
            await WalletService.addCredits(referral.referrer_id, rewardAmount, 'CREDIT', `Referral Bonus: ${referral.referee_id}`, tx);

            // Credit Referee
            await WalletService.addCredits(referral.referee_id, rewardAmount, 'CREDIT', `Welcome Bonus (Ref: ${referral.referrer_id})`, tx);

            // Update Status
            await tx.referral.update({
                where: { id: referralId },
                data: {
                    status: 'COMPLETED',
                    completed_at: new Date()
                }
            });
        });
    }

    // 4. Get Stats
    static async getReferralStats(userId: string) {
        const count = await prisma.referral.count({ where: { referrer_id: userId } });
        const earned = count * 100; // Simplified
        return { count, earned };
    }
}
