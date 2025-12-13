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

router.post('/login', loginLimiter, validateRequest(loginSchema), handleLogin);
router.post('/verify-otp', loginLimiter, validateRequest(verifyOtpSchema), handleVerifyOTP);
router.post('/refresh-token', validateRequest(refreshTokenSchema), handleRefreshToken);

// Email/Password Routes
router.post('/register', loginLimiter, validateRequest(registerSchema), handleRegister);
router.post('/login/email', loginLimiter, validateRequest(emailLoginSchema), handleEmailLogin);

export default router;
