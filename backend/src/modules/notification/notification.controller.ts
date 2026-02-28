import { Request, Response } from 'express';
import { NotificationService } from '../../shared/notification.queue';

export const sendNotification = async (req: Request, res: Response) => {
    try {
        const { type, to, content } = req.body; // type: 'SMS' | 'EMAIL'

        if (type === 'SMS') {
            await NotificationService.sendSMS(to, content.message);
        } else if (type === 'EMAIL') {
            await NotificationService.sendEmail(to, content.subject, content.body);
        } else {
            return res.status(400).json({ success: false, message: 'Invalid Type. Use SMS or EMAIL.' });
        }

        res.status(200).json({ success: true, message: 'Notification Queued Successfully 🚀' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getLogs = async (req: Request, res: Response) => {
    // In production, fetch from Redis/BullMQ API
    res.status(200).json({ success: true, message: 'Logs endpoint available via BullBoard (Optional)' });
};
