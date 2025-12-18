'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import SubcategoryTabs from '@/app/components/customer/SubcategoryTabs';
import ServiceListingCard from '@/app/components/customer/ServiceListingCard';
import ServiceDetailModal from '@/app/components/customer/ServiceDetailModal';
import ServiceabilityCheck from '@/app/components/landingpage/ServiceabilityCheck';

// Mock Data
const MOCK_SUBCATEGORIES = {
    'haircut': [
        { id: 'men', label: 'Men\'s Haircut' },
        { id: 'kids', label: 'Kid\'s Haircut' },
        { id: 'color', label: 'Hair Color' },
    ],
    'beard': [
        { id: 'trim', label: 'Beard Trim' },
        { id: 'shave', label: 'Clean Shave' },
        { id: 'style', label: 'Beard Styling' },
    ],
    'facial': [
        { id: 'cleanup', label: 'Cleanup' },
        { id: 'detan', label: 'De-Tan' },
        { id: 'gold', label: 'Gold Facial' },
        { id: 'diamond', label: 'Diamond Facial' },
    ],
    // Default fallback
    'default': [
        { id: 'all', label: 'All Services' },
        { id: 'popular', label: 'Popular' },
    ]
};

const MOCK_SERVICES = [
    { id: '1', title: 'Classic Haircut', price: 299, duration: '30 mins', description: 'Expert haircut by professionals including wash and blow dry.', subcat: 'men' },
    { id: '2', title: 'Fade & Beard Trim', price: 499, duration: '45 mins', description: 'Complete grooming package with premium products.', subcat: 'men' },
    { id: '3', title: 'Kid\'s Haircut', price: 249, duration: '30 mins', description: 'Patient and friendly barbers for your little ones.', subcat: 'kids' },
    { id: '4', title: 'Global Hair Color', price: 1299, duration: '90 mins', description: 'Ammonia-free premium hair color application.', subcat: 'color' },
    { id: '5', title: 'Premium Beard Shape', price: 199, duration: '20 mins', description: 'Line-up and shaping with straight razor finish.', subcat: 'trim' },
];

export default function ServiceCategoryPage() {
    const params = useParams();
    const router = useRouter();
    const categoryId = params.category as string;

    // Normalize category ID for mock data (fallback to default if not found)
    const tabs = MOCK_SUBCATEGORIES[categoryId as keyof typeof MOCK_SUBCATEGORIES] || MOCK_SUBCATEGORIES['default'];

    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [cartCount, setCartCount] = useState(0);
    const [selectedService, setSelectedService] = useState<typeof MOCK_SERVICES[0] | null>(null);

    const categoryName = categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ') : 'Services';

    const handleAddService = (id: string) => {
        setCartCount(prev => prev + 1);
        // In real app, dispatch to Redux/Zustand store
    };

    const handleViewDetails = (service: typeof MOCK_SERVICES[0]) => {
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
                        <Link href="/services/home" className="hover:text-[#0C3C85]">Services</Link>
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
                            Recommended for you
                        </h2>
                        <span className="text-sm text-gray-500">{MOCK_SERVICES.length} services</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        {MOCK_SERVICES.map((service) => (
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

                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                    <p className="text-[#0C3C85] font-medium text-sm">
                        All our partners are verified and follow strict hygiene protocols.
                    </p>
                </div>

            </main>

            {/* Floating Cart Button (shows if cart has items) */}
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
                                <span className="font-bold text-lg">₹{MOCK_SERVICES.reduce((acc, curr, idx) => idx < cartCount ? acc + curr.price : acc, 0)}</span>
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
