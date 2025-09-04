import React from 'react';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ destination, className = "", onClick }) => {
  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onClick={() => onClick(destination.slug)}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10 rounded-lg"></div>
      <div className={destination.aspectRatio || "aspect-[4/3]"}>
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <div className={`absolute ${destination.textPosition || "bottom-3 left-3"} z-20`}>
        <h3 className={`text-white font-semibold ${destination.titleSize || "text-sm"} mb-0.5`}>
          {destination.name}
        </h3>
        <p className={`text-white/90 ${destination.subtitleSize || "text-xs"}`}>
          {destination.description}
        </p>
      </div>
    </div>
  );
};

const PopularDestinations = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      name: 'Agra',
      description: 'City of Taj Mahal',
      image: '/images/destinations/agra.jpg',
      slug: 'agra'
    },
    {
      name: 'Delhi',
      description: 'The Capital Heritage',
      image: '/images/destinations/delhi.jpg',
      slug: 'delhi'
    },
    {
      name: 'Varanasi',
      description: 'Spiritual Capital',
      image: '/images/destinations/varanasi.jpg',
      slug: 'varanasi'
    },
    {
      name: 'Kerala',
      description: "God's Own Country",
      image: '/images/destinations/kerala.jpg',
      slug: 'kerala'
    },
    {
      name: 'Rishikesh',
      description: 'Yoga Capital of World',
      image: '/images/destinations/rishikesh.jpg',
      slug: 'rishikesh',
      aspectRatio: 'h-full',
      textPosition: 'bottom-4 left-4',
      titleSize: 'text-lg',
      subtitleSize: 'text-sm'
    }
  ];

  const handleDestinationClick = (destinationSlug) => {
    navigate(`/attraction/${destinationSlug}`);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#003B95]"></div>
            <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Popular Destinations</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Top Picks for Indian Travelers</h2>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-12 gap-2">
          {/* Left Side - 4 destinations in 2x2 grid */}
          <div className="col-span-8 grid grid-cols-2 gap-2">
            {destinations.slice(0, 4).map((destination) => (
              <DestinationCard
                key={destination.slug}
                destination={destination}
                onClick={handleDestinationClick}
              />
            ))}
          </div>

          {/* Right Side - Rishikesh (large card) */}
          <div className="col-span-4">
            <DestinationCard
              destination={destinations[4]} // Rishikesh
              className="h-full"
              onClick={handleDestinationClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;