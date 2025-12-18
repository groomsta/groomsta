'use client';

import { useState } from 'react';

export default function ServiceabilityCheck() {
  const [pincode, setPincode] = useState('');

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call logic here
  };

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-6 lg:mb-8">
          Check Serviceability in Delhi NCR
        </h2>

        {/* Input Group */}
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="flex-1 px-5 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C3C85] focus:border-transparent text-base lg:text-lg transition-all"
          />
          <button
            type="submit"
            className="bg-[#0C3C85] text-white px-8 lg:px-10 py-4 rounded-lg hover:bg-blue-700 transition-all font-semibold text-base lg:text-lg whitespace-nowrap shadow-md hover:shadow-lg lg:cursor-pointer cursor-default"
          >
            Check
          </button>
        </form>

        <p className="text-gray-600 text-sm lg:text-base">
          Currently serving: <span className="font-semibold">Delhi, Noida, Gurgaon, Faridabad, Ghaziabad.</span>
        </p>
      </div>
    </section>
  );
}
