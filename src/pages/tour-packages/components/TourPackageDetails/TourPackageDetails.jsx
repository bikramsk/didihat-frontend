import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Star, ChevronDown, Sliders, Check } from 'lucide-react';
import Filters from '../Filters/Filters';

const sortOptions = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-low', label: 'Price (Low to High)' },
  { id: 'price-high', label: 'Price (High to Low)' },
  { id: 'rating', label: 'Rating' }
];

const API_URL = import.meta.env.MODE === "production"
  ? "https://admin.didihat.com"
  : "http://localhost:1350";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const getHeaders = () => ({
  'Authorization': `Bearer ${API_TOKEN}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

const TourPackageDetails = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packages, setPackages] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [filters, setFilters] = useState({
    popularFilters: [],
    language: null,
    tourType: null,
    duration: null,
    rating: null
  });
  const [searchParams, setSearchParams] = useState({
    destination: '',
    date: '',
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchParams.destination) {
      navigate(`/tour-packages/${searchParams.destination.toLowerCase()}`);
    }
  };

 
  useEffect(() => {
    const fetchTourPackages = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!locationId) {
          throw new Error('Invalid URL');
        }

        // First try to find tour packages by location or name (case-insensitive and partial match)
        const searchUrl = `${API_URL}/api/tour-packages?filters[$or][0][location][$containsi]=${locationId}&filters[$or][1][name][$containsi]=${locationId}&populate=*`;
        const response = await fetch(searchUrl, { headers: getHeaders() });
        const data = await response.json();
        if (response.ok && data.data && data.data.length > 0) {
          const transformedPackages = data.data.map(pkg => ({
            id: pkg.id,
            name: pkg.name,
            description: pkg.description,
            location: pkg.location,
            duration: pkg.duration,
            price: parseInt(pkg.price || 0),
            originalPrice: parseInt(pkg.originalPrice || 0),
            rating: parseFloat(pkg.rating || 0),
            reviews: parseInt(pkg.reviews || 0),
            freeCancel: pkg.freeCancel || false,
            privateTour: pkg.privateTour || false,
            availability: pkg.availability,
            type: pkg.type,
            languages: pkg.languages || [],
            image: pkg.image?.url ? `${API_URL}${pkg.image.url}` : '/images/tour-packages/test.webp'
          }));
          setPackages(transformedPackages);
          setError(null);
        } else {
          throw new Error('No tour packages found');
        }
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        setError(error.message);
        setPackages([]);
      }

      setLoading(false);
    };

    if (locationId) {
      fetchTourPackages();
    }
  }, [locationId]);

  const getFilteredPackages = () => {
    let filtered = packages.filter(pkg => {

      if (filters.popularFilters.length > 0) {
        if (filters.popularFilters.includes('free-cancel') && !pkg.freeCancel) return false;
        if (filters.popularFilters.includes('private-tour') && !pkg.privateTour) return false;
      }

   
      if (filters.language) {
        const hasLanguage = pkg.languages.some(lang => lang.code === filters.language);
        if (!hasLanguage) return false;
      }

   
      if (filters.tourType && pkg.type !== filters.tourType) return false;

     
      if (filters.duration) {
        const duration = pkg.duration.toLowerCase();
        const hours = duration.includes('hour') ? 
          parseFloat(duration) : 
          duration.includes('day') ? parseFloat(duration) * 24 : 0;

        switch(filters.duration) {
          case 'under-2':
            if (hours >= 2) return false;
            break;
          case '2-4':
            if (hours < 2 || hours > 4) return false;
            break;
          case '4-6':
            if (hours < 4 || hours > 6) return false;
            break;
          case '6-8':
            if (hours < 6 || hours > 8) return false;
            break;
          case '8-12':
            if (hours < 8 || hours > 12) return false;
            break;
          case 'full-day':
            if (hours < 12 || hours > 24) return false;
            break;
          case '1-3':
            if (hours < 24 || hours > 72) return false;
            break;
          case '4-7':
            if (hours < 96 || hours > 168) return false;
            break;
          case '8-14':
            if (hours < 192 || hours > 336) return false;
            break;
          case '15+':
            if (hours < 360) return false;
            break;
        }
      }

   
      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        if (pkg.rating < minRating) return false;
      }

      return true;
    });

    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                          type="text"
                          value={searchParams.destination}
                          onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                          placeholder="Where do you want to go?"
                          className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={searchParams.date}
                          onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                          className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full md:w-auto bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-3.5 rounded-lg font-medium transition-colors duration-200"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tour Packages Found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find any tour packages for this location. Try a different location or browse all packages.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/tour-packages')}
                  className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Browse All Packages
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

  const filteredPackages = getFilteredPackages();

  return (
    <div className="min-h-screen bg-gray-50">
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
                        type="text"
                        value={searchParams.destination}
                        onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                        placeholder="Where do you want to go?"
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={searchParams.date}
                        onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-3.5 rounded-lg font-medium transition-colors duration-200"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Package Listings */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/*  Desktop */}
          <div className="hidden md:block w-64 bg-white rounded-lg shadow-sm border border-gray-100 self-start sticky top-24">
            <Filters
              filters={filters}
              setFilters={setFilters}
              packages={packages}
            />
          </div>

       
          <div className="flex-1">
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                  Tour Packages in {locationId}
                </h1>
                
              </div>

          
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-sm">Sort by: {sortOptions.find(opt => opt.id === sortBy)?.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                    {sortOptions.map(option => (
                      <button
                        key={option.id}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          sortBy === option.id ? 'text-[#0066ff] font-medium' : 'text-gray-700'
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

            {/* Mobile Filter Button */}
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 mb-4"
              onClick={() => setIsFiltersOpen(true)}
            >
              <Sliders className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {/* Package List */}
            <div className="space-y-4">
              {filteredPackages.map(pkg => (
                <div key={pkg.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                   
                    <div className="w-full md:w-72 h-72 relative">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 p-4">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {pkg.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4" />
                              <span>{pkg.location}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            {pkg.reviews > 0 && (
                              <div className="flex items-center gap-1 justify-end mb-1">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-medium">{pkg.rating}</span>
                                <span className="text-xs text-gray-500">({pkg.reviews})</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {pkg.description}
                        </p>

 
{pkg.duration && (
  <div className="flex items-center mb-2">
    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg shadow-sm">
      <Calendar className="w-4 h-4 text-gray-500" />
      <span className="text-sm text-gray-700 font-medium">
        Duration: <span className="font-semibold text-gray-800">{pkg.duration}</span>
      </span>
    </div>
  </div>
)}


                        {pkg.freeCancel && (
                          <div className="flex items-center gap-1 mb-2">
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600">Free Cancellation</span>
                          </div>
                        )}

                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <div>
                            {pkg.availability && (
                              <div className="text-xs text-gray-600">Available: {pkg.availability}</div>
                            )}
                          </div>
                          <div className="text-right">
                            {Number(pkg.originalPrice) > 0 && (
                              <div className="text-sm text-gray-500 line-through">
                                ₹{Number(pkg.originalPrice).toLocaleString('en-IN')}
                              </div>
                            )}
                            {Number(pkg.price) > 0 && (
                              <div className="text-xl font-bold text-gray-900 mb-1">
                                <span className="text-sm font-normal text-gray-500 mr-1">from</span>
                                ₹{Number(pkg.price).toLocaleString('en-IN')}
                              </div>
                            )}
                            <Link
                              to={`/tour-packages/booking/${pkg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                              className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2 text-sm rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                            >
                              See availability
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {isFiltersOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg">
              <Filters
                filters={filters}
                setFilters={setFilters}
                packages={packages}
                onClose={() => setIsFiltersOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourPackageDetails; 