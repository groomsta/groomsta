export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Browse Services',
      description: 'Explore home grooming or partner salons and choose what you need.',
    },
    {
      number: '2',
      title: 'Choose Slot & Book',
      description: 'Pick your preferred date, time window, and confirm your booking.',
    },
    {
      number: '3',
      title: 'Get a Verified Groomer',
      description: 'A nearby expert accepts your job in under 20 seconds. Relax and enjoy!',
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-[#F2F2F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-montserrat text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3">
            How Groomsta Works
          </h2>
          <p className="text-gray-600 text-base lg:text-lg">
            A seamless experience from start to finish.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Dashed Line - Desktop Only */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] border-t-2 border-dashed border-gray-300 -z-0" />

          {steps.map((step) => (
            <div key={step.number} className="relative text-center z-10">
              {/* Number Circle */}
              <div className="mb-6 relative inline-block">
                <div className="w-28 h-28 lg:w-32 lg:h-32 bg-[#0C3C85] rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <span className="text-5xl lg:text-6xl font-bold text-white">
                    {step.number}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-lg lg:text-xl font-bold text-[#1A1A1A] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
