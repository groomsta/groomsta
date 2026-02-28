'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowRight } from 'lucide-react';
import axios from 'axios';

// Regex for Indian mobile number (10 digits, starts with 6-9)
const PHONE_REGEX = /^[6-9]\d{9}$/;

const API_Base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function LoginForm() {
    const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']); // 4 digit OTP
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!PHONE_REGEX.test(phone)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }

        setLoading(true);
        try {
            const fullPhone = `+91${phone}`;
            const res = await axios.post(`${API_Base}/auth/send-otp`, {
                phone: fullPhone
            });

            if (res.data.success) {
                setStep('OTP');
            } else {
                setError(res.data.message || 'Failed to send OTP');
            }
        } catch (err: any) {
            console.error('Login Error:', err);
            const msg = err.response?.data?.message || 'Something went wrong. Ensure backend is running.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 4) {
            setError('Please enter the complete 4-digit OTP.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const fullPhone = `+91${phone}`;
            const res = await axios.post(`${API_Base}/auth/verify-otp`, {
                phone: fullPhone,
                otp: otpValue
            });

            if (res.data.success) {
                alert(`Login Successful! Token: ${res.data.accessToken}`);
                // TODO: Save token and redirect
            } else {
                setError(res.data.message || 'Invalid OTP');
            }
        } catch (err: any) {
            console.error('Verify Error:', err);
            const msg = err.response?.data?.message || 'Verification failed';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (step === 'PHONE') {
        return (
            <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobile Number</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-base">+91</span>
                        <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length <= 10) setPhone(val);
                            }}
                            placeholder="Enter your 10-digit number"
                            className="pl-12 h-12 text-base border-gray-300 focus:border-[#0C3C85] focus:ring-[#0C3C85] rounded-xl"
                            maxLength={10}
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>

                <Button
                    type="submit"
                    disabled={loading || phone.length !== 10}
                    className="w-full h-12 bg-[#0C3C85] hover:bg-blue-800 text-white font-semibold rounded-xl text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <span className="flex items-center gap-2">
                            Get OTP <ArrowRight className="w-4 h-4" />
                        </span>
                    )}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-6">
                    By continuing, you agree to our <a href="#" className="underline text-[#0C3C85]">Terms</a> & <a href="#" className="underline text-[#0C3C85]">Privacy Policy</a>
                </p>
            </form>
        );
    }

    return (
        <form onSubmit={handleVerify} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-6">
                <p className="text-sm text-gray-500">
                    We've sent a 4-digit code to <br />
                    <span className="font-bold text-[#1A1A1A] text-base">+91 {phone}</span>
                </p>
                <button
                    type="button"
                    onClick={() => setStep('PHONE')}
                    className="text-xs text-[#0C3C85] font-semibold mt-2 hover:underline"
                >
                    Change Number
                </button>
            </div>

            <div className="flex justify-center gap-3 sm:gap-4">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { if (el) otpRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-14 sm:w-14 sm:h-16 border-2 border-gray-200 rounded-xl text-center text-xl sm:text-2xl font-bold focus:border-[#0C3C85] focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-[#1A1A1A]"
                    />
                ))}
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <Button
                type="submit"
                disabled={loading || otp.some(d => !d)}
                className="w-full h-12 bg-[#0C3C85] hover:bg-blue-800 text-white font-semibold rounded-xl text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Proceed'}
            </Button>

            <div className="text-center">
                <button type="button" className="text-sm text-gray-500 font-medium hover:text-[#0C3C85]">
                    Resend OTP in <span className="text-[#0C3C85]">30s</span>
                </button>
            </div>
        </form>
    );
}
