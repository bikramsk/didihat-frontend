import React from 'react';

const PopularDestinations = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
            <span className="text-[#84cc16] font-medium uppercase tracking-wider text-sm">Popular Destinations</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Top Picks for Indian Travelers</h2>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-12 gap-2">
          {/* Left Column */}
          <div className="col-span-8 grid grid-cols-2 gap-2">
            {/* Agra */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10 rounded-lg"></div>
              <div className="aspect-[4/3]">
                <img 
                  src="/images/destinations/agra.jpg" 
                  alt="Agra"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-3 left-3 z-20">
                <h3 className="text-white font-semibold text-sm mb-0.5">Agra</h3>
                <p className="text-white/90 text-xs">City of Taj Mahal</p>
              </div>
            </div>

            {/* Delhi */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10 rounded-lg"></div>
              <div className="aspect-[4/3]">
                <img 
                  src="/images/destinations/delhi.jpg" 
                  alt="delhi"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-3 left-3 z-20">
                <h3 className="text-white font-semibold text-sm mb-0.5">Delhi</h3>
                <p className="text-white/90 text-xs">The Capital Heritage</p>
              </div>
            </div>

            {/* Varanasi */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10 rounded-lg"></div>
              <div className="aspect-[4/3]">
                <img 
                  src="/images/destinations/varanasi.jpg" 
                  alt="varanasi"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-3 left-3 z-20">
                <h3 className="text-white font-semibold text-sm mb-0.5">Varanasi</h3>
                <p className="text-white/90 text-xs">Spiritual Capital</p>
              </div>
            </div>

            {/* Kerala */}
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10 rounded-lg"></div>
              <div className="aspect-[4/3]">
                <img 
                  src="/images/destinations/kerala.jpg" 
                  alt="kerala"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-3 left-3 z-20">
                <h3 className="text-white font-semibold text-sm mb-0.5">Kerala</h3>
                <p className="text-white/90 text-xs">God's Own Country</p>
              </div>
            </div>
          </div>

          {/* Right Column - Rishikesh */}
          <div className="col-span-4">
            <div className="relative group cursor-pointer h-full">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10 rounded-lg"></div>
              <div className="h-full">
                <img 
                  src="/images/destinations/rishikesh.jpg" 
                  alt="Rishikesh"
                  className="w-full h-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <h3 className="text-white font-semibold text-lg mb-1">Rishikesh</h3>
                <p className="text-white/90 text-sm">Yoga Capital of World</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations; 