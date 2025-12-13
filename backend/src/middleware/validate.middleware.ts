import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateRequest = (schema: ZodSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error: any) {
            console.error('Validation Error Raw:', error);
            if (error instanceof ZodError) {
                const issues = error.issues || (error as any).errors || [];
                res.status(400).json({
                    success: false,
                    message: 'Validation Failure',
                    errors: issues.map((e: any) => ({
                        field: e.path ? e.path.join('.') : 'unknown',
                        message: e.message,
                    })),
                });
                return;
            }
            next(error);
        }
    };
};
