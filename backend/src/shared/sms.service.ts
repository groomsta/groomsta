import twilio from 'twilio';

export class SmsService {
    private static client: twilio.Twilio | null = null;

    private static getClient() {
        if (!this.client && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
            this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        }
        return this.client;
    }

    public static async sendOTP(phone: string, otp: string): Promise<boolean> {
        const client = this.getClient();

        // 1. Real SMS (Production / if keys exist)
        if (client && process.env.TWILIO_PHONE_NUMBER) {
            try {
                await client.messages.create({
                    body: `Your Groomsta verification code is: ${otp}`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: phone
                });
                console.log(`[SMSService] OTP sent to ${phone} via Twilio`);
                return true;
            } catch (error) {
                console.error('[SMSService] Twilio Error:', error);
                // Fallback to console in strict dev/debug, or just fail in prod
                if (process.env.NODE_ENV === 'production') return false;
            }
        }

        // 2. Fallback / Dev Mode
        // If no credentials or send failed in dev, log it.
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[SMSService] [DEV-ONLY] ----------------------------`);
            console.log(`[SMSService] 📲 SMS to ${phone}: "Your code is ${otp}"`);
            console.log(`[SMSService] (Configure TWILIO_ACCOUNT_SID to send real SMS)`);
            console.log(`[SMSService] ---------------------------------------`);
            return true;
        }

        return false;
    }
}
