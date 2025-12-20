import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const salons = [
    {
        id: 1,
        name: "Luxe Studio & Spa",
        rating: 4.8,
        reviews: 120,
        location: "Kailash Colony, South Delhi",
        imageColor: "bg-purple-100",
        services: ["Haircut", "Facial"],
    },
    {
        id: 2,
        name: "Urban Gentle Grooming",
        rating: 4.9,
        reviews: 85,
        location: "Vasant Vihar, New Delhi",
        imageColor: "bg-blue-100",
        services: ["Beard Trim", "Massage"],
    },
    {
        id: 3,
        name: "The Royal Cut",
        rating: 4.7,
        reviews: 210,
        location: "DLF Phase 3, Gurgaon",
        imageColor: "bg-orange-100",
        services: ["Haircut", "Coloring"],
    },
    {
        id: 4,
        name: "Serenity Salon",
        rating: 4.6,
        reviews: 95,
        location: "Sector 18, Noida",
        imageColor: "bg-green-100",
        services: ["Spa", "Pedicure"],
    },
];

export default function FeaturedSalons() {
    return (
        <section className="py-12 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8 lg:mb-12">
                    <div>
                        <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3">
                            Featured Salons
                        </h2>
                        <p className="text-gray-600 text-base lg:text-lg">
                            Top-rated partners delivering excellence near you.
                        </p>
                    </div>
                    <Button variant="link" className="text-[#0C3C85] font-semibold hidden sm:inline-flex">
                        View All Salons &rarr;
                    </Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {salons.map((salon) => (
                        <div key={salon.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all">
                            {/* Image Placeholder */}
                            <div className={`h-48 ${salon.imageColor} relative flex items-center justify-center`}>
                                <span className="text-gray-500 font-medium opacity-50">Salon Image</span>
                                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-bold text-[#1A1A1A]">{salon.rating}</span>
                                    <span className="text-xs text-gray-400">({salon.reviews})</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-montserrat font-bold text-lg text-[#1A1A1A] mb-2 group-hover:text-[#0C3C85] transition-colors">{salon.name}</h3>
                                <div className="flex items-start gap-2 text-gray-500 mb-4">
                                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                    <span className="text-sm line-clamp-1">{salon.location}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {salon.services.map((service, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
                                            {service}
                                        </span>
                                    ))}
                                </div>
                                <Button className="w-full bg-white text-[#0C3C85] border border-[#0C3C85] hover:bg-[#0C3C85] hover:text-white transition-colors">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" className="w-full border-[#0C3C85] text-[#0C3C85]">
                        View All Salons
                    </Button>
                </div>
            </div>
        </section>
    );
}
