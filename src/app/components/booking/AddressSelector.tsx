'use client';

import { MapPin, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Address {
    id: string;
    type: 'Home' | 'Office' | 'Other';
    street: string;
    landmark?: string;
}

const MOCK_ADDRESSES: Address[] = [
    { id: '1', type: 'Home', street: 'B-14, Green Park Extension, New Delhi' },
    { id: '2', type: 'Office', street: 'Cyber City, Phase 2, Gurgaon' },
];

interface AddressSelectorProps {
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export default function AddressSelector({ selectedId, onSelect }: AddressSelectorProps) {
    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Select Address</h3>

            <div className="grid gap-4">
                {MOCK_ADDRESSES.map((addr) => (
                    <div
                        key={addr.id}
                        onClick={() => onSelect(addr.id)}
                        className={cn(
                            "cursor-pointer rounded-xl border-2 p-4 flex items-start gap-3 transition-all",
                            selectedId === addr.id
                                ? "border-[#0C3C85] bg-blue-50/50"
                                : "border-gray-100 hover:border-blue-100"
                        )}
                    >
                        <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0",
                            selectedId === addr.id ? "border-[#0C3C85]" : "border-gray-300"
                        )}>
                            {selectedId === addr.id && <div className="w-2.5 h-2.5 rounded-full bg-[#0C3C85]" />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-[#1A1A1A]">{addr.type}</span>
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500 font-medium">DEFAULT</span>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{addr.street}</p>
                        </div>
                    </div>
                ))}

                <button className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 hover:border-[#0C3C85] hover:text-[#0C3C85] transition-all group">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <Plus className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Add New Address</span>
                </button>
            </div>
        </div>
    );
}
