import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
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

const STRAPI_URL = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const HolidayHomes = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidayHomes = async () => {
      try {
        setLoading(true);
        
        // Fetch stays data with filters (resorts, apartments, villas, holiday homes, homestays)
        const queryUrl = `${STRAPI_URL}/api/stays?populate=*&pagination[pageSize]=12&filters[$or][0][type][$containsi]=resort&filters[$or][1][type][$containsi]=apartment&filters[$or][2][type][$containsi]=villa&filters[$or][3][type][$containsi]=holiday&filters[$or][4][type][$containsi]=homestay&filters[$or][5][type][$containsi]=guest`;
        
        const response = await fetch(queryUrl, {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch holiday homes data');
        }

        const data = await response.json();
        
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid data structure received from API');
        }

       
        const transformedProperties = data.data.map(stay => {
          const imageUrl = stay.image?.url || null;
          return {
            id: stay.id,
            name: stay.name,
            location: stay.location,
            rating: parseFloat(stay.rating) || 0,
            ratingText: getRatingText(parseFloat(stay.rating) || 0),
            // reviews: `${stay.reviews || 0} reviews`,
            price: formatPrice(stay.price),
            image: imageUrl ? `${STRAPI_URL}${imageUrl}` : '/images/properties/test.jpg',
            slug: stay.slug,
            type: stay.type
          };
        });

      

        setProperties(transformedProperties);
        setError(null);
      } catch (error) {
        console.error('Error fetching Data:', error);
        setError(error.message);
     
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidayHomes();
  }, []);

  const getRatingText = (rating) => {
    if (rating >= 9.5) return 'Exceptional';
    if (rating >= 9.0) return 'Superb';
    if (rating >= 8.5) return 'Excellent';
    if (rating >= 8.0) return 'Very Good';
    if (rating >= 7.0) return 'Good';
    return 'Fair';
  };

  const formatPrice = (price) => {
    if (!price) return '₹ 0';
    
    
    if (typeof price === 'string' && price.includes('₹')) {
      return price;
    }
    
    
    const numericPrice = typeof price === 'string' ? 
      parseFloat(price.replace(/[^\d.]/g, '')) : 
      parseFloat(price);
    
    if (isNaN(numericPrice)) return '₹ 0';
    
    return `₹ ${numericPrice.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-12">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Holiday Homes</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Holiday Homes</h2>
          </div>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-12">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Holiday Homes</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Holiday Homes</h2>
          </div>
          <div className="text-center py-8 text-red-600">
            <p className="text-lg font-semibold mb-2">Unable to load holiday homes</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-12">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Holiday Homes</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Holiday Homes</h2>
          </div>
          <div className="text-center py-8 text-gray-600">
            <p className="text-lg">No holiday homes available at the moment</p>
            <p className="text-sm">Please check back later for new listings</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white">
      <style>{swiperStyles}</style>
      <div className="container mx-auto px-4">
        {/*  Header */}
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
                  to={`/stays/${property.slug}`}
                  className="block bg-white rounded-lg overflow-hidden shadow-md group h-full hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/properties/test.jpg';
                      }}
                    />
                    <button 
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        //addto wishlist
                      }}
                    >
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    {/* Property Type Badge */}
                    {property.type && (
                      <div className="absolute top-3 left-3 bg-[#003B95] text-white px-2 py-1 rounded text-xs font-medium">
                        {property.type}
                      </div>
                    )}
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
                    {property.rating > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                          {property.rating.toFixed(1)}
                        </span>
                        <span className="font-medium text-xs">
                          {property.ratingText}
                        </span>
                        {/* <span className="text-gray-600 text-xs">
                          • {property.reviews}
                        </span> */}
                      </div>
                    )}

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