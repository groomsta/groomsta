'use client';

import { X, Clock, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: {
        id: string;
        title: string;
        price: number;
        duration: string;
        description: string;
    } | null;
    onAdd: (id: string) => void;
}

export default function ServiceDetailModal({ isOpen, onClose, service, onAdd }: ServiceDetailModalProps) {
    if (!isOpen || !service) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-gray-100">
                    <div>
                        <h3 className="font-montserrat text-xl font-bold text-[#1A1A1A] mb-1">
                            {service.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {service.duration}
                            </span>
                            <span className="flex items-center gap-1 text-yellow-500 font-medium">
                                <Star className="w-4 h-4 fill-current" />
                                4.8 (120)
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* content */}
                <div className="p-6 space-y-6">
                    <div>
                        <h4 className="font-semibold text-[#1A1A1A] mb-2 text-sm uppercase tracking-wide">Description</h4>
                        <p className="text-gray-600 leading-relaxed">
                            {service.description}
                            <br /><br />
                            Our professionals follow strict hygiene protocols and use premium products to ensure the best experience.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-[#1A1A1A] mb-3 text-sm uppercase tracking-wide">What's Included</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-3 text-sm text-gray-600">
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                <span>Consultation & styling advice</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-600">
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                <span>Premium product application</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-600">
                                <Check className="w-5 h-5 text-green-500 shrink-0" />
                                <span>Post-service cleanup</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Total Price</span>
                        <span className="font-bold text-2xl text-[#1A1A1A]">₹{service.price}</span>
                    </div>
                    <Button
                        onClick={() => {
                            onAdd(service.id);
                            onClose();
                        }}
                        className="bg-[#0C3C85] hover:bg-blue-700 text-white font-semibold px-8 h-12 rounded-xl text-base shadow-lg hover:shadow-xl transition-all"
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
}
