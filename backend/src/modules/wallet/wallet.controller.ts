import { Request, Response } from 'express';
import { WalletService } from './wallet.service';
import { AuthRequest } from '../../middleware/auth.middleware';

export const getBalance = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthRequest).user;
        if (!user) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        const wallet = await WalletService.getWallet(user.userId);
        res.status(200).json({ success: true, balance: wallet.balance, currency: wallet.currency, transactions: wallet.transactions });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addCredits = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthRequest).user;
        if (!user) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        const { amount, description, referenceId } = req.body;

        // In real world, adding credits usually comes from Payment Webhook or Admin.
        // For Dev 1 scope "Referral rewards", we allow it here but maybe restrict role?
        // Assuming open for testing or internal logic.

        await WalletService.addCredits(user.userId, amount, description || 'Manual Credit', referenceId);
        res.status(200).json({ success: true, message: 'Credits added' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deductCredits = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthRequest).user;
        if (!user) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        const { amount, description, referenceId } = req.body;

        await WalletService.deductCredits(user.userId, amount, description || 'Purchase', referenceId);
        res.status(200).json({ success: true, message: 'Credits deducted' });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};
