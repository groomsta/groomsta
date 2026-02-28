import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SalonHero() {
    return (
        <section className="bg-white py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="space-y-6 order-2 lg:order-1">
                        <div className="space-y-2">
                            <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
                                Book Premium Salons
                            </h1>
                            <p className="text-base text-gray-600 max-w-lg">
                                Skip the queue. Book top-rated salons near you instantly.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative max-w-lg">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                            <Input
                                type="text"
                                placeholder="Search for Salons, Services, or Areas..."
                                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus-visible:ring-2 focus-visible:ring-[#0C3C85] focus-visible:border-transparent transition-all h-auto text-base shadow-sm"
                            />
                        </div>
                        {/* Quick Filters / Tags could go here potentially */}
                    </div>

                    {/* Right Image */}
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0C3C85]/10 to-transparent z-10" />
                        {/* Placeholder for Salon Image */}
                        <div className="w-full h-full bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
                            <span className="text-gray-400 text-lg">Premium Salon Interior Image</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
