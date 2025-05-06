import React from 'react';
import { Search, CreditCard, Building2 } from 'lucide-react';

const BookingSteps = () => {
  const steps = [
    {
      icon: <Search className="w-6 h-6 text-white" />,
      title: "Find Perfect Stay",
      description: "Discover handpicked hotels and homestays in stunning mountain locations.",
      number: "01"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-white" />,
      title: "Easy Booking",
      description: "Select your dates, make secure payment, and get instant confirmation for your stay.",
      number: "02"
    },
    {
      icon: <Building2 className="w-6 h-6 text-white" />,
      title: "Enjoy Your Stay",
      description: "Experience comfortable accommodation with excellent amenities and memorable hospitality.",
      number: "03"
    }
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
            <span className="text-[#84cc16] font-medium uppercase tracking-wider text-sm">How It Works</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Book in 3 Easy Steps</h2>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-4 bg-white rounded-xl border-2 border-gray-200 transition-all duration-300 relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-3 bg-white px-3 py-1 rounded-full border-2 border-[#84cc16] font-bold text-[#84cc16] text-sm">
                {step.number}
              </div>

              {/* Icon Circle */}
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-[#84cc16] rounded-xl rotate-45 transform group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
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
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#84cc16] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
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