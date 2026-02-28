import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Hero() {
    return (
        <section className="bg-white py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
                        <div className="space-y-4">
                            <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.1]">
                                Premium<br />
                                Grooming.<br />
                                Anytime.<br />
                                Anywhere.
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                                Book expert home grooming or visit trusted partner salons across Delhi NCR.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild className="bg-[#0C3C85] hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg px-8 py-3.5 text-base h-auto rounded-lg">
                                <Link href="/services/home">
                                    Home Services
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="text-[#0C3C85] border-[#0C3C85] border-2 hover:bg-[#0C3C85] hover:text-white px-8 py-3.5 text-base h-auto rounded-lg font-semibold">
                                <Link href="/services/salon">
                                    Salon Services
                                </Link>
                            </Button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative max-w-lg">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                            <Input
                                type="text"
                                placeholder="Search for Haircut, Beard Trim, Facial..."
                                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus-visible:ring-2 focus-visible:ring-[#0C3C85] focus-visible:border-transparent transition-all h-auto text-base shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0C3C85]/10 to-transparent z-10" />
                        {/* Replace with actual image */}
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                            <span className="text-gray-400 text-lg">Professional Grooming Image</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
