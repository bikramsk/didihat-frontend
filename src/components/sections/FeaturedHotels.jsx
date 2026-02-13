import React, { useState, useEffect } from 'react';
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

  /* Ensure consistent card heights */
  .swiper-slide {
    height: auto;
    display: flex;
  }

  .hotel-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 380px;
  }

  .hotel-card-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
  }

  .hotel-card-main-content {
    flex: 1;
  }

  .hotel-card-price {
    margin-top: auto;
  }
`;

const STRAPI_URL = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const FeaturedHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedHotels = async () => {
      try {
        setLoading(true);
        
        // Fetch stays data with filter for hotels
        const queryUrl = `${STRAPI_URL}/api/stays?populate=*&pagination[pageSize]=12&filters[type][$containsi]=hotel`;
        
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
          throw new Error('Failed to fetch hotels data');
        }

        const data = await response.json();
        
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid data structure received from API');
        }

        // Transform the data to match the expected format
        const transformedHotels = data.data.map(stay => {
          const imageUrl = stay.image?.url || null;
          return {
            id: stay.id,
            name: stay.name,
            location: stay.location,
            rating: parseFloat(stay.rating) || 0,
            ratingText: getRatingText(parseFloat(stay.rating) || 0),
            reviews: `${stay.reviews || 0} reviews`,
            price: formatPrice(stay.price),
            oldPrice: formatOldPrice(stay.price), // Generate a slightly higher old price
            image: imageUrl ? `${STRAPI_URL}${imageUrl}` : '/images/hotels/test.jpg',
            amenities: extractAmenities(stay.amenities),
            slug: stay.slug,
            type: stay.type
          };
        });

        setHotels(transformedHotels);
        setError(null);
        
        // Log for debugging
        console.log('Featured Hotels loaded:', transformedHotels.length);
      } catch (error) {
        console.error('Error fetching featured hotels:', error);
        setError(error.message);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedHotels();
  }, []);

  const getRatingText = (rating) => {
    if (rating >= 9.5) return 'Exceptional';
    if (rating >= 9.0) return 'Superb';
    if (rating >= 8.5) return 'Excellent';
    if (rating >= 8.0) return 'Very good';
    if (rating >= 7.5) return 'Good';
    if (rating >= 7.0) return 'Pleasant';
    return 'Fair';
  };

  const formatPrice = (price) => {
    if (!price) return '₹ 0';
    
    // If price is already formatted, return as is
    if (typeof price === 'string' && price.includes('₹')) {
      return price;
    }
    
    // Format numeric price
    const numericPrice = typeof price === 'string' ? 
      parseFloat(price.replace(/[^\d.]/g, '')) : 
      parseFloat(price);
    
    if (isNaN(numericPrice)) return '₹ 0';
    
    return `₹ ${numericPrice.toLocaleString('en-IN')}`;
  };

  const formatOldPrice = (price) => {
    if (!price) return null;
    
    const numericPrice = typeof price === 'string' ? 
      parseFloat(price.replace(/[^\d.]/g, '')) : 
      parseFloat(price);
    
    if (isNaN(numericPrice)) return null;
    
    // Generate old price that's 20-30% higher
    const oldPrice = Math.round(numericPrice * (1.2 + Math.random() * 0.1));
    return `₹ ${oldPrice.toLocaleString('en-IN')}`;
  };

  const extractAmenities = (amenities) => {
    if (!amenities || !Array.isArray(amenities)) return ['Free WiFi', 'Restaurant'];
    
    // Extract first 3 amenities or provide defaults
    const amenityNames = amenities
      .slice(0, 3)
      .map(amenity => amenity.name || amenity)
      .filter(Boolean);
    
    return amenityNames.length > 0 ? amenityNames : ['Free WiFi', 'Restaurant', 'Parking'];
  };

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-12">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Hotels</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Hotels</h2>
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
              <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Hotels</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Hotels</h2>
          </div>
          <div className="text-center py-8 text-red-600">
            <p className="text-lg font-semibold mb-2">Unable to load hotels</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (hotels.length === 0) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-12">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Hotels</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Hotels</h2>
          </div>
          <div className="text-center py-8 text-gray-600">
            <p className="text-lg">No hotels available at the moment</p>
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
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#003B95]"></div>
            <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Hotels</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Hotels</h2>
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
                  to={`/stays/${hotel.slug}`}
                  className="hotel-card block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/images/hotels/test.jpg';
                      }}
                    />
                    {/* Hotel Type Badge */}
                    {hotel.type && (
                      <div className="absolute top-3 left-3 bg-[#003B95] text-white px-2 py-1 rounded text-xs font-medium">
                        {hotel.type}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="hotel-card-content p-3">
                    <div className="hotel-card-main-content">
                      <h3 className="font-semibold text-base text-gray-900 mb-1 line-clamp-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-1.5">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{hotel.location}</span>
                      </div>
                      
                      {/* Amenities */}
                      <div className="flex flex-wrap items-center gap-1 mb-2 min-h-[20px]">
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
                      <div className="min-h-[24px] mb-2">
                        {hotel.rating > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                                {hotel.rating.toFixed(1)}
                              </span>
                              <span className="text-gray-500 text-xs font-medium">
                                {hotel.ratingText}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-[#003B95] fill-[#003B95]" />
                              <span className="text-gray-500 text-xs">
                                {hotel.reviews}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="hotel-card-price flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <div className="flex items-center gap-1">
                          <p className="text-base font-bold text-gray-900">{hotel.price}</p>
                          {hotel.oldPrice && (
                            <p className="text-sm text-gray-500 line-through">{hotel.oldPrice}</p>
                          )}
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