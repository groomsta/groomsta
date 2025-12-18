import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            res.status(400).json({ success: false, message: 'Invalid amount' });
            return;
        }

        // Amount is passed in normal currency (e.g. 500 INR), service converts to paise
        const order = await PaymentService.createOrder(amount);

        res.status(200).json({
            success: true,
            order,
            key_id: process.env.RAZORPAY_KEY_ID // Send to frontend for Checkout initialization
        });

    } catch (error) {
        console.error('Razorpay Controller Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const isValid = PaymentService.verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (isValid) {
            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid signature' });
        }

    } catch (error) {
        console.error('Verify Controller Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
