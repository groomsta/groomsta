'use client';

import { Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceListingCardProps {
    id: string;
    title: string;
    price: number;
    duration: string;
    description: string;
    onAdd: (id: string) => void;
}

export default function ServiceListingCard({
    id,
    title,
    price,
    duration,
    description,
    onAdd,
}: ServiceListingCardProps) {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-montserrat font-bold text-lg text-[#1A1A1A] group-hover:text-[#0C3C85] transition-colors">
                        {title}
                    </h3>
                    <span className="font-montserrat font-bold text-[#1A1A1A]">₹{price}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{duration}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="text-green-600 font-medium">4.8 (120 reviews)</div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                <button className="text-[#0C3C85] text-sm font-medium flex items-center gap-1 hover:underline">
                    <Info className="w-4 h-4" />
                    View Details
                </button>
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAdd(id);
                    }}
                    className="bg-white hover:bg-blue-50 text-[#0C3C85] border border-[#0C3C85] hover:border-[#0C3C85] font-semibold h-9 px-6 rounded-lg text-sm transition-colors shadow-none"
                >
                    Add
                </Button>
            </div>
        </div>
    );
}
