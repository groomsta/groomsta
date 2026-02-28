import { Router } from 'express';
import { calculatePayouts, initiateTransfer, verifyTransfer, getMyPayouts, getPartnerPayoutsById } from './payout.controller';
import { authenticateUser, authorizeRole } from '../../middleware/auth.middleware';

const router = Router();

// Admin Routes (To Trigger Payouts)
router.post('/calculate', authenticateUser, authorizeRole('ADMIN'), calculatePayouts);
router.post('/initiate', authenticateUser, authorizeRole('ADMIN'), initiateTransfer);
router.post('/verify', authenticateUser, authorizeRole('ADMIN'), verifyTransfer);
router.get('/partner/:partnerId', authenticateUser, authorizeRole('ADMIN'), getPartnerPayoutsById);

// Partner Routes (To View Payouts)
router.get('/my-payouts', authenticateUser, authorizeRole('PARTNER'), getMyPayouts);

export default router;
