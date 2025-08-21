import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star, Calendar, Clock, Share2, Heart, ChevronLeft, ChevronRight, X, ChevronDown, Calendar as CalendarIcon, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../../../context/CartContext';

// const API_URL = import.meta.env.MODE === "production"
//   ? "https://admin.didihat.com"
//   : "http://localhost:1350";

  const API_URL = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const getHeaders = () => ({
  'Authorization': `Bearer ${API_TOKEN}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

const HeroSection = () => {
  return (
    <section className="bg-gray-900 pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-4xl mx-auto">
         
        </div>
      </div>
    </section>
  );
};

const ImageGallery = ({ images }) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (showAllImages) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAllImages]);

  if (!images || images.length === 0) {
    return null;
  }

  // Full screen gallery view
  if (showAllImages) {
    return (
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        <div className="p-4 flex justify-between items-center text-white">
          <button
            onClick={() => setShowAllImages(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="font-medium">
            {activeImageIndex + 1} / {images.length}
          </span>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
        <div className="flex-1 flex items-center justify-center relative h-[calc(100vh-80px)]">
          <img
            src={images[activeImageIndex].url}
            alt={images[activeImageIndex].alt}
            className="max-w-[90vw] max-h-[80vh] object-contain"
          />
          <button
            onClick={() => setActiveImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  // gallery 
  return (
    <div className="w-full">
      {/* Mobile: Main image */}
      <div className="block md:hidden">
        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-2 cursor-pointer relative" onClick={() => { setActiveImageIndex(0); setShowAllImages(true); }}>
        <img
  src={images[0]?.url}
  alt={images[0]?.alt}
  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
  onError={(e) => {
    e.target.style.display = 'none'; 
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
                  src={img.url}
                  alt={img.alt}
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
      <div className="hidden md:grid grid-cols-4 gap-2 h-full">
        {images.length === 1 ? (
          // Single image - full width
          <div 
            className="col-span-4 relative rounded-xl overflow-hidden cursor-pointer h-[500px]"
            onClick={() => { setActiveImageIndex(0); setShowAllImages(true); }}
          >
            <img
              src={images[0]?.url}
              alt={images[0]?.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          // Multiple images - grid layout
          <>
      {/* Main large image */}
      <div 
        className="col-span-2 row-span-2 relative rounded-l-xl overflow-hidden cursor-pointer"
        onClick={() => { setActiveImageIndex(0); setShowAllImages(true); }}
      >
        <img
          src={images[0]?.url}
          alt={images[0]?.alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Side images */}
      {images.slice(1, 5).map((img, idx) => (
        <div
          key={idx}
          className={`relative overflow-hidden cursor-pointer ${
            idx === 1 ? 'rounded-tr-xl' : idx === 3 ? 'rounded-br-xl' : ''
          }`}
          onClick={() => { setActiveImageIndex(idx + 1); setShowAllImages(true); }}
        >
          <img
            src={img.url}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
          {idx === 3 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center mb-16">
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
          </>
        )}
      </div>
    </div>
  );
};

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={onClick}
      >
        <h3 className="font-medium text-gray-900">{faq.question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    </div>
  );
};

const AttractionBooking = () => {
  const { attractionId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attraction, setAttraction] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(null);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const shareDropdownRef = useRef(null);

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

  useEffect(() => {
    const fetchAttractionData = async () => {
      setLoading(true);
      setError(null);

      try {
      
        const actualSlug = attractionId
          .replace('booking/', '')
          .split('/')
          .pop()
          .replace('-add-on-packages', '-and-add-on-packages');
        
        
        // API URL 
        // const apiUrl = `${API_URL}/api/attractions?filters[slug][$eq]=${actualSlug}&populate[languages][fields][0]=name&populate[languages][fields][1]=code&populate[timeSlots][fields][0]=name&populate[timeSlots][fields][1]=availableTimes&populate[gallery]=true&populate[image]=true&populate[attraction_faqs][fields][0]=question&populate[attraction_faqs][fields][1]=answer&additionalInfo=true&publicationState=live`;

        const apiUrl = `${API_URL}/api/attractions?filters[slug][$eq]=${actualSlug}&populate[languages][fields][0]=name&populate[languages][fields][1]=code&populate[timeSlots][fields][0]=name&populate[timeSlots][fields][1]=availableTimes&populate[gallery]=true&populate[image]=true&populate[attraction_faqs][fields][0]=question&populate[attraction_faqs][fields][1]=answer&additionalInfo=true&publicationState=live`;

        const response = await fetch(apiUrl, { headers: getHeaders() });

        if (!response.ok) {
          throw new Error(`Failed to fetch attraction data (Status: ${response.status})`);
        }

        let data = await response.json();
      
        if (!data.data || data.data.length === 0) {
          throw new Error('No attraction found with this slug');
        }
        
        const rawData = data.data[0];
        
        // Transform the data
        const transformedAttraction = {
          id: rawData.id,
          name: rawData.name,
          description: rawData.description,
          location: rawData.location,
          duration: rawData.duration,
          price: parseFloat(rawData.price) || 0,
          // Only use main price as fallback if specific price is undefined/null, not when it's 0
          adultPrice: rawData.adultPrice !== undefined && rawData.adultPrice !== null ? 
            parseFloat(rawData.adultPrice) : parseFloat(rawData.price) || 0,
          childPrice: rawData.childPrice !== undefined && rawData.childPrice !== null ? 
            parseFloat(rawData.childPrice) : parseFloat(rawData.price) || 0,
          seniorPrice: rawData.seniorPrice !== undefined && rawData.seniorPrice !== null ? 
            parseFloat(rawData.seniorPrice) : parseFloat(rawData.price) || 0,
          infantPrice: rawData.infantPrice !== undefined && rawData.infantPrice !== null ? 
            parseFloat(rawData.infantPrice) : 0,
          originalPrice: parseFloat(rawData.originalPrice) || null,
          rating: parseFloat(rawData.rating) || 0,
          reviews: parseInt(rawData.reviews) || 0,
          freeCancel: rawData.freeCancel || false,
          availability: rawData.availability || 'Available daily',
          included: Array.isArray(rawData.included) ? rawData.included : [],
          notIncluded: Array.isArray(rawData.notIncluded) ? rawData.notIncluded : [],
          gallery: rawData.gallery?.map(img => ({
            url: `${API_URL}${img.url}`,
            alt: img.alternativeText || ''
          })) || [],
          mainImage: rawData.image?.url ? 
            `${API_URL}${rawData.image.url}` : null,
          languages: (rawData.languages || []).map(lang => ({
            id: lang.id || 0,
            name: lang.name || '',
            code: lang.code || ''
          })),
          timeSlots: (rawData.timeSlots || []).flatMap(slot => {
            // From the console, we can see availableTimes is an array with times
            const availableTimes = slot.availableTimes || [];
            return availableTimes.map(time => ({
              id: `${slot.id}-${time}`,
              name: slot.name,
              time: time
            }));
          }),
          faqs: (rawData.attraction_faqs || []).map(faq => ({
            id: faq.id || 0,
            question: faq.question || '',
            answer: faq.answer || ''
          })),
          additionalInfo: Array.isArray(rawData.additionalInfo) ? rawData.additionalInfo : [],
          ticketType: rawData.ticketType || 'simple', 
          availableTicketTypes: rawData.availableTicketTypes || {} 
        };
        
        setAttraction(transformedAttraction);
      } catch (error) {
        console.error('Error fetching attraction data:', error);
        setError(error.message);
      }
      
      setLoading(false);
    };

    if (attractionId) {
      fetchAttractionData();
    }
  }, [attractionId]);

  const handleShare = (platform) => {
    const url = window.location.href;
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setShowCopyNotification(true);
          setTimeout(() => {
            setShowCopyNotification(false);
          }, 2000);
      }).catch(console.error);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        break;
    }
    setShowShareDropdown(false);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const [ticketCounts, setTicketCounts] = useState({
    adult: 0,
    child: 0,
    senior: 0,
    infant: 0
  });

  const ticketTypes = [
    { key: 'adult', label: 'Adult', priceKey: 'adultPrice' },
    { key: 'child', label: 'Child', priceKey: 'childPrice' },
    { key: 'senior', label: 'Senior', priceKey: 'seniorPrice' }
  ].filter(type => attraction?.availableTicketTypes?.[type.key] === true);

  // Only add infant if it's enabled in availableTicketTypes
  if (attraction?.availableTicketTypes?.infant === true) {
    ticketTypes.push({ key: 'infant', label: 'Infant', priceKey: 'infantPrice' });
  }

  const handleTicketChange = (type, delta) => {
    setTicketCounts(prev => ({
      ...prev,
      [type]: Math.max(0, (parseInt(prev[type]) || 0) + delta)
    }));
  };

  const handleAddToCart = () => {
    // Clear previous messages
    setValidationError('');
    setSuccessMessage('');
    setFieldErrors({});

    const errors = {};

    // Validation checks
    if (!selectedDate) {
      errors.date = 'Please select a visit date';
    }

    if (!selectedTime) {
      errors.time = 'Please select a time';
    }

    if (!selectedLanguage) {
      errors.language = 'Please select a language';
    }

    if (!attraction) {
      setValidationError('Attraction information not available');
      return;
    }

    // Check if detailed ticket type and no tickets selected
    if (attraction.ticketType === 'detailed') {
      const totalTickets = Object.values(ticketCounts).reduce((sum, count) => sum + count, 0);
      if (totalTickets === 0) {
        errors.tickets = 'Please select at least one ticket';
      }
    } else if (ticketQuantity <= 0) {
      errors.tickets = 'Please select ticket quantity';
    }

    // If there are any errors, set them and return
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const cartItem = {
      id: attraction.id,
      type: 'attraction',
      name: attraction.name,
      image: attraction.mainImage || attraction.image,
      location: attraction.location,
      selectedDate,
      selectedTime,
      selectedLanguage,
      quantity: attraction.ticketType === 'detailed' ? 1 : ticketQuantity,
      price: attraction.price,
      totalPrice: attraction.ticketType === 'detailed'
        ? calculateDetailedTotal()
        : attraction.price * ticketQuantity,
      ticketTypes: attraction.ticketType === 'detailed' ? ticketCounts : null,
      duration: attraction.duration
    };

    addToCart(cartItem);
    setSuccessMessage('Successfully added to cart! Redirecting to cart...');

    // Redirect to cart after a short delay
    setTimeout(() => {
      navigate('/cart');
    }, 1500);
  };

  const calculateDetailedTotal = () => {
    return ticketTypes.reduce((total, type) => {
      const count = ticketCounts[type.key] || 0;
      const price = attraction[type.priceKey] || 0;
      return total + (count * price);
    }, 0);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!attraction) return 0;
    return Object.entries(ticketCounts).reduce((sum, [type, count]) => {
      const ticketType = ticketTypes.find(t => t.key === type);
      if (!ticketType) return sum;
      const price = parseFloat(attraction[ticketType.priceKey]) || 0;
      return sum + (price * (parseInt(count) || 0));
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !attraction) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error || 'Failed to load attraction details'}</p>
            <button
              onClick={() => navigate('/attractions')}
              className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-2 rounded-lg font-medium"
            >
              Back to Attractions
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      
      
      {/* Header */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">{attraction.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{attraction.location}</span>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{attraction.rating}</span>
                  <span className="text-gray-500">({attraction.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative" ref={shareDropdownRef}>
              <button
                  onClick={() => setShowShareDropdown(!showShareDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4" />
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
                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  isSaved 
                    ? 'border-red-500 text-red-500 hover:bg-red-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div className="h-[400px] overflow-hidden">
            <ImageGallery images={attraction.gallery} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LeftDetails */}
          <div className="lg:w-2/3">
           
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="flex flex-col gap-2 mb-4">
                
                {attraction.freeCancel && (
                  <>
                    <div className="flex items-center gap-2 text-green-600">
                      <span>✓</span>
                      <span>Free Cancellation</span>
                    </div>
                    <div className="text-sm text-gray-600 ml-5">Up to 24 hours before the start time</div>
                  </>
                )}
                {attraction.duration && (
                <div className="flex items-center gap-2 text-gray-700">
                  <CalendarIcon className="w-4 h-4 text-gray-700" />
                    <span className="text-gray-700 font-bold">Duration: {attraction.duration}</span>
                </div>
                )}
              </div>
              <div className="prose max-w-none mt-4">
                <p className="text-gray-600" style={{ whiteSpace: 'pre-line' }}>{attraction.description}</p>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">What's included</h3>
                  <ul className="space-y-2">
                    {attraction.included.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {attraction.notIncluded && attraction.notIncluded.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mb-2">What's not included</h3>
                  <ul className="space-y-2">
                    {attraction.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-4">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {attraction.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            {attraction.additionalInfo && attraction.additionalInfo.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <h2 className="text-xl font-semibold mb-6">Additional Information</h2>
                <div className="space-y-4">
                  {attraction.additionalInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      {/* <div className="mt-0.5">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div> */}
                      <p className="text-gray-700 leading-relaxed">{info}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Booking */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Tickets and Prices</h2>
              
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  {attraction.originalPrice && (
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Regular price</span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{attraction.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    {attraction.originalPrice && (
                      <span className="text-sm text-gray-500">Special offer</span>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#0066ff]">
                        ₹{attraction.price.toLocaleString('en-IN')}
                      </span>
                      {attraction.originalPrice && (
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                          {Math.round((1 - attraction.price / attraction.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {/* {attraction.availability && (
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>Available:</span>
                      <span>{attraction.availability}</span>
                    </div>
                  </div>
                )} */}
              </div>

              {/* Language Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value);
                    setFieldErrors(prev => ({ ...prev, language: undefined }));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-700 focus:ring-0 outline-none"
                >
                  <option value="">Select a language</option>
                  {attraction.languages.map((lang, index) => (
                    <option key={index} value={lang.code}>
                      {lang.name} - Tour guide
                    </option>
                  ))}
                </select>
                {fieldErrors.language && (
                  <div className="mt-1 text-red-600 text-sm">
                    {fieldErrors.language}
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setFieldErrors(prev => ({ ...prev, date: undefined }));
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-gray-700 focus:ring-0 outline-none"
                  />
                </div>
                {fieldErrors.date && (
                  <div className="mt-1 text-red-600 text-sm">
                    {fieldErrors.date}
                  </div>
                )}
              </div>

              {/* Time */}
              {attraction.timeSlots && attraction.timeSlots.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => {
                    setSelectedTime(e.target.value);
                    setFieldErrors(prev => ({ ...prev, time: undefined }));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-700 focus:ring-0 outline-none"
                >
                  <option value="">Select a time</option>
                  {attraction.timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.time}>
                      {slot.time}
                    </option>
                  ))}
                </select>
                {fieldErrors.time && (
                  <div className="mt-1 text-red-600 text-sm">
                    {fieldErrors.time}
                  </div>
                )}
              </div>
              )}

              {/* Ticket Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {attraction.ticketType === 'detailed' ? 'Select Tickets' : 'Number of Tickets'}
                </label>
                {attraction.ticketType === 'detailed' ? (
                  <div className="space-y-2">
                    {ticketTypes.map(type => (
                      <div key={type.key} className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-900">
                            {type.label}
                          </div>
                          <div className="text-sm text-gray-500">
                            {attraction[type.priceKey] > 0 ? `₹${attraction[type.priceKey].toLocaleString('en-IN')}` : 'Free'}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleTicketChange(type.key, -1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{ticketCounts[type.key]}</span>
                          <button
                            type="button"
                            onClick={() => handleTicketChange(type.key, 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-base text-gray-600">Total</div>
                        <div className="text-xl font-bold text-gray-900">
                          ₹{calculateTotalPrice().toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        Includes taxes and charges
                      </div>
                    </div>
                  </div>
                ) : (
                <div className="flex items-center gap-4">
                  <div className="flex-1 border border-gray-300 rounded-lg">
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setTicketQuantity(prev => Math.max(1, prev - 1))}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-l-lg border-r border-gray-300"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-2">{ticketQuantity}</span>
                      <button
                        type="button"
                        onClick={() => setTicketQuantity(prev => Math.min(10, prev + 1))}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-r-lg border-l border-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                      <div className="text-sm text-gray-700">Total</div>
                    <div className="text-lg font-semibold">
                        ₹{((attraction?.price || 0) * ticketQuantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                )}
                {fieldErrors.tickets && (
                  <div className="mt-1 text-red-600 text-sm">
                    {fieldErrors.tickets}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">

                <button
                 onClick={handleAddToCart}
                  className="w-full bg-[#003B95] hover:bg-[#002D70] text-white py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Reserve Now
                </button>



                {/* Success Message */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
                    {successMessage}
                  </div>
                )}

                {/* Error Message */}
                {validationError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                    {validationError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        {attraction.faqs && attraction.faqs.length > 0 && (
          <div className="container mx-auto mb-16">
            <div className="bg-white border rounded-xl shadow-sm">
              <div className="px-8 pt-8 pb-2">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h2>
                <p className="text-gray-700 text-base mb-4">Find answers to common questions about this attraction.</p>
              </div>
              <div className="divide-y divide-gray-200">
                {attraction.faqs.map((faq, index) => (
                  <div key={index} className="px-8">
                    <FAQItem 
                      faq={faq} 
                      isOpen={openFaqId === index}
                      onClick={() => setOpenFaqId(openFaqId === index ? null : index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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

export default AttractionBooking; 