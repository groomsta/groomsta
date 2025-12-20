
import { Request, Response } from 'express';
import { PayoutService } from './payout.service';

export const calculatePayouts = async (req: Request, res: Response) => {
    try {
        // Admin only? Or Cron Job trigger.
        const payouts = await PayoutService.calculateWeeklyPayouts();
        res.status(200).json({ success: true, count: payouts.length, payouts });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const initiateTransfer = async (req: Request, res: Response) => {
    try {
        const { payoutId } = req.body;
        const result = await PayoutService.initiateTransfer(payoutId);
        res.status(200).json({ success: true, message: 'Transfer Initiated', data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const verifyTransfer = async (req: Request, res: Response) => {
    try {
        const { payoutId } = req.body;
        // Mock verification
        const result = await PayoutService.verifyPayout(payoutId);
        res.status(200).json({ success: true, message: 'Transfer Verified', data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getMyPayouts = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const partnerId = req.user?.userId; // From Auth Middleware
        if (!partnerId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const payouts = await PayoutService.getPartnerPayouts(partnerId);
        res.status(200).json({ success: true, payouts });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPartnerPayoutsById = async (req: Request, res: Response) => {
    try {
        const { partnerId } = req.params;
        const payouts = await PayoutService.getPartnerPayouts(partnerId);
        res.status(200).json({ success: true, payouts });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
