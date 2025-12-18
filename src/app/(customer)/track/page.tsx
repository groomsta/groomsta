'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import LiveStatusMap from '@/app/components/tracking/LiveStatusMap';
import OrderTracker from '@/app/components/tracking/OrderTracker';
import PartnerCard from '@/app/components/tracking/PartnerCard';

type TrackingStatus = 'PLACED' | 'ASSIGNED' | 'ON_WAY' | 'IN_PROGRESS' | 'COMPLETED';

export default function TrackingPage() {
    const [status, setStatus] = useState<TrackingStatus>('PLACED');

    // Simulate Real-time Updates
    useEffect(() => {
        const timers = [
            setTimeout(() => setStatus('ASSIGNED'), 3000),   // 3s: Partner Found
            setTimeout(() => setStatus('ON_WAY'), 6000),    // 6s: Partner Moving
            setTimeout(() => setStatus('IN_PROGRESS'), 10000), // 10s: Reached/Started
            setTimeout(() => setStatus('COMPLETED'), 15000),  // 15s: Done
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">

            {/* Left/Top Area: Map Visualization */}
            <div className="h-[40vh] lg:h-screen lg:w-3/5 lg:sticky lg:top-0 relative transition-all duration-500">
                <Link href="/" className="absolute top-4 left-4 z-20 bg-white/90 p-2 rounded-full shadow-md hover:bg-white text-[#1A1A1A]">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <LiveStatusMap status={status} />
            </div>

            {/* Right/Bottom Area: Details Panel */}
            <div className="flex-1 relative z-10 -mt-6 lg:mt-0 lg:h-screen lg:overflow-y-auto">
                <div className="bg-white lg:min-h-screen rounded-t-3xl lg:rounded-none shadow-xl lg:shadow-none p-6 lg:p-12 space-y-6">

                    {/* Header */}
                    <div>
                        <span className="px-3 py-1 bg-blue-50 text-[#0C3C85] rounded-full text-xs font-bold tracking-wide uppercase">
                            Order #GRM-8821
                        </span>
                        <h1 className="font-montserrat text-2xl font-bold text-[#1A1A1A] mt-3">
                            {status === 'COMPLETED' ? 'Service Completed' : 'Track Booking'}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Scheduled for Today, 10:30 AM
                        </p>
                    </div>

                    {/* Partner Card (Visible after assignment) */}
                    <PartnerCard visible={status !== 'PLACED'} />

                    {/* Timeline */}
                    <OrderTracker status={status} />

                    {/* Action Area */}
                    <div className="pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-[#1A1A1A] mb-2">Need Help?</h4>
                        <div className="flex gap-4 text-sm text-gray-600">
                            <button className="hover:text-[#0C3C85] underline">Reschedule</button>
                            <button className="hover:text-red-500 underline">Cancel Booking</button>
                            <button className="hover:text-[#0C3C85] underline">Support</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
