import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request to include user info
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: 'Authentication Invalid: No Token' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;

        (req as AuthRequest).user = {
            userId: payload.userId,
            role: payload.role || 'CUSTOMER', // Default if role missing in old tokens
        };

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Authentication Invalid: Token Expired or Bad' });
    }
};

export const authorizeRole = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as AuthRequest).user;
        if (!user) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }

        if (!allowedRoles.includes(user.role)) {
            res.status(403).json({ success: false, message: 'Forbidden: Insufficient Permissions' });
            return;
        }

        next();
    };
};
