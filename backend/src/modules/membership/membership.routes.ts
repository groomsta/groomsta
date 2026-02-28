
import { Router } from 'express';
import { getPlans, subscribe, getBenefits } from './membership.controller';
import { authenticateUser } from '../../middleware/auth.middleware';

const router = Router();

// Public: View Plans
router.get('/plans', getPlans);

// Protected: Subscription Actions
router.post('/subscribe', authenticateUser, subscribe);
router.get('/benefits', authenticateUser, getBenefits);

export default router;
