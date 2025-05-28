import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const PropertyTypes = () => {
  const propertyTypes = [
    {
      type: "Hotels",
      image: "/images/properties/hotels.jpg"
    },
    {
      type: "Apartments",
      image: "/images/properties/apartments.jpg"
    },
    {
      type: "Resorts",
      image: "/images/properties/resorts.jpg"
    },
    {
      type: "Villas",
      image: "/images/properties/villas.jpg"
    },
    {
      type: "Cabins",
      image: "/images/properties/cabins.jpg"
    },
    {
      type: "Cottages",
      image: "/images/properties/cottages.jpg"
    },
   {
        type: "Serviced Apartments",
        image: "/images/properties/serviced-apartments.jpg"
      },
        {
            type: "Holiday Homes",
            image: "/images/properties/holiday-homes.jpg"
        },
        {
            type: "Motels",
            image: "/images/properties/motels.jpg"
          },
          {
            type: "Guest Houses",
            image: "/images/properties/test.jpg"
          },
          {
            type: "Holiday Parks",
            image: "/images/properties/test.jpg"
            
          },
          {
            type: "Campsites",
            image: "/images/properties/test.jpg"
            
          },
          {
            type: "Farm Stays",
            image: "/images/properties/test.jpg"
            
          },
          {
            type: "Tiny Houses",
            image: "/images/properties/test.jpg"
            
          },
          {
            type: "Luxury Tents",
            image: "/images/properties/test.jpg"
            
          },
  ];

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
                <div className="group cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.type}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-semibold text-gray-900">
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