import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      title: "Luxury Accommodations",
      description: "Handpicked Hotels & Resorts"
    },
    {
      title: "Mountain Experiences",
      description: "Adventure & Spiritual Tours"
    },
    {
      title: "Local Transportation",
      description: "Comfortable & Safe Vehicles"
    },
    {
      title: "24/7 Support",
      description: "Always Here to Help"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img 
                src="/images/about/test.jpg" 
                alt="about us" 
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[1px] w-8 bg-[#84cc16]"></div>
                <h3 className="text-[#84cc16] font-medium uppercase tracking-wider text-sm">ABOUT US</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-[#84cc16]">DIDIHAT.com</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Discover the magic of Uttarakhand, where ancient spirituality meets breathtaking landscapes. From snow-capped Himalayan peaks to sacred rivers, we offer curated experiences that showcase the best of Devbhoomi - The Land of Gods.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our commitment is to provide authentic, sustainable tourism experiences while ensuring comfort and luxury for our guests. Let us guide you through this mystical land of adventure and tranquility.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <ArrowRight className="w-5 h-5 text-[#84cc16] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 