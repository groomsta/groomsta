'use client';

import Link from 'next/link';
import { Calendar, Clock, MapPin, CheckCircle2, Navigation, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock Data
const BOOKINGS = [
    {
        id: 'GRM-8821',
        status: 'ACTIVE',
        service: 'Classic Haircut + Beard Trim',
        date: 'Today',
        time: '10:30 AM',
        price: '₹499',
        address: 'Home',
        partner: 'Rahul Kumar'
    },
    {
        id: 'GRM-7654',
        status: 'COMPLETED',
        service: 'Gold Facial',
        date: 'Dec 12, 2025',
        time: '4:00 PM',
        price: '₹1,299',
        address: 'Home',
        partner: 'Priya Singh'
    },
    {
        id: 'GRM-5432',
        status: 'CANCELLED',
        service: 'Kid\'s Haircut',
        date: 'Nov 28, 2025',
        time: '11:00 AM',
        price: '₹249',
        address: 'Office',
        partner: null
    }
];

export default function BookingHistory() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-montserrat font-bold text-lg text-[#1A1A1A]">Booking History</h2>

            <div className="grid gap-4">
                {BOOKINGS.map((booking) => {
                    const isCompleted = booking.status === 'COMPLETED';
                    const isCancelled = booking.status === 'CANCELLED';
                    const isActive = booking.status === 'ACTIVE';

                    return (
                        <div key={booking.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border",
                                            isActive ? "bg-blue-50 text-[#0C3C85] border-blue-100" :
                                                isCompleted ? "bg-green-50 text-green-700 border-green-100" :
                                                    "bg-red-50 text-red-600 border-red-100"
                                        )}>
                                            {booking.status}
                                        </span>
                                        <span className="text-xs text-gray-500">#{booking.id}</span>
                                    </div>

                                    <h3 className="font-bold text-[#1A1A1A] text-lg">{booking.service}</h3>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {booking.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            {booking.time}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {booking.address}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end justify-between min-w-[120px]">
                                    <span className="font-bold text-lg text-[#1A1A1A]">{booking.price}</span>

                                    {isActive && (
                                        <Link href="/track" className="w-full md:w-auto">
                                            <Button className="w-full bg-[#0C3C85] hover:bg-blue-800 text-white gap-2 h-9 text-xs">
                                                <Navigation className="w-3.5 h-3.5" />
                                                Track Order
                                            </Button>
                                        </Link>
                                    )}

                                    {isCompleted && (
                                        <Button variant="outline" className="h-9 text-xs gap-2 border-gray-200">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                            Rate Service
                                        </Button>
                                    )}

                                    {isCancelled && (
                                        <Button variant="ghost" className="h-9 text-xs text-red-500 hover:text-red-700 hover:bg-red-50">
                                            View Details <ChevronRight className="w-3.5 h-3.5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
