
import { SmsService } from '../src/shared/sms.service';
import dotenv from 'dotenv';

dotenv.config();

async function testTwilio() {
    console.log('Testing SmsService...');

    // Check Env Vars
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const phone = process.env.TWILIO_PHONE_NUMBER;

    console.log(`Env Config:
    SID: ${sid ? 'Set (Masked)' : 'Missing'}
    Token: ${token ? 'Set (Masked)' : 'Missing'}
    From: ${phone || 'Missing'}
    `);

    // Test Send
    console.log('Attempting to send OTP...');
    const success = await SmsService.sendOTP('+1234567890', '123456');

    if (success) {
        console.log('✅ Service returned SUCCESS.');
    } else {
        console.error('❌ Service returned FAILURE.');
    }
}

testTwilio();
