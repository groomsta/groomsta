import { ShieldCheck, Clock, MapPin, Award } from 'lucide-react';

const benefits = [
    {
        icon: Clock,
        title: "Zero Wait Time",
        description: "Book your slot in advance and walk in directly. No more waiting in queues."
    },
    {
        icon: ShieldCheck,
        title: "Verified Standards",
        description: "Every partner salon is vetted for hygiene, quality, and premium infrastructure."
    },
    {
        icon: MapPin,
        title: "Convenient Locations",
        description: "Find top-rated grooming studios right in your neighborhood."
    },
    {
        icon: Award,
        title: "Premium Experience",
        description: "Enjoy standardized service quality and expert professionals."
    }
];

export default function WhyChooseSalon() {
    return (
        <section className="py-12 lg:py-20 bg-[#F2F2F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
                        Why Book Salons on Groomsta?
                    </h2>
                    <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto">
                        We bring the same trust and quality you love, to your favorite salons.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-[#0C3C85]">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl text-[#1A1A1A] mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
