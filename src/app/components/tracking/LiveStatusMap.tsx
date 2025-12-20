'use client';

import { cn } from '@/lib/utils';
import { MapPin, Navigation } from 'lucide-react';

interface LiveStatusMapProps {
    status: 'PLACED' | 'ASSIGNED' | 'ON_WAY' | 'IN_PROGRESS' | 'COMPLETED';
}

export default function LiveStatusMap({ status }: LiveStatusMapProps) {
    return (
        <div className="w-full h-full bg-blue-50 relative overflow-hidden flex items-center justify-center">
            {/* Background Pattern - simulating map */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #0C3C85 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Animation Container */}
            <div className="relative z-10 text-center space-y-4">
                {status === 'PLACED' && (
                    <div className="animate-pulse">
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                            <Navigation className="w-10 h-10 text-[#0C3C85] animate-spin-slow" />
                        </div>
                        <h3 className="text-[#0C3C85] font-semibold text-lg">Looking for nearby partners...</h3>
                    </div>
                )}

                {(status === 'ASSIGNED' || status === 'ON_WAY') && (
                    <div className="relative">
                        {/* Path Animation Line */}
                        <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 bg-[#0C3C85] animate-progress-indeterminate w-1/3 rounded-full" />
                        </div>

                        <div className="flex justify-between w-64 mx-auto mt-4 text-xs font-semibold text-gray-500">
                            <span className="flex flex-col items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-[#0C3C85]" />
                                Partner
                            </span>
                            <span className="flex flex-col items-center gap-1">
                                <MapPin className="w-4 h-4 text-red-500" />
                                You
                            </span>
                        </div>
                    </div>
                )}

                {status === 'IN_PROGRESS' && (
                    <div className="animate-bounce-slow">
                        <div className="w-20 h-20 rounded-full bg-green-100 border-4 border-white shadow-lg flex items-center justify-center mx-auto">
                            <span className="text-3xl">✂️</span>
                        </div>
                        <div className="mt-4 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm inline-block">
                            <span className="text-green-700 font-bold text-sm">Service in Progress</span>
                        </div>
                    </div>
                )}

                {status === 'COMPLETED' && (
                    <div className="animate-in zoom-in duration-500">
                        <div className="w-20 h-20 rounded-full bg-[#0C3C85] text-white flex items-center justify-center mx-auto shadow-xl">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-[#0C3C85] font-bold text-xl mt-4">Service Completed</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
