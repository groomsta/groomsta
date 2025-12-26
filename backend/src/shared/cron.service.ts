
import cron from 'node-cron';
import { PayoutService } from '../modules/payout/payout.service';

export class CronService {
    static init() {
        console.log('⏳ Cron Service Initialized');

        // Schedule: Every Sunday at 11:59 PM (23:59)
        cron.schedule('59 23 * * 0', async () => {
            console.log('🔄 Running Weekly Payout Calculation...');
            try {
                const payouts = await PayoutService.calculateWeeklyPayouts();
                console.log(`✅ Weekly Payouts Calculated: ${payouts.length} records generated.`);
            } catch (error) {
                console.error('❌ Weekly Payout Calculation Failed:', error);
            }
        });

        // Example: Monthly Membership Expiry Check (Run daily at midnight)
        cron.schedule('0 0 * * *', async () => {
            // Logic to mark expired subscriptions
            console.log('Checking for expired memberships...');
        });
    }
}
