import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { amount, isPartial } = req.body;

        if (!amount || amount <= 0) {
            res.status(400).json({ success: false, message: 'Invalid amount' });
            return;
        }

        let finalAmount = amount;

        // --- Partial Payment Logic (Week 2 Requirement) ---
        // If 'isPartial' is true, we only charge 20% (Booking Advance)
        if (isPartial) {
            // E.g., Total Service Cost 1000 -> Pay 200 now.
            // In a real app, '20%' would be a configurable setting or service-specific.
            finalAmount = Math.ceil(amount * 0.20);
        }

        // Amount is passed in normal currency (e.g. 500 INR), service converts to paise
        const order = await PaymentService.createOrder(finalAmount);

        // We should explicitly return the 'amountPaid' vs 'totalAmount' context to frontend
        // so it knows it is a partial payment.

        res.status(200).json({
            success: true,
            order,
            key_id: process.env.RAZORPAY_KEY_ID, // Send to frontend for Checkout initialization
            isPartial,
            totalAmount: amount,
            paidAmount: finalAmount,
            dueAmount: amount - finalAmount
        });

    } catch (error) {
        console.error('Razorpay Controller Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) throw new Error('Webhook Secret not configured');

        // Verify Signature
        const signature = req.headers['x-razorpay-signature'];
        // Logic to verify... (Using crypto)
        // For now simplifying to focus on structure

        const event = req.body;
        console.log('Webhook Event:', event.event);

        if (event.event === 'payment.captured') {
            // Update Payment Status in DB
            // Add credits to wallet if needed?
        }

        res.status(200).json({ status: 'ok' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const processRefund = async (req: Request, res: Response) => {
    try {
        const { paymentId, amount } = req.body;
        // Call Service to refund
        const refund = await PaymentService.refundPayment(paymentId, amount);
        res.status(200).json({ success: true, message: 'Refund initiated', refund });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
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
