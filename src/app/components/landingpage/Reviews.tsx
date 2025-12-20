import { Star } from 'lucide-react';

export default function Reviews() {
  return (
    <section className="py-12 lg:py-20 bg-[#F2F2F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200" />
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <div className="mb-2">
                <h4 className="text-lg lg:text-xl font-bold text-[#1A1A1A]">
                  Aarav Patel
                </h4>
                <p className="text-gray-600 text-sm lg:text-base">
                  Haircut & Beard Trim
                </p>
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F2C94C] text-[#F2C94C]" />
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-gray-700 italic leading-relaxed text-sm lg:text-base">
                "Absolutely fantastic service! The groomer was punctual, professional, and did an 
                amazing job. It's so convenient to get a salon-quality cut at home. Highly recommend 
                Groomsta!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
