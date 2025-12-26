
import { Request, Response } from 'express';
import { MembershipService } from './membership.service';

export const getPlans = async (req: Request, res: Response) => {
    try {
        const plans = await MembershipService.getPlans();
        res.status(200).json({ success: true, plans });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const subscribe = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const { planId, razorpaySubscriptionId } = req.body;

        const sub = await MembershipService.subscribeUser(userId, planId, razorpaySubscriptionId);
        res.status(200).json({ success: true, message: 'Subscribed successfully', subscription: sub });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getBenefits = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const benefits = await MembershipService.getUserBenefits(userId);
        res.status(200).json({ success: true, benefits });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
