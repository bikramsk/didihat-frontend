import React from 'react';
import { Globe2, Building2, Users2, Settings, Car, Mountain, Camera, Utensils } from 'lucide-react';

const OurServices = () => {
  const servicesRow1 = [
    {
      icon: <Globe2 className="w-10 h-10 text-[#84cc16]" />,
      title: "Uttarakhand Tours",
      description: "Explore the divine beauty of Uttarakhand with our carefully curated tour packages"
    },
    {
      icon: <Building2 className="w-10 h-10 text-[#84cc16]" />,
      title: "Hotel Booking",
      description: "Best hotels and resorts at prime locations across Uttarakhand for your comfort"
    },
    {
      icon: <Users2 className="w-10 h-10 text-[#84cc16]" />,
      title: "Expert Guides",
      description: "Local experienced guides to help you discover the hidden gems of Devbhoomi"
    },
    {
      icon: <Settings className="w-10 h-10 text-[#84cc16]" />,
      title: "Travel Planning",
      description: "Customized travel itineraries and complete trip management services"
    }
  ];

  const servicesRow2 = [
    {
      icon: <Car className="w-10 h-10 text-[#84cc16]" />,
      title: "Taxi Services",
      description: "Comfortable and reliable transportation with experienced local drivers"
    },
    {
      icon: <Mountain className="w-10 h-10 text-[#84cc16]" />,
      title: "Adventure Tours",
      description: "Thrilling trekking, camping, and adventure activities in the Himalayas"
    },
    {
      icon: <Camera className="w-10 h-10 text-[#84cc16]" />,
      title: "Photography Tours",
      description: "Capture the breathtaking landscapes and cultural heritage of Uttarakhand"
    },
    {
      icon: <Utensils className="w-10 h-10 text-[#84cc16]" />,
      title: "Food Experience",
      description: "Taste authentic Pahadi cuisine and local delicacies of Uttarakhand"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
            <h3 className="text-[#84cc16] font-medium uppercase tracking-wider text-sm">Services</h3>
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
        </div>

        {/* Services Grid - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesRow1.map((service, index) => (
            <div 
              key={index}
              className="bg-white shadow-lg p-6 rounded-xl text-center group hover:bg-[#84cc16] transition-all duration-300 ease-in-out"
            >
              <div className="inline-block p-3 rounded-xl bg-gray-50 group-hover:bg-white/90 transition-colors duration-300 mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm group-hover:text-white/90">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Services Grid - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {servicesRow2.map((service, index) => (
            <div 
              key={index}
              className="bg-white shadow-lg p-6 rounded-xl text-center group hover:bg-[#84cc16] transition-all duration-300 ease-in-out"
            >
              <div className="inline-block p-3 rounded-xl bg-gray-50 group-hover:bg-white/90 transition-colors duration-300 mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm group-hover:text-white/90">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices; 