'use client';

import { Phone, MessageSquare, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; // Assuming we had valid images, using placeholder for now

interface PartnerCardProps {
    visible: boolean;
}

export default function PartnerCard({ visible }: PartnerCardProps) {
    if (!visible) return null;

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 relative overflow-hidden">
                        {/* Placeholder for partner image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-xl">
                            RK
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#1A1A1A] text-lg">Rahul Kumar</h3>
                        <p className="text-sm text-gray-500">Professional Hairstylist</p>
                        <div className="flex items-center gap-1 text-sm font-medium mt-1">
                            <Star className="w-4 h-4 text-[#F2C94C] fill-[#F2C94C]" />
                            <span>4.8</span>
                            <span className="text-gray-400">(124 reviews)</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Start Code</p>
                    <p className="text-2xl font-mono font-bold text-[#0C3C85] tracking-widest">8821</p>
                </div>
            </div>

            <div className="flex gap-3">
                <Button className="flex-1 bg-white border border-gray-200 text-[#1A1A1A] hover:bg-gray-50 hover:text-[#0C3C85]">
                    <Phone className="w-4 h-4 mr-2" /> Call Partner
                </Button>
                <Button className="flex-1 bg-[#0C3C85] text-white hover:bg-blue-800">
                    <MessageSquare className="w-4 h-4 mr-2" /> Message
                </Button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                Verified & Vaccinated Partner
            </div>
        </div>
    );
}
