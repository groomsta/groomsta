import { Router } from 'express';
import { handleLogin, handleVerifyOTP } from './auth.controller';

const router = Router();

router.post('/login', handleLogin);
router.post('/verify-otp', handleVerifyOTP);

export default router;
