'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import SubcategoryTabs from '@/app/components/customer/SubcategoryTabs';
import ServiceListingCard from '@/app/components/customer/ServiceListingCard';
import ServiceDetailModal from '@/app/components/customer/ServiceDetailModal';
import ReviewList from '@/app/components/services/ReviewList';

// Mock Data (Salon Specific)
const MOCK_SALON_SUBCATEGORIES = {
    'haircut': [
        { id: 'men', label: 'Men\'s Haircut' },
        { id: 'women', label: 'Women\'s Haircut' },
        { id: 'kids', label: 'Kid\'s Haircut' },
    ],
    'beard': [
        { id: 'trim', label: 'Beard Trim' },
        { id: 'shave', label: 'Luxury Shave' },
    ],
    'facial': [
        { id: 'express', label: 'Express Facial' },
        { id: 'premium', label: 'Premium Facial' },
    ],
    'default': [
        { id: 'all', label: 'All Services' },
        { id: 'popular', label: 'Most Popular' },
    ]
};

const MOCK_SALON_SERVICES = [
    { id: 's1', title: 'Director\'s Cut', price: 599, duration: '45 mins', description: 'Precision haircut by senior stylist with wash & style.', subcat: 'men' },
    { id: 's2', title: 'Creative Cut', price: 999, duration: '60 mins', description: 'Transformation haircut with consultation.', subcat: 'women' },
    { id: 's3', title: 'Luxury Beard Spa', price: 499, duration: '30 mins', description: 'Beard grooming with hot towel and essential oils.', subcat: 'shave' },
    { id: 's4', title: 'O3+ Whitening Facial', price: 2499, duration: '60 mins', description: 'Brightening and tan removal treatment.', subcat: 'premium' },
    { id: 's5', title: 'Classic Manicure', price: 499, duration: '45 mins', description: 'Nail shaping, cuticle care, and massage.', subcat: 'all' },
];

export default function SalonServiceCategoryPage() {
    const params = useParams();
    const router = useRouter();
    const categoryId = params.category as string;

    const tabs = MOCK_SALON_SUBCATEGORIES[categoryId as keyof typeof MOCK_SALON_SUBCATEGORIES] || MOCK_SALON_SUBCATEGORIES['default'];

    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [cartCount, setCartCount] = useState(0);
    const [selectedService, setSelectedService] = useState<typeof MOCK_SALON_SERVICES[0] | null>(null);

    const categoryName = categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ') : 'Services';

    const handleAddService = (id: string) => {
        setCartCount(prev => prev + 1);
    };

    const handleViewDetails = (service: typeof MOCK_SALON_SERVICES[0]) => {
        setSelectedService(service);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] relative">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-40 transition-shadow duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Link href="/" className="hover:text-[#0C3C85]">Home</Link>
                        <ChevronRight className="w-4 h-4 mx-1" />
                        <Link href="/services/salon" className="hover:text-[#0C3C85]">Salon Services</Link>
                        <ChevronRight className="w-4 h-4 mx-1" />
                        <span className="text-[#0C3C85] font-medium capitalize">{categoryName}</span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                        <button onClick={() => router.back()} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
                        </button>
                        <h1 className="font-montserrat text-2xl sm:text-3xl font-bold text-[#1A1A1A] capitalize">
                            {categoryName}
                        </h1>
                    </div>

                    <SubcategoryTabs
                        categories={tabs}
                        activeCategory={activeTab}
                        onSelect={setActiveTab}
                    />
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-32">
                {/* Services List */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-montserrat text-xl font-bold text-[#1A1A1A]">
                            Available at nearby salons
                        </h2>
                        <span className="text-sm text-gray-500">{MOCK_SALON_SERVICES.length} services</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {MOCK_SALON_SERVICES.map((service) => (
                            <div key={service.id} onClick={() => handleViewDetails(service)} className="cursor-pointer">
                                <ServiceListingCard
                                    id={service.id}
                                    title={service.title}
                                    price={service.price}
                                    duration={service.duration}
                                    description={service.description}
                                    onAdd={handleAddService}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Reviews Section */}
                <section className="bg-white rounded-xl p-6 border border-gray-100">
                    <ReviewList />
                </section>

                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                    <p className="text-[#0C3C85] font-medium text-sm">
                        Prices may vary slightly based on salon tier (Silver/Gold/Platinum).
                    </p>
                </div>
            </main>

            {/* Floating Cart Button */}
            {cartCount > 0 && (
                <div className="fixed bottom-6 left-0 right-0 px-4 z-50">
                    <div
                        onClick={() => router.push('/booking')}
                        className="max-w-3xl mx-auto bg-[#1A1A1A] text-white rounded-xl shadow-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-black transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#F2C94C]">
                                {cartCount}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-300">Total</span>
                                <span className="font-bold text-lg">₹{MOCK_SALON_SERVICES.reduce((acc, curr, idx) => idx < cartCount ? acc + curr.price : acc, 0)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 font-semibold">
                            Proceed
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            )}

            <ServiceDetailModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                service={selectedService}
                onAdd={handleAddService}
            />
        </div>
    );
}
