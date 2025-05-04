import React from 'react';

const PopularDestinations = () => {
  return (
    <section className="py-10 sm:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="h-[1px] w-6 sm:w-8 bg-[#84cc16]"></div>
            <h3 className="text-[#84cc16] text-sm sm:text-base font-medium">DESTINATION</h3>
            <div className="h-[1px] w-6 sm:w-8 bg-[#84cc16]"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Popular Destination</h2>
        </div>

        {/* Top Row - Main Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Large Left Card */}
          <div className="sm:col-span-2 lg:col-span-8 relative group overflow-hidden rounded-2xl">
            <div className="aspect-[4/3]">
              <img 
                src="/images/destinations/auli.jpg" 
                alt="Auli"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <span className="bg-red-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">35% OFF</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Auli</span>
              </div>
              <h3 className="text-white text-base sm:text-lg font-bold">Skiing Paradise</h3>
            </div>
          </div>

          {/* Right Column */}
          <div className="sm:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
            {/* Top Right Card -Risikesh*/}
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="aspect-[4/3]">
                <img 
                  src="/images/destinations/rishikesh.jpg" 
                  alt="Rishikesh"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                <span className="bg-red-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">25% OFF</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Rishikesh</span>
                </div>
                <h3 className="text-white text-base sm:text-lg font-bold">Yoga Capital</h3>
              </div>
            </div>

            {/* Bottom Right Card - Kedarnath*/}
            <div className="relative group overflow-hidden rounded-2xl">
              <div className="aspect-[4/3]">
                <img 
                  src="/images/destinations/kedarnath.jpg" 
                  alt="Kedarnath Temple"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                <span className="bg-red-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">35% OFF</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Kedarnath</span>
                </div>
                <h3 className="text-white text-base sm:text-lg font-bold">Abode of Shiva</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Valley of flowers */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="aspect-[4/3]">
              <img 
                src="/images/destinations/chamoli.jpg" 
                alt="Chamoli Valley of Flowers"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <span className="bg-red-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">25% OFF</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Chamoli</span>
              </div>
              <h3 className="text-white text-base sm:text-lg font-bold">Valley of Flowers</h3>
            </div>
          </div>

          {/* Mussoorie */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="aspect-[4/3]">
              <img 
                src="/images/destinations/mussoorie.jpg" 
                alt="Mussoorie"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <span className="bg-red-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">35% OFF</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Mussoorie</span>
              </div>
              <h3 className="text-white text-base sm:text-lg font-bold">Queen of Hills</h3>
            </div>
          </div>

          {/* Nainital */}
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="aspect-[4/3]">
              <img 
                src="/images/destinations/nainital.jpg" 
                alt="Nainital"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <span className="bg-red-500 text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">20% OFF</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Nainital</span>
              </div>
              <h3 className="text-white text-base sm:text-lg font-bold">Lake Paradise</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations; 