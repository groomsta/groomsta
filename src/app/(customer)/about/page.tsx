"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Lock,
  Star,
  Users,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const teamMembers = [
  {
    name: "Amit Harivansh",
    role: "Co-founder",
    image: "/unknown.png",
    bio: "Building Groomsta's vision, product strategy and technology roadmap.",
  },
  {
    name: "Rohit Kumar",
    role: "Business & Operations Head",
    image: "/team/rohit.png",
    bio: "Leading partner onboarding, operations and market expansion.",
  },
  {
    name: "Abhay Bansal",
    role: "Product Head & Execution",
    image: "/team/abhay.png",
    bio: "Executing the Business, Growth and leading the Product.",
  },
  {
    name: "Raj Chaurasiya",
    role: "Marketing Head",
    image: "/team/raj.png",
    bio: "Leading Public Relations, Marketing & overall Branding.",
  },
  {
    name: "Ashmit Singh",
    role: "Developer",
    image: "/team/unknown.png",
    bio: "Working on fintech development and customer experience.",
  },
  {
    name: "Abhishek Gupta",
    role: "Developer",
    image: "/team/abhishek.png",
    bio: "Working on backend systems and platform development.",
  },
  {
    name: "Md. Hammaduddin",
    role: "Developer",
    image: "/team/unknown.png",
    bio: "Supporting frontend engineering and product improvements.",
  },
];

const milestones = [
  {
    year: "2025",
    title: "The Idea",
    description:
      "The vision for premium doorstep grooming was born.",
  },
  {
    year: "2025",
    title: "Groomsta Founded",
    description:
      "Company formation and planning began.",
  },
  {
    year: "2025",
    title: "Website Launch",
    description:
      "The first Groomsta platform went live.",
  },
  {
    year: "2025",
    title: "First Partner",
    description:
      "Initial grooming professionals joined the platform.",
  },
  {
    year: "2025",
    title: "First Customer",
    description:
      "Successfully delivered our first home grooming experience.",
  },
  {
    year: "2026",
    title: "Platform Rebuild",
    description:
      "Building a modern scalable technology foundation.",
  },
];

const testimonials = [
  {
    name: "Rahul S.",
    city: "Delhi",
    quote:
      "The experience felt more premium than my regular salon visit. Extremely convenient and professional.",
  },
  {
    name: "Arjun M.",
    city: "Gurgaon",
    quote:
      "Booking was easy, the barber arrived on time and delivered exceptional service.",
  },
  {
    name: "Karan V.",
    city: "Noida",
    quote:
      "Finally a grooming platform that understands convenience and quality.",
  },
];

export default function AboutPage() {
  const [teamIndex, setTeamIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(
        (prev) => (prev + 1) % testimonials.length
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const nextTeam = () => {
    setTeamIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevTeam = () => {
    setTeamIndex(
      (prev) => (prev - 1 + teamMembers.length) %
      teamMembers.length
    );
  };

  return (
    <main className="relative overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[150px]" />

      {/* Hero Section */}
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
            India's Premium Home Grooming Platform
          </span>

          <h1 className="mt-8 text-5xl font-bold leading-tight md:text-7xl">
            Bringing Premium
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {" "}
              Grooming Home
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400 md:text-xl">
            Groomsta is redefining grooming by connecting customers with verified professionals who deliver premium salon-quality services directly at home.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <button className="rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-black transition hover:scale-105">
              Book Appointment
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-4 transition hover:border-yellow-500/50">
              Learn More
              <ArrowRight size={18} />
            </button>

          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-5xl grid-cols-2 gap-5 md:grid-cols-4">

          {[
            "Verified Professionals",
            "Doorstep Service",
            "Customer First",
            "Delhi NCR",
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <h3 className="font-semibold">{item}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-32">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-10 lg:grid-cols-2"
        >

          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-3 backdrop-blur-xl">

            <div className="relative h-[500px] overflow-hidden rounded-[30px] bg-zinc-900">

              <Image
                src="/team/ceo.jpg"
                alt="Founder"
                fill
                className="object-cover"
              />

            </div>

          </div>

          <div className="flex flex-col justify-center">

            <span className="text-yellow-400">
              Founder Story
            </span>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Meet Bhavuk
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              Groomsta began with a simple observation:
              people can order food, book a cab, and shop online within minutes —
              yet grooming still requires travelling, waiting, and uncertainty.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              The mission behind Groomsta is to bring premium grooming directly to customers through technology, trust, and verified professionals.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              {[
                "Startup Founder",
                "Product Builder",
                "Customer Focused",
                "Delhi NCR",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400"
                >
                  {item}
                </div>
              ))}

            </div>

          </div>

        </motion.div>
      </section>

      {/* Team Section */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="mb-16 text-center">

          <span className="text-yellow-400">
            Team
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            The People Building Groomsta
          </h2>

        </div>

        <div className="relative">

          <div className="grid gap-6 md:grid-cols-4">

            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >

                <div className="relative h-72 bg-zinc-900">

                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-yellow-400">
                    {member.role}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {member.bio}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>
                  </div>
      </section>

      {/* Journey Timeline */}

      <section className="relative mx-auto max-w-6xl px-6 py-32">

        <div className="mb-20 text-center">

          <span className="text-yellow-400">
            Our Journey
          </span>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Building The Future of Home Grooming
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-zinc-400">
            Every startup begins with a simple idea. Groomsta's journey is just getting started, and every milestone brings us closer to transforming how India experiences grooming services.
          </p>

        </div>

        <div className="relative">

          {/* Timeline Line */}

          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-yellow-400 via-orange-500 to-yellow-400 md:block" />

          <div className="space-y-16">

            {milestones.map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >

                <div className="w-full md:w-1/2">
                  <div
                    className={`rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl ${
                      index % 2 === 0
                        ? "md:mr-16"
                        : "md:ml-16"
                    }`}
                  >

                    <span className="text-sm text-yellow-400">
                      {item.year}
                    </span>

                    <h3 className="mt-3 text-2xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-zinc-400">
                      {item.description}
                    </p>

                  </div>
                </div>

                <div className="hidden md:flex md:w-1/2" />

                <div className="absolute left-1/2 top-10 hidden h-6 w-6 -translate-x-1/2 rounded-full border-4 border-black bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.9)] md:block" />

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* Trust Badges */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="mb-16 text-center">

          <span className="text-yellow-400">
            Trust & Safety
          </span>

          <h2 className="mt-4 text-4xl font-bold">
            Why Customers Trust Groomsta
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            Trust is at the center of every Groomsta experience.
            Every service is designed around professionalism,
            safety and customer satisfaction.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {[
            {
              icon: ShieldCheck,
              title: "Verified Professionals",
              desc: "All professionals undergo identity verification before joining.",
            },
            {
              icon: BadgeCheck,
              title: "Quality Standards",
              desc: "Consistent grooming standards across all services.",
            },
            {
              icon: Lock,
              title: "Secure Bookings",
              desc: "Reliable and secure booking experience.",
            },
            {
              icon: Award,
              title: "Professional Excellence",
              desc: "Focused on premium customer experiences.",
            },
            {
              icon: Users,
              title: "Customer Support",
              desc: "Dedicated support whenever assistance is needed.",
            },
            {
              icon: Star,
              title: "Customer Satisfaction",
              desc: "Every appointment is centered around customer happiness.",
            },
          ].map((badge, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:border-yellow-500/40"
            >

              <badge.icon
                size={42}
                className="text-yellow-400"
              />

              <h3 className="mt-6 text-xl font-bold">
                {badge.title}
              </h3>

              <p className="mt-4 text-zinc-400">
                {badge.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* Testimonials */}

      <section className="mx-auto max-w-6xl px-6 py-32">

        <div className="mb-16 text-center">

          <span className="text-yellow-400">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            What Customers Say
          </h2>

        </div>

        <div className="relative overflow-hidden">

          <motion.div
            key={testimonialIndex}
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="rounded-[40px] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl md:p-16"
          >

            <div className="mb-8 flex justify-center gap-2">

              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="fill-yellow-400 text-yellow-400"
                  size={24}
                />
              ))}

            </div>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-zinc-300 md:text-2xl">
              "{testimonials[testimonialIndex].quote}"
            </p>

            <div className="mt-10">

              <h4 className="text-xl font-semibold">
                {testimonials[testimonialIndex].name}
              </h4>

              <p className="mt-2 text-zinc-500">
                {testimonials[testimonialIndex].city}
              </p>

            </div>

          </motion.div>

          <div className="mt-8 flex justify-center gap-3">

            {testimonials.map((_, index) => (

              <button
                key={index}
                onClick={() =>
                  setTestimonialIndex(index)
                }
                className={`h-3 w-3 rounded-full transition-all ${
                  testimonialIndex === index
                    ? "bg-yellow-400"
                    : "bg-zinc-700"
                }`}
              />

            ))}

          </div>

        </div>

      </section>
            {/* Final CTA Section */}

      <section className="relative mx-auto max-w-7xl px-6 pb-32">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative overflow-hidden rounded-[40px] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-transparent p-10 md:p-20"
        >

          {/* Background Glow */}

          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[120px]" />

          <div className="relative z-10 text-center">

            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
              Join The Groomsta Journey
            </span>

            <h2 className="mt-8 text-4xl font-bold md:text-6xl">
              Experience Premium Grooming
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                At Your Doorstep
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-zinc-400 md:text-xl">
              Discover a smarter way to groom. Book trusted professionals,
              enjoy premium services, and experience the convenience of
              Groomsta from the comfort of your home.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

              <button className="rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-black transition duration-300 hover:scale-105">
                Book Appointment
              </button>

              <button className="rounded-2xl border border-white/10 px-8 py-4 font-medium transition duration-300 hover:border-yellow-500/50 hover:bg-white/5">
                Become a Partner
              </button>

            </div>

          </div>

        </motion.div>

      </section>

    </main>
  );
}