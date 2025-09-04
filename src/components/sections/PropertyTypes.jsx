import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

const PropertyTypes = () => {
  const navigate = useNavigate();

  const propertyTypes = [
    {
      type: "Hotels",
      image: "/images/properties/hotels.jpg",
      filter: "hotels"
    },
    
    {
      type: "Resorts",
      image: "/images/properties/resorts.jpg",
      filter: "resorts"
    },
    {
      type: "Villas",
      image: "/images/properties/villas.jpg",
      filter: "villas"
    },
     {
      type: "Homestays",
      image: "/images/properties/holiday-homes.jpg",
      filter: "Homestays"
    },
    {
      type: "Cabins",
      image: "/images/properties/cabins.jpg",
      filter: "cabins"
    },
    {
      type: "Cottages",
      image: "/images/properties/cottages.jpg",
      filter: "cottages"
    },
    {
      type: "Serviced Apartments",
      image: "/images/properties/serviced-apartments.jpg",
      filter: "serviced apartments"
    },
   
    {
      type: "Motels",
      image: "/images/properties/motels.jpg",
      filter: "motels"
    },
    {
      type: "Apartments",
      image: "/images/properties/apartments.jpg",
      filter: "apartments"
    },
    {
      type: "Guest Houses",
      image: "/images/properties/test.jpg",
      filter: "guest houses"
    },
    {
      type: "Holiday Parks",
      image: "/images/properties/test.jpg",
      filter: "holiday parks"
    },
    {
      type: "Campsites",
      image: "/images/properties/test.jpg",
      filter: "campsites"
    },
    {
      type: "Farm Stays",
      image: "/images/properties/test.jpg",
      filter: "farm stays"
    },
    {
      type: "Tiny Houses",
      image: "/images/properties/test.jpg",
      filter: "tiny houses"
    },
    {
      type: "Luxury Tents",
      image: "/images/properties/test.jpg",
      filter: "luxury tents"
    },
  ];

  const handlePropertyClick = (property) => {
  
    navigate(`/stays?propertyType=${encodeURIComponent(property.filter)}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#003B95]"></div>
            <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Properties</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by property type</h2>
        </div>

        <div className="relative -mx-6">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="property-types-swiper !px-6"
          >
            {propertyTypes.map((property, index) => (
              <SwiperSlide key={index}>
                <div 
                  className="group cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handlePropertyClick(property)}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.type}
                      className="w-full h-48 object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#003B95] transition-colors">
                      {property.type}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        .property-types-swiper :global(.swiper-button-next),
        .property-types-swiper :global(.swiper-button-prev) {
          color: #003B95;
          background: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          top: 30%;
        }

        .property-types-swiper :global(.swiper-button-prev) {
          left: -20px;
        }

        .property-types-swiper :global(.swiper-button-next) {
          right: -20px;
        }

        .property-types-swiper :global(.swiper-button-next:after),
        .property-types-swiper :global(.swiper-button-prev:after) {
          font-size: 20px;
        }

        .property-types-swiper :global(.swiper-button-disabled) {
          opacity: 0;
          cursor: default;
        }
      `}</style>
    </section>
  );
};

export default PropertyTypes;