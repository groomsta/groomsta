import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="py-12 lg:py-20 bg-[#0C3C85] rounded-3xl mx-4 sm:mx-6 lg:mx-8 mb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
          Looking for a Fresh Cut Today?
        </h2>
        <p className="text-lg lg:text-xl text-blue-100 mb-6 lg:mb-8 leading-relaxed">
          Book your slot now and experience the best grooming service in town.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-[#F2C94C] text-[#1A1A1A] px-10 lg:px-12 py-4 lg:py-5 rounded-lg hover:bg-yellow-400 transition-all font-bold text-base lg:text-lg shadow-xl hover:shadow-2xl hover:scale-105"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
