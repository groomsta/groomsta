import { FaUserCheck, FaTag, FaCouch, FaHandshake, FaBolt, FaShieldAlt } from 'react-icons/fa';

const features = [
    {
        icon: FaUserCheck,
        title: 'Verified Professionals',
        description: 'Every groomer is background-checked and highly trained.',
    },
    {
        icon: FaTag,
        title: 'Transparent Pricing',
        description: 'No hidden fees. What you see is what you pay.',
    },
    {
        icon: FaCouch,
        title: 'At-Home Convenience',
        description: 'Save time and enjoy professional services at your doorstep.',
    },
    {
        icon: FaHandshake,
        title: 'Partner Salon Network',
        description: 'Access to the best, handpicked salons in your city.',
    },
    {
        icon: FaBolt,
        title: 'Fast Job Assignment',
        description: 'Our smart system assigns a groomer in seconds.',
    },
    {
        icon: FaShieldAlt,
        title: 'Secure Payments',
        description: 'Your payments are processed securely through trusted gateways.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-12 lg:py-20 bg-[#F2F2F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 lg:mb-16">
                    <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3">
                        Why Choose Groomsta?
                    </h2>
                    <p className="text-gray-600 text-base lg:text-lg">
                        The premium experience you deserve.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent"
                            >
                                <div className="mb-4">
                                    <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-[#0C3C85]" />
                                </div>
                                <h3 className="text-lg lg:text-xl font-bold text-[#1A1A1A] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
