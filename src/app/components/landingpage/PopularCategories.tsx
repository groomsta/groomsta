import Link from 'next/link';
import { FaCut, FaClock, FaSmile, FaPalette, FaChild, FaBox } from 'react-icons/fa';

const categories = [
    { id: 'haircut', name: 'Haircut', icon: FaCut, color: 'from-blue-50 to-blue-100' },
    { id: 'beard', name: 'Beard & Grooming', icon: FaClock, color: 'from-purple-50 to-purple-100' },
    { id: 'facial', name: 'Skin Care', icon: FaSmile, color: 'from-pink-50 to-pink-100' },
    { id: 'hair-color', name: 'Hair Color', icon: FaPalette, color: 'from-yellow-50 to-yellow-100' },
    { id: 'kids', name: 'Kids Grooming', icon: FaChild, color: 'from-green-50 to-green-100' },
    { id: 'packages', name: 'Packages', icon: FaBox, color: 'from-orange-50 to-orange-100' },
];

export default function PopularCategories() {
    return (
        <section className="py-12 lg:py-20 bg-[#F9FAFB]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 lg:mb-12">
                    <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3">
                        Popular Categories
                    </h2>
                    <p className="text-gray-600 text-base lg:text-lg">
                        Find the perfect service for your needs.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                href={`/services/home/${category.id}`}
                                key={category.name}
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
