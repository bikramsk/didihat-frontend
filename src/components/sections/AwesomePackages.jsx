import React from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';

const AwesomePackages = () => {
  const packages = [
    {
      id: 1,
      image: "/images/packages/golden-triangle-tour.jpg",
      location: "Golden Triangle Tour",
      days: "6 days",
      persons: "2 Person",
      price: "24,999",
      rating: 5,
      description: "Explore Delhi, Agra & Jaipur's iconic landmarks"
    },
    {
      id: 2,
      image: "/images/packages/kerala-backwaters.jpg",
      location: "Kerala Backwaters",
      days: "5 days",
      persons: "2 Person",
      price: "26,999",
      rating: 5,
      description: "Experience the serene backwaters and beaches"
    },
    {
      id: 3,
      image: "/images/packages/varanasi-ganga.jpg",
      location: "Varanasi & Ganga",
      days: "4 days",
      persons: "2 Person",
      price: "18,999",
      rating: 5,
      description: "Spiritual journey through ancient traditions"
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
            <span className="text-[#84cc16] font-medium uppercase tracking-wider text-sm">Tour Packages</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Tour Packages</h2>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.location}
                  loading="lazy"
                  className="w-full h-54 object-cover"
                />
                <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs">
                  20% OFF
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title and Location */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 mb-1">{pkg.location}</h3>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-[#84cc16]" />
                    <span className="text-sm">India</span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Calendar className="w-4 h-4 text-[#84cc16]" />
                    <span className="text-sm">{pkg.days}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Users className="w-4 h-4 text-[#84cc16]" />
                    <span className="text-sm">{pkg.persons}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {pkg.description}
                </p>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-[#84cc16] font-bold text-lg">
                    ₹{pkg.price}
                  </div>
                  <button className="px-4 py-1.5 bg-[#84cc16] text-white text-sm rounded-lg hover:bg-[#65a30d] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwesomePackages; 