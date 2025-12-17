import { Router } from 'express';
import { handleLogin, handleVerifyOTP, handleRefreshToken, handleRegister, handleEmailLogin } from './auth.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { loginSchema, verifyOtpSchema, refreshTokenSchema, registerSchema, emailLoginSchema } from './auth.validation';
import rateLimit from 'express-rate-limit';

const router = Router();

// Strict Rate Limiter for Login/OTP (5 attempts per 15 min)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Phone OTP Flow (Step 1: Send OTP)
router.post('/send-otp', loginLimiter, validateRequest(loginSchema), handleLogin);
router.post('/verify-otp', loginLimiter, validateRequest(verifyOtpSchema), handleVerifyOTP);
router.post('/refresh-token', validateRequest(refreshTokenSchema), handleRefreshToken);

// Email/Password Flow (Standard Login)
router.post('/register', loginLimiter, validateRequest(registerSchema), handleRegister);
router.post('/login', loginLimiter, validateRequest(emailLoginSchema), handleEmailLogin);

export default router;
