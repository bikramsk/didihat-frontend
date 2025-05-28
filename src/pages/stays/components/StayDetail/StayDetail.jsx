import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star,
  Users,
  BedDouble,
  Car,
  UtensilsCrossed,
  Snowflake,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Flower2,
  X
} from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const ImageGallery = ({ images }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Add useEffect for scroll lock
  useEffect(() => {
    if (showAllImages) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAllImages]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center rounded-xl">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  // Full screen gallery modal
  if (showAllImages) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden flex flex-col">
        <div className="p-4 flex justify-between items-center text-white">
          <span className="font-medium">
            {activeImageIndex + 1}/{images.length}
          </span>
          <button
            onClick={() => setShowAllImages(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main image slider */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full h-full flex items-center justify-center p-4">
            <img 
              src={images[activeImageIndex]} 
              alt={`Property view ${activeImageIndex + 1}`} 
              className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
              }}
            />
          </div>
          {/* Navigation buttons */}
          <button
            className="absolute left-4 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            onClick={() => setActiveImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            onClick={() => setActiveImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  // Responsive, modern gallery
  return (
    <div className="w-full">
      {/* Mobile: Main image + horizontal thumbnails */}
      <div className="block md:hidden">
        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-2 cursor-pointer relative" onClick={() => { setActiveImageIndex(0); setShowAllImages(true); }}>
          <img
            src={images[0]}
            alt="Main property view"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
            }}
          />
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              +{images.length - 1} more
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-[#003B95] transition cursor-pointer"
                onClick={() => { setActiveImageIndex(idx + 1); setShowAllImages(true); }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 2}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100x100?text=Image';
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Desktop: Modern grid */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[400px] relative">
        
        <div 
          className="col-span-2 row-span-2 relative rounded-l-xl overflow-hidden cursor-pointer group"
          onClick={() => { setActiveImageIndex(0); setShowAllImages(true); }}
        >
          <img
            src={images[0]}
            alt="Main property view"
            className="w-full h-full object-cover "
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        {/* Secondary images */}
        {images.slice(1, 5).map((img, idx) => (
          <div 
            key={idx}
            className={`relative overflow-hidden cursor-pointer group ${
              idx === 1 ? 'rounded-tr-xl' : idx === 3 ? 'rounded-br-xl' : ''
            }`}
            onClick={() => { setActiveImageIndex(idx + 1); setShowAllImages(true); }}
          >
            <img
              src={img}
              alt={`Property view ${idx + 2}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {/*Show all photos*/}
            {idx === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button
                  className="bg-white py-2 px-4 rounded-lg shadow-md font-medium hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllImages(true);
                  }}
                >
                  Show all {images.length} photos
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const StayDetail = () => {
  const { id } = useParams();
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const shareDropdownRef = useRef(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setShowCopyNotification(true);
          setTimeout(() => {
            setShowCopyNotification(false);
          }, 2000); 
        }).catch(err => {
          console.error('Failed to copy:', err);
        });
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        break;
    }
    setShowShareDropdown(false);
  };

  const calculateTotalNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    if (!selectedRoomType || !stay?.room_types) return 0;
    const selectedRoom = stay.room_types.find(room => room.id === selectedRoomType);
    if (!selectedRoom) return 0;
    const nights = calculateTotalNights();
    const basePrice = selectedRoom.price * nights;
    const cleaningFee = 500;
    const serviceFee = 500;
    return basePrice + cleaningFee + serviceFee;
  };

  useEffect(() => {
    const fetchStayDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the specific stay using slug with populated relations
        const response = await fetch(
          `${STRAPI_URL}/api/stays?filters[slug][$eq]=${id}&populate[stayimages][populate]=*&populate[room_types][populate]=*&populate[amenities][populate]=*`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`
            }
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${responseData.error?.message || response.statusText}`);
        }

        if (!responseData.data || responseData.data.length === 0) {
          throw new Error(`Stay "${id}" not found. Please check the URL and try again.`);
        }

        // Get the stay ID for fetching related data
        const stayId = responseData.data[0].id;
        
        // Fetch FAQs for this stay using the correct relation structure
        let processedFaqs = [];
        try {
          const faqResponse = await fetch(
            `${STRAPI_URL}/api/faqs?filters[related_stay][id]=${stayId}&populate=*`,
            {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`
              }
            }
          );
          
          if (faqResponse.ok) {
            const faqData = await faqResponse.json();
            
            if (faqData?.data && Array.isArray(faqData.data) && faqData.data.length > 0) {
              processedFaqs = faqData.data.map(faq => ({
                id: faq.id,
                question: faq.question,
                answer: faq.answer
              }));
            }
          }
        } catch (err) {
          console.error('Error fetching FAQs:', err);
          // Don't throw error to prevent breaking the whole page
        }

        // Fetch house rules for this stay - using the one-to-one relationship
        let processedHouseRules = null;
        try {
          const houseRuleResponse = await fetch(
            `${STRAPI_URL}/api/house-rules?filters[stay][id]=${stayId}&populate=*`,
            {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`
              }
            }
          );
          
          if (houseRuleResponse.ok) {
            const houseRuleData = await houseRuleResponse.json();
            
            if (houseRuleData?.data && Array.isArray(houseRuleData.data) && houseRuleData.data.length > 0) {
              const rule = houseRuleData.data[0];
              processedHouseRules = {
                id: rule.id,
                checkIn: rule.checkInTime,
                checkOut: rule.checkOutTime,
                cancellationPolicy: rule.cancellationPolicy,
                childrenPolicy: rule.childrenPolicy,
                bedPolicy: rule.bedPolicy,
                ageRestriction: rule.ageRestriction,
                petsPolicy: rule.petsPolicy,
                eventsPolicy: rule.eventsPolicy,
                quietHours: rule.quietHours
              };
            }
          }
        } catch (err) {
          console.error('Error fetching house rules:', err);
          // Don't throw error to prevent breaking the whole page
        }

        // Also fetch nearby places for this stay
        const nearbyResponse = await fetch(
          `${STRAPI_URL}/api/nearby-places?filters[stay][id][$eq]=${stayId}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`
            }
          }
        );
        
        const nearbyData = await nearbyResponse.json();

        const rawData = responseData.data[0];
        
        const stayData = rawData.attributes || rawData;
        if (rawData.id && !stayData.id) {
          stayData.id = rawData.id; // Ensure ID is always available
        }
        
        // Helper function to safely access and transform amenities data
        const processFeatures = (features, type) => {
          if (!features) return [];
          
          // Handle both array format and data.attributes format
          const items = features.data 
            ? features.data.map(item => item.attributes ? {...item.attributes, id: item.id} : item)
            : Array.isArray(features) ? features : [];
            
          return items.map(item => {
            const name = item.name || '';
            
            
            
            let iconUrl = null;
            if (item.icon) {
              if (item.icon.data?.attributes?.url) {
                iconUrl = `${STRAPI_URL}${item.icon.data.attributes.url}`;
              } else if (item.icon.url) {
                iconUrl = `${STRAPI_URL}${item.icon.url}`;
              }
            }
            
           
            
            return {
              id: item.id,
              name: name.replace(/-/g, ' '),
              type: type,
              iconUrl
            };
          });
        };
        
        // Process different feature types
        const processedAmenities = processFeatures(stayData.amenities, 'amenities');
        const processedMealOptions = processFeatures(stayData.meal_options, 'meal options');
        const processedActivities = processFeatures(stayData.activities, 'activities');
        const processedRoomFacilities = processFeatures(stayData.room_facilities, 'room facilities');
        
        // Process images
        const processedImages = stayData.stayimages?.data 
          ? stayData.stayimages.data.map(img => `${STRAPI_URL}${img.attributes?.url}`)
          : Array.isArray(stayData.stayimages) 
            ? stayData.stayimages.map(img => `${STRAPI_URL}${img.url || img.attributes?.url}`) 
            : [];
            
        // Process room types
        const processedRoomTypes = stayData.room_types?.data
          ? stayData.room_types.data.map(room => {
              // console.log('Room data structure:', room);
              // console.log('Room Image data:', room.attributes?.Image || room.Image);
              return {
                id: room.id,
                name: room.attributes?.Name || room.Name,
                price: room.attributes?.Price || room.Price,
                maxGuests: room.attributes?.MaxGuests || room.MaxGuests,
                description: room.attributes?.Description || room.Description,
                bedConfiguration: room.attributes?.BedConfiguration || room.BedConfiguration,
                Image: room.attributes?.Image || room.Image
              };
            })
          : Array.isArray(stayData.room_types)
            ? stayData.room_types.map(room => ({
                id: room.id,
                name: room.Name,
                price: room.Price,
                maxGuests: room.MaxGuests,
                description: room.Description,
                bedConfiguration: room.BedConfiguration,
                Image: room.Image
              }))
            : [];

        // Process nearby places
        const nearbyPlaces = nearbyData?.data?.map(place => {
          const attributes = place.attributes || place;
         
          let distanceValue = Number(attributes.Distance);
          let distanceLabel = '';
          if (!isNaN(distanceValue)) {
            if (distanceValue < 1) {
              distanceLabel = `${Math.round(distanceValue * 1000)} m`;
            } else if (distanceValue > 0 && distanceValue < 100) {
              distanceLabel = `${distanceValue} km`;
            } else {
              distanceLabel = `${distanceValue} m`;
            }
          } else {
            distanceLabel = attributes.Distance || '';
          }
          return {
            id: place.id,
            name: attributes.Name || '',
            type: attributes.Type || 'other',
            description: attributes.Description || '',
            distance: distanceLabel,
            walkTime: attributes.WalkingTime || ''
          };
        }) || [];

        // Transform the data to match our needs
        const transformedStay = {
          id: stayData.id,
          slug: stayData.slug,
          name: stayData.name,
          location: stayData.location,
          description: stayData.description,
          rating: stayData.rating,
          reviews: stayData.reviews,
          price: parseInt(stayData.price),
          maxGuests: stayData.maxGuests,
          bedrooms: stayData.bedrooms,
          bathrooms: stayData.bathrooms,
          stayimages: processedImages,
          amenities: processedAmenities,
          meal_options: processedMealOptions,
          activities: processedActivities, 
          room_facilities: processedRoomFacilities,
          room_types: processedRoomTypes,
          nearby_places: nearbyPlaces,
          faqs: processedFaqs,
          house_rules: processedHouseRules,
        };

        setStay(transformedStay);
      } catch (err) {
        console.error('Error fetching stay:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStayDetails();
    } else {
      setError('No slug provided in URL');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (stay?.room_types?.length > 0) {
      setSelectedRoomType(stay.room_types[0].id);
    }
  }, [stay]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading stay details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-semibold mb-4">Error Loading Stay</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">{error}</p>
        <div className="flex gap-4">
          <Link 
            to="/stays" 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse All Stays
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!stay) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <section className="bg-gray-900 pt-28 pb-16">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="w-full max-w-4xl mt-6">
            <SearchBar />
          </div>
        </div>
      </section>

      
      <div className="container mx-auto px-4 min-h-full">
        {/* Title  */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 my-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {stay.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{stay.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{stay.rating}</span>
                <span className="text-gray-400">({stay.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={shareDropdownRef}>
              <button 
                onClick={() => setShowShareDropdown(!showShareDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
              
              {showShareDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy link
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                      X
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <Heart className="w-5 h-5" />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Modern Gallery */}
 <div className="container mx-auto px-4 mb-12">
          <ImageGallery images={stay.stayimages} />
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start min-h-full">
          {/* Left Column  */}
          <div className="lg:col-span-2">
        

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">About this place</h2>
              <div className="text-gray-600 leading-relaxed mb-6">
                <p className="mb-4">
                  {stay.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-6">What this Place offers</h2>
              
              {/* Combine all features */}
              {(() => {
                // Combine all features into a single array
                const allFeatures = [
                  ...(stay.amenities || []),
                  ...(stay.meal_options || []),
                  ...(stay.activities || []),
                  ...(stay.room_facilities || [])
                ];
                
                // Group features by type
                const featuresByType = allFeatures.reduce((groups, feature) => {
                  const type = feature.type || 'amenities';
                  if (!groups[type]) {
                    groups[type] = [];
                  }
                  groups[type].push(feature);
                  return groups;
                }, {});
                
                // Check if any features are available
                const hasFeatures = Object.values(featuresByType).some(group => group.length > 0);
                
                if (!hasFeatures) {
                  return (
                    <div className="text-gray-500 text-center py-4">
                      No features available for this stay
                    </div>
                  );
                }
                
                // Display features by category
                return Object.entries(featuresByType).map(([type, features]) => (
                  <div key={type} className="mb-6 last:mb-0">
                    <h3 className="font-semibold text-lg mb-4 capitalize">{type}</h3>
              <div className="grid grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                          {feature.iconUrl && (
                            <img 
                              src={feature.iconUrl} 
                              alt={`${feature.name} icon`} 
                              className="w-6 h-6 object-contain opacity-80 filter brightness-75"
                            />
                          )}
                          <span className="text-gray-600 capitalize">{feature.name}</span>
                  </div>
                ))}
              </div>
                  </div>
                ));
              })()}
            </div>

            {/* Room Types Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-6">Room Types</h2>
              <div className="space-y-8">
                {stay.room_types.map((room) => (
                  <div key={room.id} className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    {room.Image?.data?.attributes?.url && (
                      <img
                        src={`${STRAPI_URL}${room.Image.data.attributes.url}`}
                        alt={room.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    )}
                    {!room.Image?.data?.attributes?.url && room.Image?.url && (
                      <img
                        src={`${STRAPI_URL}${room.Image.url}`}
                        alt={room.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    )}
                    {!room.Image?.data?.attributes?.url && !room.Image?.url && (
                      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                    <p className="text-gray-600 mb-4">
                        {room.description}
                    </p>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                          <span>{room.maxGuests} Guests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-4 h-4" />
                          <span>{room.bedConfiguration}</span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-[#003B95]">
                        {formatPrice(room.price)} / night
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Nearby Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-2">
              <h2 className="text-2xl font-bold mb-6">What's Nearby</h2>
              
              {!stay.nearby_places || stay.nearby_places.length === 0 ? (
                <div className="text-gray-500 text-center py-4">
                  No nearby places available for this stay
                    </div>
              ) : (
                <NearbyPlacesDisplay places={stay.nearby_places} />
              )}
              </div>

         
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 self-start h-full">
            {/* Show on map  */}
            <div className="mb-4">
              <div className="font-semibold text-gray-900 mb-2">Show on map</div>
              <div className="w-full h-[100px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title="Stay Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(stay.location)}&output=embed`}
                ></iframe>
              </div>
            </div>
            {/* Booking card*/}
            <div className="sticky top-24">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-2xl font-bold">
                      {selectedRoomType && stay.room_types ? 
                        formatPrice(stay.room_types.find(room => room.id === selectedRoomType)?.price || 0) 
                        : formatPrice(0)}
                    </span>
                    <span className="text-gray-500"> / night</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{stay.rating}</span>
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-4 mb-4">
                  {/* Room Type Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Room Type</label>
                    <select
                      value={selectedRoomType || ''}
                      onChange={(e) => setSelectedRoomType(Number(e.target.value))}
                      className="w-full border-0 p-0 focus:ring-0"
                    >
                      {stay.room_types.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} - {formatPrice(room.price)}/night
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="border-r">
                      <label className="block text-sm font-medium mb-1">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full border-0 p-0 focus:ring-0"
                        placeholder="mm/dd/yyyy"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full border-0 p-0 focus:ring-0"
                        placeholder="mm/dd/yyyy"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Rooms</label>
                      <select
                        value={rooms}
                        onChange={(e) => setRooms(Number(e.target.value))}
                        className="w-full border-0 p-0 focus:ring-0"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num} room{num !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Adults</label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full border-0 p-0 focus:ring-0"
                      >
                        {selectedRoomType && stay.room_types && Array.from(
                          { length: stay.room_types.find(room => room.id === selectedRoomType)?.maxGuests || 1 }, 
                          (_, i) => i + 1
                        ).map(num => (
                          <option key={num} value={num}>{num} adult{num !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Children</label>
                      <select
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        className="w-full border-0 p-0 focus:ring-0"
                      >
                        <option value={0}>No children</option>
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num} child{num !== 1 ? 'ren' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#003B95] text-white py-3 rounded-lg font-medium hover:bg-[#002D70] transition-colors">
                  Reserve now
                </button>

                <div className="mt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">
                      {selectedRoomType && stay.room_types ? 
                        `${formatPrice(stay.room_types.find(room => room.id === selectedRoomType)?.price || 0)} × ${calculateTotalNights()} nights`
                        : `${formatPrice(0)} × 0 nights`}
                    </span>
                    <span>
                      {selectedRoomType && stay.room_types ? 
                        formatPrice((stay.room_types.find(room => room.id === selectedRoomType)?.price || 0) * calculateTotalNights())
                        : formatPrice(0)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span>{formatPrice(500)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Service fee</span>
                    <span>{formatPrice(500)}</span>
                  </div>
                  <div className="flex justify-between py-4 border-t border-gray-200 mt-4">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{formatPrice(calculateTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* House Rules Section */}
        <div className="container mx-auto">
          <div className="bg-white border rounded-xl shadow-sm mb-12 mt-12">
            <div className="px-8 pt-8 pb-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">House rules</h2>
              <p className="text-gray-700 text-base mb-4">Please check the property policies below.</p>
            </div>
            <HouseRulesSection houseRules={stay.house_rules} />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto mb-16">
          <div className="bg-white border rounded-xl shadow-sm">
            <div className="px-8 pt-8 pb-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-700 text-base mb-4">Find answers to common questions about this stay.</p>
            </div>
            
            {/* Inline FAQ Accordion */}
            <FaqSection stay={stay} />
          </div>
        </div>
      </div>

      {/* Copy Notification */}
      {showCopyNotification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-up">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Link copied to clipboard</span>
        </div>
      )}
    </div>
  );
};

const NearbyPlacesDisplay = ({ places }) => {
  // Group places by type
  const placesByType = places.reduce((groups, place) => {
    const type = place.type || 'other';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(place);
    return groups;
  }, {});
  
  // Map of type to icon component
  const typeIcons = {
    restaurant: <UtensilsCrossed className="w-5 h-5 text-[#003B95]" />,
    transport: <Car className="w-5 h-5 text-[#003B95]" />,
    nature: <Flower2 className="w-5 h-5 text-[#003B95]" />,
    airport: (
      <svg className="w-5 h-5 text-[#003B95]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  };
  
  // Map of type to display name
  const typeNames = {
    restaurant: "Restaurants & Cafes",
    transport: "Public Transport",
    nature: "Natural Beauty",
    airport: "Closest Airports"
  };
  
  return (
    <>
      {Object.entries(placesByType).map(([type, typeOfPlaces]) => (
        <div key={type} className="mb-8 last:mb-0">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {typeIcons[type] || <MapPin className="w-5 h-5 text-[#003B95]" />}
            {typeNames[type] || type.charAt(0).toUpperCase() + type.slice(1)}
          </h3>
          <div className="space-y-4">
            {typeOfPlaces.map((place) => (
              <div key={place.id} className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-500">{place.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {place.description}
                    {place.walkTime && place.description ? ', ' : ''}
                    {place.walkTime && `${place.walkTime} walk`}
                  </p>
                </div>
                <span className="text-gray-500">{place.distance}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

// Updated FaqSection to only use Strapi FAQs
function FaqSection({ stay }) {
  const [openIndex, setOpenIndex] = React.useState(null);
  
  // Only use FAQs from Strapi
  const faqs = stay?.faqs || [];
  
  // Display message if no FAQs are available
  if (faqs.length === 0) {
    return (
      <div className="px-8 py-6 text-gray-500 text-center">
        No FAQs available for this stay.
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {faqs.map((faq, idx) => (
        <div key={faq.id || idx} className="border-t border-gray-100 first:border-t-0">
          <button
            className="w-full flex justify-between items-center px-8 py-5 text-left focus:outline-none hover:bg-gray-50 transition"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span className="font-medium text-gray-900 text-base">{faq.question}</span>
            <svg
              className={`w-5 h-5 ml-2 transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === idx && (
            <div className="px-8 pb-5 text-gray-700 text-base animate-fade-in">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Update the HouseRulesSection component
function HouseRulesSection({ houseRules }) {
  // If no house rules found, don't display the section
  if (!houseRules) {
    return null;
  }

  // Helper function to extract text from blocks field
  const getTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return '';
    
    try {
      return blocks.map(block => {
        if (block.type === 'paragraph') {
          return block.children.map(child => child.text).join('');
        }
        return '';
      }).join(' ');
    } catch {
      return '';
    }
  };
  
  // For rich text fields, check if they need parsing
  const cancellationPolicyText = typeof houseRules.cancellationPolicy === 'string' 
    ? houseRules.cancellationPolicy 
    : getTextFromBlocks(houseRules.cancellationPolicy);
    
  const childrenPolicyText = typeof houseRules.childrenPolicy === 'string'
    ? houseRules.childrenPolicy
    : getTextFromBlocks(houseRules.childrenPolicy);
    
  const bedPolicyText = typeof houseRules.bedPolicy === 'string'
    ? houseRules.bedPolicy
    : getTextFromBlocks(houseRules.bedPolicy);
  
  return (
            <div className="divide-y">
              {/* Check-in */}
              <div className="flex flex-col md:flex-row items-start gap-4 px-8 py-6">
                <div className="flex items-center min-w-[160px]">
                  <svg className="w-6 h-6 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 2v6h6"/><path d="M3 10v12h18V10"/><path d="M8 2h8"/><path d="M12 6v6"/></svg>
                  <span className="font-semibold text-gray-900">Check-in</span>
                </div>
        <div className="text-gray-700 text-base">
          {houseRules.checkIn}
              </div>
      </div>

              {/* Checkout */}
              <div className="flex flex-col md:flex-row items-start gap-4 px-8 py-6">
                <div className="flex items-center min-w-[160px]">
                  <svg className="w-6 h-6 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 22v-6H2"/><path d="M21 14V2H3v12"/><path d="M16 22h-8"/><path d="M12 18v-6"/></svg>
                  <span className="font-semibold text-gray-900">Check-out</span>
                </div>
        <div className="text-gray-700 text-base">
          {houseRules.checkOut}
              </div>
      </div>

              {/* Cancellation */}
      {cancellationPolicyText && (
              <div className="flex flex-col md:flex-row items-start gap-4 px-8 py-6">
                <div className="flex items-center min-w-[160px]">
                  <svg className="w-6 h-6 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <span className="font-semibold text-gray-900">Cancellation policy</span>
                </div>
          <div className="text-gray-700 text-base">
            {cancellationPolicyText}
              </div>
        </div>
      )}

              {/* Children */}
      {(childrenPolicyText || bedPolicyText) && (
              <div className="flex flex-col md:flex-row items-start gap-4 px-8 py-6">
                <div className="flex items-center min-w-[160px]">
                  <svg className="w-6 h-6 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <span className="font-semibold text-gray-900">Children and beds</span>
                </div>
                <div className="flex-1 grid md:grid-cols-2 gap-4">
            {childrenPolicyText && (
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Child policies</div>
                <div className="text-gray-700 text-base">
                  {childrenPolicyText}
                  </div>
              </div>
            )}
            {bedPolicyText && (
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Cot and extra bed policies</div>
                <div className="text-gray-700 text-base">
                  {bedPolicyText}
                  </div>
                </div>
            )}
              </div>
        </div>
      )}

              {/* No age restriction */}
      {houseRules.ageRestriction && (
              <div className="flex flex-col md:flex-row items-start gap-4 px-8 py-6">
                <div className="flex items-center min-w-[160px]">
                  <svg className="w-6 h-6 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <span className="font-semibold text-gray-900">No age restriction</span>
                </div>
          <div className="text-gray-700 text-base">
            {houseRules.ageRestriction}
              </div>
        </div>
      )}

              {/* Pets */}
      {houseRules.petsPolicy && (
              <div className="flex flex-col md:flex-row items-start gap-4 px-8 py-6">
                <div className="flex items-center min-w-[160px]">
                  <svg className="w-6 h-6 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.318 6.318a4.5 4.5 0 0 0 6.364 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"/></svg>
                  <span className="font-semibold text-gray-900">Pets</span>
                </div>
          <div className="text-gray-700 text-base">
            {houseRules.petsPolicy}
              </div>
        </div>
      )}

              {/* Parties & Events */}
      {houseRules.eventsPolicy && (
              <div className="flex flex-col md:flex-row items-start gap-4 px-8 py-6">
                <div className="flex items-center min-w-[160px]">
                  <svg className="w-6 h-6 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
                  <span className="font-semibold text-gray-900">Parties & Events</span>
                </div>
          <div className="text-gray-700 text-base">
            {houseRules.eventsPolicy}
            {houseRules.quietHours && <span> Quiet hours: {houseRules.quietHours}</span>}
              </div>
            </div>
      )}
    </div>
  );
}

export default StayDetail; 
