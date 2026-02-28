'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface BookingSummaryProps {
    addressId: string;
    dateTime: { date: Date, time: string };
    onPay: () => void;
}

export default function BookingSummary({ addressId, dateTime, onPay }: BookingSummaryProps) {
    const [loading, setLoading] = useState(false);

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onPay();
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-montserrat font-bold text-lg text-[#1A1A1A]">Payment Summary</h3>

                <div className="space-y-3 pt-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Item Total</span>
                        <span>₹798</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Taxes & Fees</span>
                        <span>₹42</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount (First User)</span>
                        <span>-₹100</span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-base text-[#1A1A1A]">
                        <span>Grand Total</span>
                        <span>₹740</span>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0C3C85] shrink-0 mt-0.5" />
                <p className="text-sm text-[#0C3C85]">
                    Your booking for <b>{dateTime.date.toLocaleDateString()}</b> at <b>{dateTime.time}</b> is almost ready.
                </p>
            </div>

            <Button
                onClick={handlePay}
                disabled={loading}
                className="w-full h-14 bg-[#0C3C85] hover:bg-blue-800 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
            >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <span className="flex items-center gap-2">
                        Pay ₹740 <ArrowRight className="w-5 h-5" />
                    </span>
                )}
            </Button>

            <p className="text-center text-xs text-gray-400">
                Safe & Secure Payment via Razorpay
            </p>
        </div>
    );
}
