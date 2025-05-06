import React from 'react';
import { Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const UniqueProperties = () => {
  const properties = [
    {
      id: 1,
      name: "Misty Peaks Cottage ",
      location: "Darjeeling",
      rating: "9.1",
      ratingText: "Very Good",
      reviews: "87 reviews",
      image: "/images/unique/property-1.jpg",
      
    },
    {
      id: 2,
      name: "Riversong Retreat",
      location: "Rishikesh",
      rating: "9.1",
      ratingText: "Very Good",
      reviews: "87 reviews",
      image: "/images/unique/property-2.jpg",
      
    },
    {
      id: 3,
      name: "Whispering Pines Stay",
      location: "Ooty",
      rating: "9.5",
      ratingText: "Very Good",
      reviews: "114 reviews",
      image: "/images/unique/property-3.jpg",
     
    },
    {
      id: 4,
      name: "Haveli Havens",
      location: "Rajasthan",
      rating: "9.0",
      ratingText: "Very Good",
      reviews: "34 reviews",
      image: "/images/unique/property-4.jpg",
   
    },
    {
        id: 5,
        name: "The Lazy Lizard Lodge",
        location: "Goa",
        rating: "9.3",
        ratingText: "Very Good",
        reviews: "66 reviews",
        image: "/images/unique/property-5.jpg",
      
      },
      {
        id: 6,
        name: "Shashank",
        location: "Delhi",
        rating: "9.5",
        ratingText: "Very Good",
        reviews: "122 reviews",
        image: "/images/unique/property-5.jpg",
    
      }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
            <span className="text-[#84cc16] font-medium uppercase tracking-wider text-sm"> properties</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Our Top Unique Properties</h2>
        </div>

          {/* Properties Carousel */}
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
              className="unique-properties-swiper !px-6"
            >
              {properties.map((property) => (
                <SwiperSlide key={property.id}>
                  <div className="group cursor-pointer">
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full aspect-[4/3] object-cover"
                      />
                      <button 
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
                        aria-label="Add to favorites"
                      >
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="mt-3">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {property.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {property.location}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                          {property.rating}
                        </span>
                        <span className="text-sm font-medium">
                          {property.ratingText}
                        </span>
                        <span className="text-sm text-gray-600">
                          • {property.reviews}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style jsx>{`
        .unique-properties-swiper :global(.swiper-button-next),
        .unique-properties-swiper :global(.swiper-button-prev) {
          color: #84cc16;
          background: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          top: 30%;
        }

        .unique-properties-swiper :global(.swiper-button-prev) {
          left: -20px;
        }

        .unique-properties-swiper :global(.swiper-button-next) {
          right: -20px;
        }

        .unique-properties-swiper :global(.swiper-button-next:after),
        .unique-properties-swiper :global(.swiper-button-prev:after) {
          font-size: 20px;
        }

        .unique-properties-swiper :global(.swiper-button-disabled) {
          opacity: 0;
          cursor: default;
        }
      `}</style>
    </section>
  );
};

export default UniqueProperties; 