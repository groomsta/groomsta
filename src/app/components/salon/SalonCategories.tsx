import Link from 'next/link';
import { FaCut, FaSpa, FaPaintBrush, FaHandsWash, FaStar } from 'react-icons/fa';

const salonCategories = [
    { id: 'hair-styling', name: 'Hair Styling', icon: FaCut, color: 'from-blue-50 to-blue-100' },
    { id: 'spa-massage', name: 'Spa & Massage', icon: FaSpa, color: 'from-green-50 to-green-100' },
    { id: 'makeup', name: 'Makeup & Makeover', icon: FaPaintBrush, color: 'from-pink-50 to-pink-100' },
    { id: 'manicure-pedicure', name: 'Manicure & Pedicure', icon: FaHandsWash, color: 'from-purple-50 to-purple-100' },
    { id: 'luxury-experience', name: 'Luxury Experience', icon: FaStar, color: 'from-yellow-50 to-yellow-100' },
];

export default function SalonCategories() {
    return (
        <section className="py-8 lg:py-12 bg-[#F9FAFB]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 lg:mb-12">
                    <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3">
                        Explore Salon Services
                    </h2>
                    <p className="text-gray-600 text-base lg:text-lg">
                        Choose from a wide range of premium services.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                    {salonCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                href={`/services/salon/${category.id}`}
                                key={category.id}
                                className="group p-5 lg:p-8 bg-white border border-gray-100 rounded-3xl hover:border-blue-100 hover:shadow-lg transition-all block flex flex-col items-center justify-center h-full min-h-[160px]"
                            >
                                <div className="mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-[#0C3C85]" />
                                </div>
                                <p className="font-semibold text-[#1A1A1A] group-hover:text-[#0C3C85] transition-colors text-center text-sm lg:text-base">
                                    {category.name}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
