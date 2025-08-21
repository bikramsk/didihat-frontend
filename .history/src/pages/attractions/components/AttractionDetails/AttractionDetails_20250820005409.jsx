import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Sliders, MapPin, Calendar, Star, ChevronDown } from 'lucide-react';
import Filters from '../Filters/Filters';
import styles from './AttractionDetails.module.css';

const API_URL = import.meta.env.MODE === "production"
  ? "https://admin.didihat.com"
  : "http://localhost:1350";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const getHeaders = () => ({
  'Authorization': `Bearer ${API_TOKEN}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

const sortOptions = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-low', label: 'Price (Low to High)' },
  { id: 'price-high', label: 'Price (High to Low)' },
  { id: 'rating', label: 'Rating' }
];

const AttractionDetails = () => {
  const { attractionId } = useParams();
  const navigate = useNavigate();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({
    popularFilters: [],
    language: null,
    timeSlot: null,
    rating: null
  });
  
  const [searchParams, setSearchParams] = useState({
    destination: '',
    date: '',
    guests: 2
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchParams.destination) {
      const slug = searchParams.destination
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      navigate(`/attraction/${slug}`); 
    }
  };

  const handleSeeAvailability = (attraction) => {
    const slug = attraction.attributes?.slug || 
      (attraction.name || attraction.attributes?.name || '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    navigate(`/attraction/booking/${slug}`);
  };

  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttractionData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!attractionId) {
          throw new Error('Invalid URL');
        }

        // First try to find attractions by location
        const locationResponse = await fetch(
          `${API_URL}/api/attractions?filters[location][$eq]=${attractionId.toLowerCase()}&populate[image][populate]=*&populate[languages][populate]=*&populate[timeSlots][populate]=*&populate[popularFilters][populate]=*`,
          { headers: getHeaders() }
        );

        const locationData = await locationResponse.json();
        
        if (locationResponse.ok && locationData.data && locationData.data.length > 0) {
          // Transform all attractions data
          const transformedAttractions = locationData.data.map(rawData => {
            const attributes = rawData.attributes || {};
            return {
              id: rawData.id,
              attributes: rawData.attributes,
              name: rawData.name || attributes.name,
              description: rawData.description || attributes.description,
              location: rawData.location || attributes.location,
              duration: rawData.duration || attributes.duration,
              price: parseInt(rawData.price || attributes.price),
              originalPrice: parseInt(rawData.originalPrice || attributes.originalPrice),
              rating: parseFloat(rawData.rating || attributes.rating),
              reviews: parseInt(rawData.reviews || attributes.reviews),
              freeCancel: rawData.freeCancel || attributes.freeCancel,
              availability: rawData.availability || attributes.availability,
              languages: rawData.languages || [],
              timeSlots: rawData.timeSlots || [],
              skipLine: rawData.popularFilters?.some(filter => filter.code === 'skip_line') || false,
              image: attributes.image?.data?.attributes?.url ? 
                `${API_URL}${attributes.image.data.attributes.url}` : 
                rawData.image?.url ? `${API_URL}${rawData.image.url}` : null,
            };
          });
             
          setAttractions(transformedAttractions);
          setError(null);
        } else {
          // If not found by location, try by slug
          const response = await fetch(
            `${API_URL}/api/attractions?filters[slug][$eq]=${attractionId}&populate[image][populate]=*&populate[languages][populate]=*&populate[timeSlots][populate]=*&populate[popularFilters][populate]=*`,
            { headers: getHeaders() }
          );

          const data = await response.json();
          
          if (response.ok && data.data && data.data.length > 0) {
            const rawData = data.data[0];
            const transformedAttraction = {
              id: rawData.id,
              attributes: {
                ...rawData.attributes,
                slug: rawData.attributes.name?.toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '')
              },
              name: rawData.attributes.name,
              description: rawData.attributes.description,
              location: rawData.attributes.location,
              duration: rawData.attributes.duration,
              price: parseInt(rawData.attributes.price),
              originalPrice: parseInt(rawData.attributes.originalPrice),
              rating: parseFloat(rawData.attributes.rating),
              reviews: parseInt(rawData.attributes.reviews),
              freeCancel: rawData.attributes.freeCancel,
              availability: rawData.attributes.availability,
              languages: rawData.attributes.languages?.data || [],
              timeSlots: rawData.attributes.timeSlots?.data || [],
              skipLine: rawData.attributes.skipLine || false,
              image: rawData.attributes.image?.data?.attributes?.url ? 
                `${API_URL}${rawData.attributes.image.data.attributes.url}` : null
            };
            setAttractions([transformedAttraction]);
            setError(null);
          } else {
            // Only set error if both searches fail
            throw new Error('No attractions found');
          }
        }
      } catch (error) {
        console.error('Error fetching attraction data:', error);
        setError(error.message);
        setAttractions([]);
      }
      setLoading(false);
    };

    if (attractionId) {
      fetchAttractionData();
    }
  }, [attractionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && attractions.length === 0) {
    return (
      <div className={styles.destinationDetails}>
        {/* Hero Section */}
        <section className="bg-gray-900 pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <form onSubmit={handleSearch} className="relative">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="destination"
                          type="text"
                          value={searchParams.destination}
                          onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                          placeholder="Where are you going?"
                          className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="date"
                          type="date"
                          value={searchParams.date}
                          onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                          className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full md:w-auto bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-3.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066ff] whitespace-nowrap"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Error Content */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Attractions Found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find any attractions matching your search. Try a different location or browse all attractions.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/attractions')}
                  className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Browse All Attractions
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
 
  const getFilteredAttractions = () => {
    let filtered = attractions.filter(attraction => {
      // Filter by language
      if (filters.language) {
        const hasLanguage = attraction.languages.some(lang => 
          lang.code === filters.language || 
          lang.name.toLowerCase() === filters.language.toLowerCase()
        );
        if (!hasLanguage) {
          return false;
        }
      }

      // Filter by rating
      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        if (attraction.rating < minRating) {
          return false;
        }
      }

      // Filter by popular filters
      if (filters.popularFilters.length > 0) {
        if (filters.popularFilters.includes('free-cancel') && !attraction.freeCancel) {
          return false;
        }
        if (filters.popularFilters.includes('skip-line') && !attraction.skipLine) {
          return false;
        }
      }

      // Filter by time slot
      if (filters.timeSlot) {
        const hasTimeSlot = attraction.timeSlots.some(
          slot =>
            slot.name &&
            slot.name.toLowerCase().includes(filters.timeSlot.toLowerCase())
        );
        if (!hasTimeSlot) return false;
      }

      return true;
    });

    // Sort the filtered attractions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  return (
    <div className={styles.destinationDetails}>
      {/* Hero Section */}
      <section className="bg-gray-900 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex flex-col md:flex-row gap-4">
                  
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="destination"
                        type="text"
                        value={searchParams.destination}
                        onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                        placeholder="Where are you going?"
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                 
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="date"
                        type="date"
                        value={searchParams.date}
                        onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-3.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066ff] whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-4">
                {/* Toggle */}
                <button 
                  className="lg:hidden flex items-center gap-2 w-full px-4 py-2 bg-gray-50 rounded-lg mb-4"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                  <Sliders className="w-5 h-5" />
                  <span>Filters</span>
                </button>

                <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
                  <Filters 
                    filters={filters} 
                    setFilters={setFilters} 
                    attractions={attractions}
                    onClose={() => setIsFiltersOpen(false)} 
                  />
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                    Attractions in {attractionId}
                  </h1>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    <span>Sort by: {sortOptions.find(opt => opt.id === sortBy)?.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      {sortOptions.map(option => (
                        <button
                          key={option.id}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                            sortBy === option.id ? 'bg-gray-100' : ''
                          }`}
                          onClick={() => {
                            setSortBy(option.id);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid gap-8">
                {getFilteredAttractions().map(attraction => (
                  <div key={attraction.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Image */}
                      <div className="md:w-1/4">
                        <img
                          src={attraction?.image || "/images/hero-bg.webp"}
                          alt={attraction?.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/hero-bg.webp";
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 p-4 flex flex-col ">
                        
                        <div className="flex-grow">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">{attraction.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 mt-4">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{attraction.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              {attraction.rating > 0 && (
                                <>
                                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                  <span className="font-medium">{attraction.rating}</span>
                                  {attraction.reviews > 0 && (
                                    <span className="text-gray-500">({attraction.reviews})</span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{attraction.description}</p>

                          <div className="flex flex-col gap-1 text-sm">
                            {attraction.duration && attraction.duration.trim() !== '' && (
                              <span className="text-gray-700">⏱ Duration: {attraction.duration}</span>
                            )}
                            {attraction.freeCancel && (
                              <div className="flex items-center gap-1 text-green-600">
                                <span>✓</span>
                                <span>Free Cancellation</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* availability */}
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <div>
                            {attraction.availability && (
                              <div className="text-xs text-gray-600">Available: {attraction.availability}</div>
                            )}
                          </div>
                          <div className="text-right">
                            {Number(attraction.originalPrice) > 0 && (
                              <div className="text-sm text-gray-500 line-through">
                                ₹{Number(attraction.originalPrice).toLocaleString('en-IN')}
                              </div>
                            )}
                            {Number(attraction.price) > 0 && (
                              <div className="text-xl font-bold text-gray-900 mb-1">
                                <span className="text-sm font-normal text-gray-500 mr-1">from</span>
                                ₹{Number(attraction.price).toLocaleString('en-IN')}
                              </div>
                            )}
                            <button 
                              onClick={() => handleSeeAvailability(attraction)}
                              className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2 text-sm rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                            >
                              See availability
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetails; 