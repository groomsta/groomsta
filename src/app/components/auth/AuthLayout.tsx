'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left Column - Branding (Hidden on mobile) */}
            <div className="hidden lg:relative lg:flex lg:flex-col lg:items-center lg:justify-center bg-[#0C3C85] text-white p-12 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-md text-center space-y-6">
                    <h1 className="font-montserrat text-5xl font-bold leading-tight">
                        Premium Grooming.<br />Anytime.
                    </h1>
                    <p className="text-blue-100 text-lg font-poppins">
                        Join thousands of satisfied customers and experience the best in home and salon services.
                    </p>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="flex flex-col justify-center p-6 sm:p-12 lg:p-24 relative">
                <Link href="/" className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[#0C3C85]">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="font-montserrat text-3xl font-bold text-[#1A1A1A]">Welcome Back</h2>
                        <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
