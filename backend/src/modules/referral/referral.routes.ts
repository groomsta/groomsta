
import { Router } from 'express';
import { generateCode, applyCode, getStats } from './referral.controller';
import { authenticateUser } from '../../middleware/auth.middleware';

const router = Router();

router.post('/generate', authenticateUser, generateCode);
router.post('/apply', authenticateUser, applyCode);
router.get('/stats', authenticateUser, getStats);

export default router;
