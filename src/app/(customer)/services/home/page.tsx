'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ServiceCategoryGrid from '@/app/components/customer/ServiceCategoryGrid';

export default function HomeServicesPage() {
    return (
        <main className="min-h-screen bg-[#FDFDFD]">
            {/* Hero Section */}
            <section className="bg-white border-b border-gray-100 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">
                        Home Grooming Services
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
                        Professional grooming delivered to your doorstep. Safe, hygienic, and premium.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative cursor-pointer">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                            <Input
                                type="text"
                                placeholder="Search for services (e.g. Haircut, Massage)..."
                                className="w-full pl-12 pr-4 py-6 border-gray-200 rounded-xl shadow-sm focus:ring-[#0C3C85] text-base"
                                readOnly // Making it readOnly for now as a navigation entry point
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-montserrat text-2xl font-bold text-[#1A1A1A]">
                            Explore Categories
                        </h2>
                    </div>
                    <ServiceCategoryGrid />
                </div>
            </section>
        </main>
    );
}
