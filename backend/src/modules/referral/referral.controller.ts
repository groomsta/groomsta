
import { Request, Response } from 'express';
import { ReferralService } from './referral.service';

export const generateCode = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const code = await ReferralService.generateReferralCode(userId);
        res.status(200).json({ success: true, code });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const applyCode = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const { code } = req.body;

        const result = await ReferralService.applyReferralCode(userId, code);
        res.status(200).json({ success: true, message: 'Referral Applied', data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getStats = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const stats = await ReferralService.getReferralStats(userId);
        res.status(200).json({ success: true, stats });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
