'use client';

import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderTimelineProps {
    status: 'PLACED' | 'ASSIGNED' | 'ON_WAY' | 'IN_PROGRESS' | 'COMPLETED';
}

const STEPS = [
    { key: 'PLACED', label: 'Booking Confirmed', time: '10:30 AM' },
    { key: 'ASSIGNED', label: 'Partner Assigned', time: '10:32 AM' },
    { key: 'ON_WAY', label: 'Partner On the Way', time: '10:45 AM' },
    { key: 'IN_PROGRESS', label: 'Service Started', time: '11:00 AM' },
    { key: 'COMPLETED', label: 'Completed', time: '12:00 PM' },
] as const;

export default function OrderTracker({ status }: OrderTimelineProps) {
    const getCurrentStepIndex = () => STEPS.findIndex(s => s.key === status);
    const currentStepIndex = getCurrentStepIndex();

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-montserrat font-bold text-lg text-[#1A1A1A] mb-6">Order Status</h3>

            <div className="relative pl-2">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-gray-100" />

                <div className="space-y-8">
                    {STEPS.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <div key={step.key} className="relative flex items-start gap-4">
                                <div className={cn(
                                    "relative z-10 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 transition-colors",
                                    isCompleted ? "border-[#0C3C85]" : "border-gray-200"
                                )}>
                                    {isCompleted ? (
                                        <div className="w-3 h-3 rounded-full bg-[#0C3C85]" />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-gray-100" />
                                    )}
                                </div>
                                <div className="flex-1 -mt-1">
                                    <p className={cn(
                                        "font-medium text-sm transition-colors",
                                        isCurrent ? "text-[#0C3C85] font-bold" :
                                            isCompleted ? "text-[#1A1A1A]" : "text-gray-400"
                                    )}>
                                        {step.label}
                                    </p>
                                    {isCompleted && (
                                        <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                            <Clock className="w-3 h-3" /> {step.time}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
