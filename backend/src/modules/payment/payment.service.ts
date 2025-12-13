import Razorpay from 'razorpay';
import crypto from 'crypto';

interface OrderOptions {
    amount: number; // in paise
    currency: string;
    receipt: string;
}

export class PaymentService {
    private static instance: Razorpay;

    private static getClient(): Razorpay {
        if (!this.instance) {
            this.instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID || '',
                key_secret: process.env.RAZORPAY_KEY_SECRET || '',
            });
        }
        return this.instance;
    }

    /**
     * Creates a Razorpay Order.
     * @param amount Amount in smallest currency unit (paise)
     * @param currency Default 'INR'
     */
    public static async createOrder(amount: number, currency: string = 'INR'): Promise<any> {
        try {
            const options = {
                amount: amount * 100, // Convert rupees to paise if needed, assume input is INR
                currency,
                receipt: `receipt_${Date.now()}`,
            };
            const order = await this.getClient().orders.create(options);
            return order;
        } catch (error) {
            console.error('Razorpay Error:', error);
            throw new Error('Order creation failed');
        }
    }

    /**
     * Verifies the payment signature to ensure authenticity.
     * @param orderId razorpay_order_id
     * @param paymentId razorpay_payment_id
     * @param signature razorpay_signature
     */
    public static verifyPayment(orderId: string, paymentId: string, signature: string): boolean {
        const body = orderId + '|' + paymentId;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
            .update(body.toString())
            .digest('hex');

        return expectedSignature === signature;
    }
}
