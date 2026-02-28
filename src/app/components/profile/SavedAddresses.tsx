'use client';

import { MapPin, Plus, Trash2, Edit2, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SAVED_ADDRESSES = [
    {
        id: '1',
        type: 'Home',
        icon: Home,
        details: 'Flat 402, Sunshine Apartments, Sector 15, Noida, UP - 201301'
    },
    {
        id: '2',
        type: 'Office',
        icon: Briefcase,
        details: 'WeWork Forum, Cyber City, DLF Phase 3, Gurgaon - 122002'
    }
];

export default function SavedAddresses() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="font-montserrat font-bold text-lg text-[#1A1A1A]">Saved Addresses</h2>
                <Button variant="outline" className="border-dashed border-[#0C3C85] text-[#0C3C85] hover:bg-blue-50 gap-2 h-9 text-sm">
                    <Plus className="w-4 h-4" /> Add New
                </Button>
            </div>

            <div className="grid gap-4">
                {SAVED_ADDRESSES.map((addr) => {
                    const Icon = addr.icon;
                    return (
                        <div key={addr.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-[#0C3C85]" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-bold text-[#1A1A1A] text-sm">{addr.type}</h3>
                                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{addr.details}</p>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-[#0C3C85] hover:bg-gray-50 rounded-full transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
