import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        phone: z.string().min(10, 'Phone must be at least 10 digits').regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
    }),
});

export const verifyOtpSchema = z.object({
    body: z.object({
        phone: z.string().min(10),
        otp: z.string().length(6, 'OTP must be 6 digits'),
    }),
});

export const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1, 'Refresh Token is required'),
    }),
});

export const registerSchema = z.object({
    body: z.object({
        phone: z.string().min(10, 'Phone must be at least 10 digits'),
        password: z.string().min(6, 'Password must be at least 6 chars'),
        email: z.string().email('Invalid email').optional(),
        full_name: z.string().optional()
    })
});

export const emailLoginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(1, 'Password is required')
    })
});
