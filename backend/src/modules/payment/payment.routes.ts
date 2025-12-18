import { Router } from 'express';
import { createOrder, verifyPayment } from './payment.controller';

const router = Router();

// Endpoint to create an order (called before opening checkout)
router.post('/create-order', createOrder);

// Endpoint to verify payment success (called after checkout success)
router.post('/verify', verifyPayment);

export default router;
