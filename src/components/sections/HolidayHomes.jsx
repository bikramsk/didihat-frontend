import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//  custom styles for Swiper
const swiperStyles = `
  .swiper-button-next,
  .swiper-button-prev {
    background-color: white;
    padding: 20px;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 14px;
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

const HolidayHomes = () => {
  const properties = [
    {
      id: 1,
      name: "Omkar Apartment",
      location: "Kasar Devi Road Almora, Uttarakhand",
      rating: "9.4",
      ratingText: "Exceptional",
      reviews: "78 reviews",
      price: "₹ 8,999",
      image: "/images/holiday-homes/test.jpg",
      slug: "omkar-apartment-almora"
    },
    {
      id: 2,
      name: "Kopila Homestay",
      location: "Nayabazaar, Kathmandu",
      rating: "9.1",
      ratingText: "Superb",
      reviews: "246 reviews",
      price: "₹ 13,812",
      image: "/images/holiday-homes/test.jpg",
      slug: "kopila-homestay-kathmandu"
    },
    {
      id: 3,
      name: "Riverside Resort Rishikesh",
      location: "Rishikesh, Uttarakhand",
      rating: "9.8",
      ratingText: "Exceptional",
      reviews: "187 reviews",
      price: "₹ 16,487",
      image: "/images/holiday-homes/test.jpg",
      slug: "riverside-resort-rishikesh"
    },
    {
      id: 4,
      name: "Lake View Apartments",
      location: "Nainital, Uttarakhand",
      rating: "9.7",
      ratingText: "Exceptional",
      reviews: "144 reviews",
      price: "₹ 7,005",
      image: "/images/holiday-homes/test.jpg",
      slug: "lake-view-apartments-nainital"
    },
    {
      id: 5,
      name: "Mountain Retreat Auli",
      location: "Auli, Uttarakhand",
      rating: "9.0",
      ratingText: "Superb",
      reviews: "98 reviews",
      price: "₹ 12,193",
      image: "/images/holiday-homes/test.jpg",
      slug: "mountain-retreat-auli"
    },
    {
      id: 6,
      name: "Valley View Resort",
      location: "Dehradun, Uttarakhand",
      rating: "9.2",
      ratingText: "Superb",
      reviews: "156 reviews",
      price: "₹ 8,999",
      image: "/images/holiday-homes/test.jpg",
      slug: "valley-view-resort-dehradun"
    },
    {
      id: 7,
      name: "Heritage Homestay",
      location: "Almora, Uttarakhand",
      rating: "9.4",
      ratingText: "Exceptional",
      reviews: "78 reviews",
      price: "₹ 5,999",
      image: "/images/holiday-homes/test.jpg",
      slug: "heritage-homestay-almora"
    },
    {
      id: 8,
      name: "Luxury Villa in Mussoorie",
      location: "Mussoorie, Uttarakhand",
      rating: "9.1",
      ratingText: "Superb",
      reviews: "246 reviews",
      price: "₹ 13,812",
      image: "/images/holiday-homes/test.jpg",
      slug: "luxury-villa-mussoorie"
    }
  ];

  return (
    <section className="py-8 bg-white">
      <style>{swiperStyles}</style>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#003B95]"></div>
            <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Holiday Homes</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Holiday Homes</h2>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
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
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="!pb-10 !px-1"
          >
            {properties.map((property) => (
              <SwiperSlide key={property.id}>
                <Link 
                  to={`/property/${property.slug}`}
                  className="block bg-white rounded-lg overflow-hidden shadow-md group h-full hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <button 
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to favorites functionality here u can add
                      }}
                    >
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-base text-gray-900 mb-1.5 line-clamp-1">
                      {property.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                      {property.location}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                        {property.rating}
                      </span>
                      <span className="font-medium text-xs">
                        {property.ratingText}
                      </span>
                      <span className="text-gray-600 text-xs">
                        • {property.reviews}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600">Starting from</p>
                        <p className="text-base font-bold text-gray-900">{property.price}</p>
                      </div>
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

export default HolidayHomes; 