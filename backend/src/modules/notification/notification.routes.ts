import { Router } from 'express';
import { sendNotification, getLogs } from './notification.controller';
import { authenticateUser, authorizeRole } from '../../middleware/auth.middleware';

const router = Router();

// Only Admins/System can trigger manual notifications
router.post('/send', authenticateUser, authorizeRole('ADMIN'), sendNotification);
router.get('/logs', authenticateUser, authorizeRole('ADMIN'), getLogs);

export default router;
