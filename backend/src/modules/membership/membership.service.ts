
import prisma from '../../shared/prisma';
import { SubscriptionStatus } from '@prisma/client';

export class MembershipService {

    // 1. Subscribe User to a Plan
    static async subscribeUser(userId: string, planId: string, razorpaySubId?: string) {
        const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });
        if (!plan) throw new Error('Invalid Membership Plan');

        // Calculate End Date
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + plan.duration_days);

        // Deactivate old active subscriptions? (Optional business logic)
        // For now, allow multiple, but best practice is to expire old ones.

        const subscription = await prisma.userSubscription.create({
            data: {
                user_id: userId,
                plan_id: planId,
                start_date: startDate,
                end_date: endDate,
                status: 'ACTIVE',
                razorpay_sub_id: razorpaySubId
            }
        });

        return subscription;
    }

    // 2. Get User Benefits (Check for Active Subscription)
    static async getUserBenefits(userId: string) {
        // Find ACTIVE subscription that hasn't expired
        const sub = await prisma.userSubscription.findFirst({
            where: {
                user_id: userId,
                status: 'ACTIVE',
                end_date: { gt: new Date() } // Not expired
            },
            include: { plan: true },
            orderBy: { created_at: 'desc' }
        });

        if (!sub) {
            return { hasMembership: false, discount: 0 };
        }

        return {
            hasMembership: true,
            planName: sub.plan.name,
            discount: sub.plan.discount_percent,
            validUntil: sub.end_date
        };
    }

    // 3. List Plans (Public)
    static async getPlans() {
        return await prisma.membershipPlan.findMany({ where: { is_active: true } });
    }
}
