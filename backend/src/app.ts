import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

const app: Application = express();

// 1. SECURITY: Helmet sets HTTP headers to stop common attacks
app.use(helmet());

// 2. SECURITY: CORS policy (Allow only your frontend domain)
// In production, replace '*' with process.env.FRONTEND_URL
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://groomsta.com' : '*',
    credentials: true
}));

// 3. SECURITY: Rate Limiter to prevent brute-force attacks
// "Maximum 100 requests per 15 mins" as per Cyber Guidelines
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// 4. Optimization & Logging
app.use(compression());
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent overload
app.use(morgan('dev'));

// 5. Health Check (For Monitoring Task)
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'active', timestamp: new Date() });
});

// Routes
import authRoutes from './modules/auth/auth.routes';
app.use('/auth', authRoutes);

// 6. Global Error Handler (Don't leak sensitive info)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
});

export default app;
