"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck, Clock3, CreditCard, Users } from "lucide-react";

const faqs = [
  {
    question: "How does Groomsta work?",
    answer:
      "Simply choose a service, select your preferred date and time, and confirm your booking. A verified grooming professional or salon partner will be assigned to serve you."
  },
  {
    question: "Do you provide home grooming services?",
    answer:
      "Yes. Groomsta offers professional home grooming services across Delhi NCR, bringing salon-quality experiences directly to your doorstep."
  },
  {
    question: "Are your barbers and stylists verified?",
    answer:
      "Absolutely. Every grooming professional on Groomsta goes through a verification and onboarding process before being allowed to serve customers."
  },
  {
    question: "Can I book a salon appointment through Groomsta?",
    answer:
      "Yes. In addition to home services, Groomsta allows you to discover and book trusted partner salons near you."
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Yes. Depending on the booking status, you can reschedule or cancel directly through the platform. Cancellation policies may vary by service."
  },
  {
    question: "How do payments work?",
    answer:
      "Payments can be made securely online. Once Razorpay is fully integrated, customers will be able to complete transactions through trusted payment gateways."
  },
  {
    question: "Which areas do you currently serve?",
    answer:
      "We are currently focused on Delhi NCR and are actively expanding our network of professionals and partner salons."
  },
  {
    question: "How can I become a Groomsta Partner?",
    answer:
      "Salon owners, barbers, and grooming professionals can apply through our Partner Registration page. Our team will review and verify your application."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="inline-flex items-center gap-2 bg-blue-100 text-[#0C3C85] px-4 py-2 rounded-full text-sm font-semibold">
            Frequently Asked Questions
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold text-[#1A1A1A]">
            Everything You Need
            <br />
            To Know About Groomsta
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            We've answered the most common questions from customers,
            salon owners, and grooming professionals.
          </p>
        </div>
      </section>

      {/* Trust Cards */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <ShieldCheck className="w-10 h-10 text-[#0C3C85] mx-auto mb-3" />
              <h3 className="font-bold">Verified Professionals</h3>
            </div>

            <div className="bg-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <Clock3 className="w-10 h-10 text-[#0C3C85] mx-auto mb-3" />
              <h3 className="font-bold">Quick Booking</h3>
            </div>

            <div className="bg-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <CreditCard className="w-10 h-10 text-[#0C3C85] mx-auto mb-3" />
              <h3 className="font-bold">Secure Payments</h3>
            </div>

            <div className="bg-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <Users className="w-10 h-10 text-[#0C3C85] mx-auto mb-3" />
              <h3 className="font-bold">Growing Partner Network</h3>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">

          <div className="space-y-4">

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left bg-white"
                >
                  <span className="font-semibold text-lg text-[#1A1A1A]">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-[#0C3C85] rounded-3xl p-12 text-center text-white shadow-xl">

            <h2 className="text-4xl font-bold mb-5">
              Still Have Questions?
            </h2>

            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Our team is ready to help with bookings, partnerships,
              support requests, and anything else you need.
            </p>

            <a
              href="/contact"
              className="inline-block bg-white text-[#0C3C85] font-semibold px-8 py-4 rounded-xl hover:scale-105 transition"
            >
              Contact Us
            </a>

          </div>

        </div>
      </section>
    </main>
  );
}