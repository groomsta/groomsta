import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="bg-white">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] mb-6">
                        Contact Groomsta
                    </h1>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions, feedback, partnership inquiries, or need
                        support with a booking? Our team is here to help.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
                            <Phone className="w-10 h-10 text-[#0C3C85] mb-4" />
                            <h3 className="text-xl font-bold mb-3">
                                Call Us
                            </h3>
                            <p className="text-gray-600">
                                Speak directly with our support team.
                            </p>

                            <p className="mt-4 font-semibold text-[#0C3C85]">
                                +91 98760 85819
                            </p>
                        </div>

                        <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
                            <Mail className="w-10 h-10 text-[#0C3C85] mb-4" />
                            <h3 className="text-xl font-bold mb-3">
                                Email Us
                            </h3>
                            <p className="text-gray-600">
                                Reach out for support, partnerships, or business inquiries.
                            </p>

                            <p className="mt-4 font-semibold text-[#0C3C85]">
                                hello@thegroomsta.com
                            </p>
                        </div>

                        <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
                            <MessageCircle className="w-10 h-10 text-[#0C3C85] mb-4" />
                            <h3 className="text-xl font-bold mb-3">
                                WhatsApp
                            </h3>
                            <p className="text-gray-600">
                                Fastest way to get booking support.
                            </p>

                            <a
                                href="https://wa.me/919876085819"
                                target="_blank"
                                className="mt-4 inline-block font-semibold text-[#0C3C85]"
                            >
                                Chat on WhatsApp →
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* Office Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6 text-center">

                    <MapPin className="w-12 h-12 text-[#0C3C85] mx-auto mb-6" />

                    <h2 className="text-3xl font-bold mb-4">
                        Serving Delhi NCR
                    </h2>

                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Groomsta currently operates across Delhi NCR through a
                        growing network of verified grooming professionals and
                        trusted salon partners.
                    </p>

                </div>
            </section>

            {/* Partnership CTA */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-[#0C3C85] rounded-3xl p-10 md:p-14 text-center text-white">

                        <h2 className="text-4xl font-bold mb-6">
                            Want to Partner with Groomsta?
                        </h2>

                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Whether you're a salon owner, barber, stylist, or
                            grooming professional, we'd love to work with you.
                        </p>

                        <a
                            href="/partner/register"
                            className="inline-block bg-white text-[#0C3C85] font-semibold px-8 py-4 rounded-xl hover:scale-105 transition"
                        >
                            Become a Partner
                        </a>

                    </div>
                </div>
            </section>
        </main>
    );
}