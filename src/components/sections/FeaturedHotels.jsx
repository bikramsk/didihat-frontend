import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    background-color: white;
    padding: 16px;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 12px;
    font-weight: bold;
    color: #666;
  }

  @media (min-width: 1024px) {
    .swiper-pagination {
      display: none;
    }
  }

  .swiper-button-next.swiper-button-disabled,
  .swiper-button-prev.swiper-button-disabled {
    opacity: 0;
  }
`;

const FeaturedHotels = () => {
  const hotels = [
    {
      id: 1,
      name: "The Naini Retreat",
      location: "Nainital, Uttarakhand",
      rating: 8.5,
      ratingText: "Very good",
      reviews: "342 reviews",
      price: "₹ 6,999",
      oldPrice: "₹ 8,999",
      image: "/images/hotels/test.jpg",
      amenities: ["Free Wifi", "Restaurant", "Parking"],
      slug: "the-naini-retreat"
    },
    {
      id: 2,
      name: "Taj Corbett Resort & Spa",
      location: "Jim Corbett, Uttarakhand",
      rating: 9.2,
      ratingText: "Exceptional",
      reviews: "567 reviews",
      price: "₹ 12,999",
      oldPrice: "₹ 15,999",
      image: "/images/hotels/test.jpg",
      amenities: ["Spa", "Pool", "Restaurant"],
      slug: "taj-corbett-resort"
    },
    {
      id: 3,
      name: "Ganga Kinare Resort",
      location: "Rishikesh, Uttarakhand",
      rating: 8.8,
      ratingText: "Fabulous",
      reviews: "423 reviews",
      price: "₹ 5,499",
      oldPrice: "₹ 7,499",
      image: "/images/hotels/test.jpg",
      amenities: ["River View", "Yoga Center", "Spa"],
      slug: "ganga-kinare-resort"
    },
    {
      id: 4,
      name: "The Savoy Mussoorie",
      location: "Mussoorie, Uttarakhand",
      rating: 9.0,
      ratingText: "Superb",
      reviews: "289 reviews",
      price: "₹ 8,999",
      oldPrice: "₹ 11,999",
      image: "/images/hotels/test.jpg",
      amenities: ["Mountain View", "Bar", "Fitness Center"],
      slug: "savoy-mussoorie"
    },
    {
      id: 5,
      name: "Madhuban Resort",
      location: "Dehradun, Uttarakhand",
      rating: 8.7,
      ratingText: "Excellent",
      reviews: "178 reviews",
      price: "₹ 4,999",
      oldPrice: "₹ 6,499",
      image: "/images/hotels/test.jpg",
      amenities: ["Pool", "Restaurant", "Garden"],
      slug: "madhuban-resort"
    },
    {
        id: 6,
        name: "Madhuban Resort",
        location: "Dehradun, Uttarakhand",
        rating: 8.7,
        ratingText: "Excellent",
        reviews: "178 reviews",
        price: "₹ 4,999",
        oldPrice: "₹ 6,499",
        image: "/images/hotels/test.jpg",
        amenities: ["Pool", "Restaurant", "Garden"],
        slug: "madhuban-resort"
      }
  ];

  return (
    <section className="py-8 bg-white">
      <style>{swiperStyles}</style>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
            <h3 className="text-[#84cc16] font-medium uppercase tracking-wider text-xs">Top Rated</h3>
            <div className="h-[1px] w-8 bg-[#84cc16]"></div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Hotels in Uttarakhand</h2>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              hideOnClick: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
            className="!pb-10 !px-1"
          >
            {hotels.map((hotel) => (
              <SwiperSlide key={hotel.id}>
                <Link 
                  to={`/hotel/${hotel.slug}`}
                  className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300 h-full"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="font-semibold text-base text-gray-900 mb-1 line-clamp-1">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-1.5">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{hotel.location}</span>
                    </div>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap items-center gap-1 mb-2">
                      {hotel.amenities.map((amenity, index) => (
                        <span 
                          key={index} 
                          className="text-[10px] bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                          {hotel.rating}
                        </span>
                        <span className="text-gray-500 text-xs font-medium">
                          {hotel.ratingText}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#84cc16] fill-[#84cc16]" />
                        <span className="text-gray-500 text-xs">
                          {hotel.reviews}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <div className="flex items-center gap-1">
                          <p className="text-base font-bold text-gray-900">{hotel.price}</p>
                          <p className="text-sm text-gray-500 line-through">{hotel.oldPrice}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-green-600">Per night</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels; 