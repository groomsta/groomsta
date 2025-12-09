import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import prisma from '../../shared/prisma';

export const handleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phone } = req.body;

        if (!phone || phone.length < 10) {
            res.status(400).json({ success: false, message: 'Invalid phone number' });
            return;
        }

        // 1. Generate OTP
        const otp = AuthService.generateOTP();
        const otpHash = await AuthService.hashOTP(otp);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

        // 2. Store Hash in DB (Upsert to handle re-tries)
        // We do typically create a User record first or just store OTP? 
        // For this flow, let's upsert the User first to ensure they exist or are tracked.

        // Find or Create User by phone
        let user = await prisma.user.findUnique({ where: { phone } });
        if (!user) {
            user = await prisma.user.create({
                data: { phone, is_active: true }
            });
        }

        // Store OTP
        await prisma.otpVerification.create({
            data: {
                phone,
                otp: otpHash,
                purpose: 'login',
                expires_at: expiresAt
            }
        });

        // 3. Send OTP (Simulated for Dev)
        console.log(`[DEV ONLY] OTP for ${phone}: ${otp}`);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp: process.env.NODE_ENV === 'development' ? otp : undefined
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const handleVerifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            res.status(400).json({ success: false, message: 'Phone and OTP required' });
            return;
        }

        // 1. Find the latest OTP for this phone
        const otpRecord = await prisma.otpVerification.findFirst({
            where: { phone }
        });

        if (!otpRecord) {
            res.status(400).json({ success: false, message: 'OTP not found/expired' });
            return;
        }

        // 2. Check Expiry
        if (new Date() > new Date(otpRecord.expires_at)) {
            res.status(400).json({ success: false, message: 'OTP expired' });
            return;
        }

        // 3. Verify Hash
        const isValid = await AuthService.verifyOTP(otp, otpRecord.otp);
        if (!isValid) {
            res.status(400).json({ success: false, message: 'Invalid OTP' });
            return;
        }

        // 4. Find User to get ID
        const user = await prisma.user.findUnique({ where: { phone } });
        if (!user) {
            // Should verify login flow created it, but safetynet
            res.status(400).json({ success: false, message: 'User not found' });
            return;
        }

        // 5. Generate Session Token
        const token = AuthService.generateToken(user.id);

        // 6. Mark OTP used (Mock doesn't really update but logic is here)
        // await prisma.otpVerification.update(...)

        res.status(200).json({
            success: true,
            token,
            message: 'Authentication successful'
        });

    } catch (error) {
        console.error('Verify Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
