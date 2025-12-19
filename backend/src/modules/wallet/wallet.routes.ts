import { Router } from 'express';
import { getBalance, addCredits, deductCredits } from './wallet.controller';
import { authenticateUser } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticateUser); // All wallet routes require login

router.get('/balance', getBalance);
router.post('/add-credits', addCredits);
router.post('/deduct', deductCredits);

export default router;
