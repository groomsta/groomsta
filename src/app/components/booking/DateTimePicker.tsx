'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Sun, Moon } from 'lucide-react';

interface DateTimePickerProps {
    onSelect: (date: Date, time: string) => void;
}

const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        dates.push(d);
    }
    return dates;
};

const TIME_SLOTS = {
    'Morning': ['10:00 AM', '11:00 AM', '11:30 AM'],
    'Afternoon': ['12:00 PM', '01:00 PM', '02:30 PM', '03:00 PM'],
    'Evening': ['04:00 PM', '05:30 PM', '06:00 PM', '07:00 PM']
};

export default function DateTimePicker({ onSelect }: DateTimePickerProps) {
    const dates = generateDates();
    const [selectedDate, setSelectedDate] = useState<Date>(dates[0]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        onSelect(selectedDate, time);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Date Selection */}
            <div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#0C3C85]" /> Select Date
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                    {dates.map((date) => {
                        const isSelected = date.toDateString() === selectedDate.toDateString();
                        return (
                            <button
                                key={date.toISOString()}
                                onClick={() => {
                                    setSelectedDate(date);
                                    setSelectedTime(null);
                                }}
                                className={cn(
                                    "flex flex-col items-center justify-center min-w-[70px] h-20 rounded-xl border transition-all shrink-0",
                                    isSelected
                                        ? "bg-[#0C3C85] text-white border-[#0C3C85] shadow-md transform scale-105"
                                        : "bg-white border-gray-200 text-gray-500 hover:border-blue-200"
                                )}
                            >
                                <span className={cn("text-xs font-medium uppercase", isSelected ? "text-blue-100" : "")}>
                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </span>
                                <span className="text-xl font-bold mt-1">
                                    {date.getDate()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Time Selection */}
            <div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0C3C85]" /> Select Time
                </h3>

                <div className="space-y-6">
                    {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                        <div key={period}>
                            <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                                {period === 'Morning' && <Sun className="w-4 h-4" />}
                                {period === 'Afternoon' && <Sun className="w-4 h-4 text-orange-400" />}
                                {period === 'Evening' && <Moon className="w-4 h-4 text-purple-400" />}
                                {period}
                            </h4>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {slots.map((slot) => (
                                    <button
                                        key={slot}
                                        onClick={() => handleTimeSelect(slot)}
                                        className={cn(
                                            "py-2.5 px-2 rounded-lg text-sm font-medium border transition-all truncate",
                                            selectedTime === slot
                                                ? "bg-blue-50 border-[#0C3C85] text-[#0C3C85]"
                                                : "bg-white border-gray-200 text-gray-600 hover:border-blue-200"
                                        )}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
