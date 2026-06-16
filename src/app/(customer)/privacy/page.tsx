import { Shield, Lock, Database, CreditCard, Eye, Mail } from "lucide-react";

export default function PrivacyPage() {
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
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            Your Privacy Matters
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6">
                        Privacy Policy
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-blue-100 leading-relaxed">
                        At Groomsta, protecting your personal information is a
                        core part of our commitment to trust, transparency, and
                        exceptional customer experience.
                    </p>

                    <p className="mt-6 text-blue-200 text-sm">
                        Last Updated: June 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="space-y-10">

                    {/* Intro */}
                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-4 text-[#1A1A1A]">
                            Introduction
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Groomsta respects your privacy and is committed to
                            protecting the personal information you share with
                            us. This Privacy Policy explains how we collect,
                            use, store, and safeguard your information when you
                            use our platform, website, applications, and
                            services.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                Information We Collect
                            </h2>
                        </div>

                        <ul className="space-y-3 text-gray-600">
                            <li>• Full name and contact information</li>
                            <li>• Phone number and email address</li>
                            <li>• Service booking details</li>
                            <li>• Address and location information</li>
                            <li>• Customer reviews and ratings</li>
                            <li>• Device and browser information</li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                How We Use Your Information
                            </h2>
                        </div>

                        <ul className="space-y-3 text-gray-600">
                            <li>• Process bookings and appointments</li>
                            <li>• Match customers with professionals</li>
                            <li>• Improve platform performance</li>
                            <li>• Provide customer support</li>
                            <li>• Send booking updates and notifications</li>
                            <li>• Prevent fraud and abuse</li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                Payments & Transactions
                            </h2>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            Payments made through Groomsta are processed using
                            secure third-party payment providers. We do not
                            store your complete card details or sensitive
                            payment credentials on our servers.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-[#0C3C85]" />
                            <h2 className="text-2xl font-bold">
                                Data Security
                            </h2>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            We implement industry-standard security practices to
                            protect your information against unauthorized
                            access, misuse, disclosure, or alteration.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">
                            Third-Party Services
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Groomsta may use trusted third-party providers for
                            payment processing, analytics, communication, and
                            service delivery. These providers have their own
                            privacy practices and security standards.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">
                            Your Rights
                        </h2>

                        <ul className="space-y-3 text-gray-600">
                            <li>• Access your personal information</li>
                            <li>• Request correction of inaccurate data</li>
                            <li>• Request deletion of your account</li>
                            <li>• Withdraw consent for communications</li>
                            <li>• Request information about stored data</li>
                        </ul>
                    </div>

                    {/* Contact Card */}
                    <div className="bg-gradient-to-r from-[#0C3C85] to-[#0F4BA8] text-white rounded-3xl p-10 text-center">
                        <Mail className="w-10 h-10 mx-auto mb-4" />

                        <h2 className="text-3xl font-bold mb-4">
                            Contact Us
                        </h2>

                        <p className="text-blue-100 max-w-2xl mx-auto mb-6">
                            If you have questions regarding this Privacy Policy
                            or how your information is handled, please contact
                            us.
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