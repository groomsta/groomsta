'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddressSelector from './AddressSelector';
import DateTimePicker from './DateTimePicker';
import BookingSummary from './BookingSummary';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const STEPS = [
    { id: 1, title: 'Address' },
    { id: 2, title: 'Schedule' },
    { id: 3, title: 'Payment' }
];

export default function BookingWizard() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);

    // Form State
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [dateTime, setDateTime] = useState<{ date: Date, time: string } | null>(null);

    const nextStep = () => setCurrentStep(p => Math.min(3, p + 1));
    // const prevStep = () => setCurrentStep(p => Math.max(1, p - 1));

    const isStepValid = () => {
        if (currentStep === 1) return !!selectedAddress;
        if (currentStep === 2) return !!dateTime;
        return true;
    };

    const handlePaymentComplete = () => {
        // Mock success flow
        alert('Booking Confirmed! Tracking ID: #GRM-8821');
        router.push('/track');
    };

    return (
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
            {/* Steps Indicator */}
            <div className="flex items-center justify-between relative mb-10">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-100 -z-10" />
                {STEPS.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;
                    return (
                        <div key={step.id} className="bg-white px-2">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all mx-auto mb-1",
                                isActive ? "border-[#0C3C85] bg-[#0C3C85] text-white" :
                                    isCompleted ? "border-[#0C3C85] bg-white text-[#0C3C85]" :
                                        "border-gray-200 bg-white text-gray-300"
                            )}>
                                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                            </div>
                            <span className={cn(
                                "text-xs font-medium block text-center",
                                isActive ? "text-[#0C3C85]" : "text-gray-400"
                            )}>{step.title}</span>
                        </div>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {currentStep === 1 && (
                    <AddressSelector
                        selectedId={selectedAddress}
                        onSelect={setSelectedAddress}
                    />
                )}
                {currentStep === 2 && (
                    <DateTimePicker
                        onSelect={(date, time) => setDateTime({ date, time })}
                    />
                )}
                {currentStep === 3 && dateTime && selectedAddress && (
                    <BookingSummary
                        addressId={selectedAddress}
                        dateTime={dateTime}
                        onPay={handlePaymentComplete}
                    />
                )}
            </div>

            {/* Navigation Footer (Steps 1 & 2) */}
            {currentStep < 3 && (
                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                    <Button
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        className="bg-[#0C3C85] hover:bg-blue-800 text-white font-semibold px-8 h-12 rounded-xl"
                    >
                        Continue <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            )}
        </div>
    );
}
