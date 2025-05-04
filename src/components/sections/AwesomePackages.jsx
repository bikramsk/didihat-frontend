import React from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';

const AwesomePackages = () => {
  const packages = [
    {
      id: 1,
      image: "/images/packages/kedarnath.jpg",
      location: "Kedarnath",
      days: "3 days",
      persons: "2 Person",
      price: "14,999",
      rating: 5,
      description: "Experience the divine journey to Kedarnath, one of the holiest shrines in India, nestled in the majestic Himalayas."
    },
    {
      id: 2,
      image: "/images/packages/kedarnath.jpg",
      location: "Chamoli",
      days: "4 days",
      persons: "2 Person",
      price: "16,999",
      rating: 5,
      description: "Trek through the stunning Valley of Flowers National Park, a UNESCO World Heritage site known for its meadows of endemic alpine flowers."
    },
    {
      id: 3,
      image: "/images/packages/kedarnath.jpg",
      location: "Rishikesh",
      days: "3 days",
      persons: "2 Person",
      price: "12,999",
      rating: 5,
      description: "Adventure and spirituality blend perfectly in Rishikesh. Experience rafting, yoga, and the sacred Ganges aarti."
    }
  ];

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <div className="h-[1px] w-6 md:w-8 bg-[#84cc16]"></div>
            <h3 className="text-[#84cc16] text-sm md:text-base font-medium">PACKAGES</h3>
            <div className="h-[1px] w-6 md:w-8 bg-[#84cc16]"></div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Most Popular Tours</h2>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Image Container */}
              <div className="relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.location}
                  loading="lazy"
                  className="w-full h-48 sm:h-52 md:h-56 lg:h-64 object-cover"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  20% OFF
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                {/* Package Info */}
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-[#84cc16] flex-shrink-0" />
                    <span className="text-sm sm:text-base line-clamp-1">{pkg.location}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Calendar className="w-4 h-4 text-[#84cc16] flex-shrink-0" />
                      <span className="text-sm sm:text-base whitespace-nowrap">{pkg.days}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Users className="w-4 h-4 text-[#84cc16] flex-shrink-0" />
                      <span className="text-sm sm:text-base whitespace-nowrap">{pkg.persons}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 min-h-[60px] sm:min-h-[72px] md:min-h-[80px] text-sm sm:text-base leading-relaxed line-clamp-3">
                  {pkg.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(pkg.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Price and Buttons */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6">
                  <div className="text-[#84cc16] font-bold text-xl sm:text-2xl w-full sm:w-auto text-center sm:text-left">
                    ₹{pkg.price}
                  </div>
                  <div className="flex w-full sm:w-auto gap-2 sm:gap-3 justify-center sm:justify-end">
                    <button className="w-1/2 sm:w-auto px-3 sm:px-4 py-2 text-[#84cc16] border border-[#84cc16] rounded-lg hover:bg-[#84cc16] hover:text-white transition-colors text-sm sm:text-base">
                      Read More
                    </button>
                    <button className="w-1/2 sm:w-auto px-3 sm:px-4 py-2 bg-[#84cc16] text-white rounded-lg hover:bg-[#65a30d] transition-colors text-sm sm:text-base">
                      Book Now
                    </button>
                  </div>
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