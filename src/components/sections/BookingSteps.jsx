import React from 'react';
import { Search, CreditCard, Building2 } from 'lucide-react';

const BookingSteps = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Find Perfect Stay",
      description: "Browse through our curated collection of hotels and homestays in Uttarakhand's most scenic locations.",
      number: "01"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-white" />,
      title: "Easy Booking",
      description: "Select your dates, make secure payment, and get instant confirmation for your stay.",
      number: "02"
    },
    {
      icon: <Building2 className="w-8 h-8 text-white" />,
      title: "Enjoy Your Stay",
      description: "Experience comfortable accommodation with excellent amenities and memorable hospitality.",
      number: "03"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
            <h3 className="text-[#84cc16] font-medium uppercase tracking-wider text-sm">HOW IT WORKS</h3>
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Perfect Stay</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Follow these simple steps to find and book your ideal accommodation in the beautiful destinations of Uttarakhand.</p>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 bg-white rounded-xl border-2 border-[#84cc16] hover:shadow-xl transition-all duration-300 relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-5 bg-white px-4 py-2 rounded-full border-2 border-[#84cc16] font-bold text-[#84cc16]">
                {step.number}
              </div>

              {/* Icon Circle */}
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-[#84cc16] rounded-2xl rotate-45 transform group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
                  <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-[2px]">
                    <div className="relative h-full">
                      <div className="absolute top-0 left-0 w-full h-full bg-[#84cc16] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                     
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#84cc16] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-[#84cc16] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingSteps; 