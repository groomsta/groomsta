import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FaHome, FaStore } from 'react-icons/fa';

export default function ServiceModes() {
    return (
        <section className="py-12 lg:py-16 bg-[#F2F2F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {/* Home Services Card */}
                    <div className="bg-[#E8F1FF] p-6 lg:p-10 rounded-3xl transition-shadow border border-transparent hover:border-blue-100">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <FaHome className="w-8 h-8 lg:w-10 lg:h-10 text-[#0C3C85]" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-[#1A1A1A] mb-3">
                            Home Services
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                            Get pampered in the comfort of your own home by our top-rated professionals.
                        </p>
                        <p className="text-[#0C3C85] font-bold text-base lg:text-lg mb-6">
                            Starts at ₹249
                        </p>
                        <Link
                            href="/services/home"
                            className="inline-flex items-center gap-2 text-[#0C3C85] font-semibold hover:gap-4 transition-all group text-sm lg:text-base"
                        >
                            Explore Services
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Salon Services Card */}
                    <div className="bg-white p-6 lg:p-10 rounded-3xl transition-shadow border border-gray-100 hover:border-gray-200">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#F2F2F2] rounded-full flex items-center justify-center mb-6">
                            <FaStore className="w-8 h-8 lg:w-10 lg:h-10 text-[#0C3C85]" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-[#1A1A1A] mb-3">
                            Salon Services
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base">
                            Visit our curated network of premium partner salons for a classic experience.
                        </p>
                        <p className="text-[#0C3C85] font-bold text-base lg:text-lg mb-6">
                            Packages from ₹499
                        </p>
                        <Link
                            href="/services/salon"
                            className="inline-flex items-center gap-2 text-[#0C3C85] font-semibold hover:gap-4 transition-all group text-sm lg:text-base"
                        >
                            Explore Salons
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
