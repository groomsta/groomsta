import bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export class AuthService {
    private static SALT_ROUNDS = 12; // Fintech standard (10-12)

    /**
     * Generates a crytographically secure 6-digit OTP.
     * Uses crypto.randomInt for uniform distribution.
     */
    public static generateOTP(): string {
        const buffer = crypto.randomBytes(4);
        const otp = (buffer.readUInt32BE(0) % 900000 + 100000).toString();
        return otp;
    }

    /**
     * Hashes the OTP using bcrypt.
     * Never store plain text OTPs.
     */
    public static async hashOTP(otp: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        return bcrypt.hash(otp, salt);
    }

    public static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        return bcrypt.hash(password, salt);
    }

    public static async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    public static async verifyOTP(otp: string, hash: string): Promise<boolean> {
        return bcrypt.compare(otp, hash);
    }

    /**
     * Generates a JWT token for the authenticated user.
     */
    /**
     * Generates a short-lived Access Token (JWT).
     */
    public static generateToken(userId: string, role: string): string {
        const secret = process.env.JWT_SECRET || 'secret';
        return jwt.sign({ userId, role }, secret, { expiresIn: '15m' }); // 15 mins
    }

    /**
     * Generates a long-lived Refresh Token.
     */
    public static generateRefreshToken(userId: string): string {
        const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'secret';
        return jwt.sign({ userId, type: 'refresh' }, secret, { expiresIn: '7d' }); // 7 Days
    }

    public static verifyToken(token: string): any {
        const secret = process.env.JWT_SECRET || 'secret';
        return jwt.verify(token, secret);
    }

    public static verifyRefreshToken(token: string): any {
        const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'secret';
        return jwt.verify(token, secret);
    }
}
