'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BookingWizard from '@/app/components/booking/BookingWizard';

export default function BookingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white">
            {/* Simple Header for Checkout */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-50">
                <div className="max-w-xl mx-auto px-4 h-16 flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-50 rounded-full text-gray-600">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-montserrat font-bold text-lg text-[#1A1A1A]">Checkout</h1>
                </div>
            </div>

            <BookingWizard />
        </div>
    );
}
