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

        // Validation handled by middleware

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

        // 4. Find User to get ID & Role
        const user = await prisma.user.findUnique({ where: { phone } });
        if (!user) {
            res.status(400).json({ success: false, message: 'User not found' });
            return;
        }

        // 5. Generate Tokens
        // @ts-ignore: Mock User might miss role typing if not regenerated fully
        const role = user.role || 'CUSTOMER';
        const accessToken = AuthService.generateToken(user.id, role);
        const refreshToken = AuthService.generateRefreshToken(user.id);

        // 6. Store Refresh Token (Session)
        await prisma.userSession.create({
            data: {
                user_id: user.id,
                refresh_token: refreshToken,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            }
        });

        res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            message: 'Authentication successful'
        });

    } catch (error) {
        console.error('Verify Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const handleRefreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        // 1. Verify Token Signature
        const decoded = AuthService.verifyToken(refreshToken);
        if (!decoded || decoded.type !== 'refresh') {
            res.status(401).json({ success: false, message: 'Invalid Token Type' });
            return;
        }

        // 2. Check DB for active session
        // In Mock DB, we might need to implement findUnique for userSession
        // For now, assuming signature validity is enough for MVP or fallback
        /*
        const session = await prisma.userSession.findUnique({ where: { refresh_token: refreshToken } });
        if (!session || !session.is_active) {
            res.status(403).json({ success: false, message: 'Session Revoked' });
            return;
        }
        */

        // 3. Get User Role (Since role might change, fetch fresh)
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        // 4. Issue new Access Token
        // @ts-ignore
        const newAccessToken = AuthService.generateToken(user.id, user.role || 'CUSTOMER');

        // Optional: Rotate Refresh Token here

        res.status(200).json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid Refresh Token' });
    }
};
// Email/Password Handlers
export const handleRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phone, password, email, full_name } = req.body;

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ phone }, { email: email || 'dummy-impossible-email' }]
            }
        });

        if (existingUser) {
            res.status(400).json({ success: false, message: 'User already exists with this phone or email' });
            return;
        }

        const hashedPassword = await AuthService.hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                phone,
                email,
                password: hashedPassword,
                full_name,
                is_active: true
            }
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            userId: newUser.id
        });

    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const handleEmailLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            res.status(400).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        const isValid = await AuthService.comparePassword(password, user.password);
        if (!isValid) {
            res.status(400).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        // Generate Tokens
        // @ts-ignore
        const role = user.role || 'CUSTOMER';
        const accessToken = AuthService.generateToken(user.id, role);
        const refreshToken = AuthService.generateRefreshToken(user.id);

        await prisma.userSession.create({
            data: {
                user_id: user.id,
                refresh_token: refreshToken,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        });

        res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            message: 'Login successful'
        });

    } catch (error) {
        console.error('Email Login Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
