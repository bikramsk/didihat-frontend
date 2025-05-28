import React from 'react';
import { Globe2, Building2, Users2, Settings, Car, Mountain, Camera, Utensils } from 'lucide-react';

const OurServices = () => {
  const servicesRow1 = [
    {
      icon: <Globe2 className="w-10 h-10 text-[#003B95]" />,
      title: "Tour Packages",
      description: "Explore the diverse beauty of India with our carefully curated tour packages"
    },
    {
      icon: <Building2 className="w-10 h-10 text-[#003B95]" />,
      title: "Hotel Booking",
      description: "Best hotels and resorts at prime locations for your comfort"
    },
    {
      icon: <Users2 className="w-10 h-10 text-[#003B95]" />,
      title: "Expert Guides",
      description: "Professional guides to help you discover hidden gems"
    },
    {
      icon: <Settings className="w-10 h-10 text-[#003B95]" />,
      title: "Travel Planning",
      description: "Customized travel itineraries and trip management services"
    }
  ];

  const servicesRow2 = [
    {
      icon: <Car className="w-10 h-10 text-[#003B95]" />,
      title: "Transport Services",
      description: "Comfortable and reliable transportation with experienced drivers"
    },
    {
      icon: <Mountain className="w-10 h-10 text-[#003B95]" />,
      title: "Adventure Tours",
      description: "Exciting adventure activities across India's diverse landscapes"
    },
    {
      icon: <Camera className="w-10 h-10 text-[#003B95]" />,
      title: "Photography Tours",
      description: "Capture the breathtaking landscapes and cultural heritage of India"
    },
    {
      icon: <Utensils className="w-10 h-10 text-[#003B95]" />,
      title: "Food Experience",
      description: "Experience diverse regional cuisines and authentic local delicacies across India"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#003B95]"></div>
            <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Our Services</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">What we offer</h2>
        </div>

        {/* Services Grid - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesRow1.map((service, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-xl flex items-start gap-4"
            >
              <div className="p-2 rounded-xl bg-gray-50">
                {service.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {servicesRow2.map((service, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-xl flex items-start gap-4"
            >
              <div className="p-2 rounded-xl bg-gray-50">
                {service.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices; 