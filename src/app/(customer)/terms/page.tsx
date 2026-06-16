import {
    FileText,
    Calendar,
    CreditCard,
    Shield,
    AlertTriangle,
    Users,
    Mail,
    CheckCircle,
} from "lucide-react";

export default function TermsPage() {
    return (
        <main className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0C3C85] via-[#0F4BA8] to-[#07295A] text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            Legal Information
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6">
                        Terms & Conditions
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100 leading-relaxed">
                        These Terms & Conditions govern your access to and use
                        of Groomsta's platform, services, bookings, and partner
                        network.
                    </p>

                    <p className="mt-6 text-blue-200 text-sm">
                        Last Updated: June 2026
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="space-y-10">

                    {/* Introduction */}
                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-4 text-[#1A1A1A]">
                            Agreement to Terms
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            By accessing or using Groomsta, you agree to comply
                            with and be bound by these Terms & Conditions. If
                            you do not agree with any part of these terms,
                            please discontinue use of the platform.
                        </p>
                    </div>

                    {/* Eligibility */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Users className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                Eligibility
                            </h2>
                        </div>

                        <ul className="space-y-3 text-gray-600">
                            <li>• Users must be at least 18 years old.</li>
                            <li>• Users must provide accurate information.</li>
                            <li>• Users are responsible for account security.</li>
                            <li>• Fraudulent activity may result in suspension.</li>
                        </ul>
                    </div>

                    {/* Booking Policy */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                Booking Policy
                            </h2>
                        </div>

                        <ul className="space-y-3 text-gray-600">
                            <li>• All bookings are subject to availability.</li>
                            <li>• Service professionals may be reassigned when necessary.</li>
                            <li>• Groomsta reserves the right to decline bookings.</li>
                            <li>• Booking details must be accurate and complete.</li>
                        </ul>
                    </div>

                    {/* Payments */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                Payments & Pricing
                            </h2>
                        </div>

                        <ul className="space-y-3 text-gray-600">
                            <li>• Prices displayed are inclusive unless stated otherwise.</li>
                            <li>• Payment may be collected online or offline.</li>
                            <li>• Promotional discounts may have separate conditions.</li>
                            <li>• Failed transactions may require reprocessing.</li>
                        </ul>
                    </div>

                    {/* Cancellation */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                Cancellation & Refund Policy
                            </h2>
                        </div>

                        <ul className="space-y-3 text-gray-600">
                            <li>• Customers may cancel bookings before service begins.</li>
                            <li>• Cancellation charges may apply in certain cases.</li>
                            <li>• Refund eligibility is determined by Groomsta's refund policy.</li>
                            <li>• Refund timelines depend on the payment provider.</li>
                        </ul>
                    </div>

                    {/* Partner Responsibilities */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                Partner Responsibilities
                            </h2>
                        </div>

                        <ul className="space-y-3 text-gray-600">
                            <li>• Maintain professional conduct.</li>
                            <li>• Deliver services as described.</li>
                            <li>• Follow Groomsta quality standards.</li>
                            <li>• Respect customer privacy and safety.</li>
                        </ul>
                    </div>

                    {/* Liability */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                Limitation of Liability
                            </h2>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            Groomsta acts as a technology platform connecting
                            customers with independent grooming professionals
                            and partner salons. While we strive to maintain
                            high standards, Groomsta shall not be liable for
                            indirect, incidental, or consequential damages
                            arising from the use of the platform.
                        </p>
                    </div>

                    {/* Modifications */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">
                            Changes to Terms
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Groomsta reserves the right to modify these Terms &
                            Conditions at any time. Continued use of the
                            platform after updates constitutes acceptance of
                            the revised terms.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="bg-gradient-to-r from-[#0C3C85] to-[#0F4BA8] text-white rounded-3xl p-10 text-center">
                        <Mail className="w-10 h-10 mx-auto mb-4" />

                        <h2 className="text-3xl font-bold mb-4">
                            Need Clarification?
                        </h2>

                        <p className="text-blue-100 max-w-2xl mx-auto mb-6">
                            If you have questions regarding these Terms &
                            Conditions, our support team will be happy to help.
                        </p>

                        <div className="font-semibold text-lg">
                            hello@thegroomsta.com
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}