import React from 'react';
import { ArrowRight, Home, Mountain, Users, Star, MapPin, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChooseSection = () => {
  const features = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Premium Stays",
      value: "5000+"
    },
    {
      icon: <Mountain className="w-6 h-6" />,
      title: "Scenic Locations",
      value: "500+"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Happy Guests",
      value: "20,000+"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "5-Star Reviews",
      value: "18000+"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Tourist Spots",
      value: "1000+"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Local Experiences",
      value: "300+"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#84cc16] py-12 sm:py-16 md:py-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content Side */}
          <div className="text-white text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Find Your Happy Place
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Escape to handpicked homestays where comfort meets local charm. From mountain cottages to heritage homes, discover stays that feel like yours. Your perfect retreat awaits.
            </p>
            <Link 
              to="/holiday-homes"
              className="inline-flex items-center gap-2 bg-white text-[#84cc16] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 group shadow-lg hover:shadow-xl cursor-pointer text-sm sm:text-base"
            >
              Explore Stays
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Features Grid Side */}
          <div className="relative mt-8 lg:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#84cc16]/10 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                      <div className="text-[#84cc16]">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#84cc16] mb-1">
                      {feature.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">
                      {feature.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-[#65a30d] rounded-full translate-x-1/2 -translate-y-1/2 -z-10"></div>
            <div className="absolute bottom-0 left-1/4 w-12 sm:w-16 h-12 sm:h-16 bg-[#65a30d] rounded-full -z-10"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
};

export default ChooseSection; 