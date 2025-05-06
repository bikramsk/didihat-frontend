import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ExploreIndia = () => {
  const destinations = [
    {
      id: 1,
      image: '/images/explore/delhi.jpg',
      title: 'Delhi',
      places: '1500 properties'
    },
    
    {
      id: 2,
      image: '/images/explore/goa.jpg',
      title: 'Goa',
      places: '1800 properties'
    },
  
    {
      id: 3,
      image: '/images/explore/kerala.jpg',
      title: 'Kerala',
      places: '1200 properties'
    },
    {
      id: 4,
      image: '/images/explore/rajasthan.jpg',
      title: 'Rajasthan',
      places: '1500 properties'
    },
 
    {
      id: 5,
      image: '/images/explore/banglore.jpg',
      title: 'Banglore',
      places: '1500 properties'
    },
    {
      id: 6,
      image: '/images/explore/chennai.jpg',
      title: 'Chennai',
      places: '1100 properties'
    },
    {
      id: 7,
      image: '/images/explore/mumbai.jpg',
      title: 'Mumbai',
      places: '1000 properties'
    },
    {
      id: 8,
      image: '/images/explore/uttarakhand.jpg',
      title: 'Uttarakhand',
      places: '1200 properties'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
            <span className="text-[#84cc16] font-medium uppercase tracking-wider text-sm">Explore India</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">These trending hotspots deliver unforgettable experiences</h2>
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
            className="explore-india-swiper !px-6"
          >
            {destinations.map((destination) => (
              <SwiperSlide key={destination.id}>
                <div className="group cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {destination.title}
                    </h3>
                    <div className="text-sm text-gray-600">
                      {destination.places}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        .explore-india-swiper :global(.swiper-button-next),
        .explore-india-swiper :global(.swiper-button-prev) {
          color: #84cc16;
          background: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          top: 30%;
        }

        .explore-india-swiper :global(.swiper-button-prev) {
          left: -20px;
        }

        .explore-india-swiper :global(.swiper-button-next) {
          right: -20px;
        }

        .explore-india-swiper :global(.swiper-button-next:after),
        .explore-india-swiper :global(.swiper-button-prev:after) {
          font-size: 20px;
        }

        .explore-india-swiper :global(.swiper-button-disabled) {
          opacity: 0;
          cursor: default;
        }
      `}</style>
    </section>
  );
};

export default ExploreIndia; 