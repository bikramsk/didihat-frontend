import React, { useState, useRef, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Star, Filter, ChevronDown } from 'lucide-react';

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

const sortOptions = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'price-low', label: 'Price (Low to High)' },
    { id: 'price-high', label: 'Price (High to Low)' },
    { id: 'rating', label: 'Rating' }
  ];

const CarRentalDetailsPage = () => {
    const { city } = useParams();
  const navigate = useNavigate();
  const locationHook = useLocation();

  const [location, setLocation] = useState(city ? city.replace(/-/g, ' ') : '');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    popularFilters: [], 
    carType: [], 
    transmission: [], 
    rating: null 
  });

  const popularFilters = [
    { name: 'Free Cancellation', count: '' },
    { name: 'AC', count: '' },
    { name: 'Music System', count: '' },
    { name: 'Power Windows', count: '' },
  ];


  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/api/car-rentals?populate=image`;
        if (city && city !== "all") {
          url += `&filters[location][$containsi]=${encodeURIComponent(city)}`;
        }
        const response = await fetch(url, { headers: getHeaders() });
        const data = await response.json();
        console.log('Raw data:', data.data);
        if (response.ok && data.data) {
          const mapped = data.data.map(item => {
            return {
              id: item.id,
              name: item.name || 'No name',
              image: item.image?.url ? `${API_URL}${item.image.url}` : '/images/car-rentals/default.webp',
              price: Number(item.price) || 0,
              originalPrice: Number(item.originalPrice) || 0,
              location: item.location || 'No location',
              description: item.description || 'No description',
              features: Array.isArray(item.features) ? item.features : [],
              rating: Number(item.rating) || 0,
              reviews: Number(item.reviews) || 0,
              freeKms: item.freeKms || '',
              extraKmRate: item.extraKmRate || '',
              freeCancellation: item.freeCancellation || false,
              available: item.available || '',
              slug: item.slug || '',
              carType: item.carType || '',
              transmission: item.transmission || '',
            };
          });
          console.log('Mapped cars:', mapped);
          setCars(mapped);
        } else {
          setCars([]);
        }
      } catch {
        setCars([]);
      }
      setLoading(false);
    };
    fetchCars();
  }, [city]);

  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const carTypeParam = params.get('carType');
    if (carTypeParam) {
      setFilters(prev => ({ ...prev, carType: [carTypeParam] }));
    }
  }, [locationHook.search]);

  // Filtering and sorting
  const getFilteredCars = () => {
    let filtered = cars.filter(car => {
    
      if (filters.popularFilters.length > 0) {
        if (filters.popularFilters.includes('Free Cancellation') && !car.freeCancellation) return false;
        if (filters.popularFilters.includes('AC') && !(car.features || []).includes('AC')) return false;
        if (filters.popularFilters.includes('Music System') && !(car.features || []).includes('Music System')) return false;
        if (filters.popularFilters.includes('Power Windows') && !(car.features || []).includes('Power Windows')) return false;
      }
   
      if (filters.carType.length > 0 && !filters.carType.includes(car.carType)) return false;
    
      if (filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) return false;
     
      if (filters.rating && car.rating < parseFloat(filters.rating)) return false;
      return true;
    });

    // Sorting
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

  // Calculate filter counts
  const getFilterCounts = (cars) => {
    const counts = {
      'Free Cancellation': 0,
      'AC': 0,
      'Music System': 0,
      'Power Windows': 0,
      carType: { Hatchback: 0, Sedan: 0, SUV: 0, Luxury: 0, MUV: 0 },
      transmission: { Manual: 0, Automatic: 0 },
      rating: { '4.5': 0, '4': 0, '3.5': 0, '3': 0 }
    };
    cars.forEach(car => {
      if (car.freeCancellation) counts['Free Cancellation']++;
      if ((car.features || []).includes('AC')) counts['AC']++;
      if ((car.features || []).includes('Music System')) counts['Music System']++;
      if ((car.features || []).includes('Power Windows')) counts['Power Windows']++;
      if (car.carType) counts.carType[car.carType] = (counts.carType[car.carType] || 0) + 1;
      if (car.transmission) counts.transmission[car.transmission] = (counts.transmission[car.transmission] || 0) + 1;
      if (car.rating >= 4.5) counts.rating['4.5']++;
      else if (car.rating >= 4) counts.rating['4']++;
      else if (car.rating >= 3.5) counts.rating['3.5']++;
      else if (car.rating >= 3) counts.rating['3']++;
    });
    return counts;
  };
  const filterCounts = getFilterCounts(cars);


  const handlePopularFilterChange = (filterName) => {
    setFilters(prev => {
      const exists = prev.popularFilters.includes(filterName);
      return {
        ...prev,
        popularFilters: exists
          ? prev.popularFilters.filter(f => f !== filterName)
          : [...prev.popularFilters, filterName]
      };
    });
  };
  const handleCarTypeChange = (type) => {
    setFilters(prev => {
      const exists = prev.carType.includes(type);
      return {
        ...prev,
        carType: exists
          ? prev.carType.filter(t => t !== type)
          : [...prev.carType, type]
      };
    });
  };
  const handleTransmissionChange = (trans) => {
    setFilters(prev => {
      const exists = prev.transmission.includes(trans);
      return {
        ...prev,
        transmission: exists
          ? prev.transmission.filter(t => t !== trans)
          : [...prev.transmission, trans]
      };
    });
  };
  const handleRatingChange = (rating) => {
    setFilters(prev => ({ ...prev, rating }));
  };
  const handleClearAll = () => {
    setFilters({ popularFilters: [], carType: [], transmission: [], rating: null });
  };

    // Close dropdown when click outside
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

  // Search handler for the search bar
  const handleSearch = (e) => {
    e.preventDefault();
    const loc = location.trim();
    if (loc) {
      const urlLocation = loc.toLowerCase().replace(/ /g, '-');
      let url = `/car-rentals/${urlLocation}`;
      const params = [];
      if (pickupDate) params.push(`pickupDate=${pickupDate}`);
      if (returnDate) params.push(`returnDate=${returnDate}`);
      if (params.length > 0) url += `?${params.join('&')}`;
      navigate(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="relative">
                <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSearch}>
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-blue-600 transition-colors">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Where do you want to go?"
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-gray-500 font-semibold">to</div>
                  
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  Sidebar  */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
      
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                <button className="text-sm text-[#0066ff] hover:underline" onClick={handleClearAll}>Clear all</button>
              </div>

              {/* Popular Filters */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Popular filters</h4>
                <div className="space-y-2">
                  {popularFilters.map((filter, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-[#0066ff] border-gray-300 rounded focus:ring-[#0066ff]" checked={filters.popularFilters.includes(filter.name)} onChange={() => handlePopularFilterChange(filter.name)} />
                        <span className="ml-2 text-sm text-gray-700">{filter.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{filterCounts[filter.name]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="my-4 border-t border-gray-200" />

              {/* Car Type */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Car Type</h4>
                <div className="space-y-2">
                  {['Hatchback', 'Sedan', 'SUV', 'Luxury', 'MUV'].map((type, idx) => (
                    <label key={idx} className="flex items-center cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[#0066ff] border-gray-300 rounded focus:ring-[#0066ff]" checked={filters.carType.includes(type)} onChange={() => handleCarTypeChange(type)} />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                      <span className="text-xs text-gray-500 ml-auto">{filterCounts.carType[type]}</span>
                    </label>
                  ))}
                </div>
              </div>
              <hr className="my-4 border-t border-gray-200" />

              {/* Transmission */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Transmission</h4>
                <div className="space-y-2">
                  {['Manual', 'Automatic'].map((trans, idx) => (
                    <label key={idx} className="flex items-center cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-[#0066ff] border-gray-300 rounded focus:ring-[#0066ff]" checked={filters.transmission.includes(trans)} onChange={() => handleTransmissionChange(trans)} />
                      <span className="ml-2 text-sm text-gray-700">{trans}</span>
                      <span className="text-xs text-gray-500 ml-auto">{filterCounts.transmission[trans]}</span>
                    </label>
                  ))}
                </div>
              </div>
              <hr className="my-4 border-t border-gray-200" />

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                <div className="space-y-2">
                  {[
                    { rating: '4.5', label: '4.5 & up' },
                    { rating: '4', label: '4 & up' },
                    { rating: '3.5', label: '3.5 & up' },
                    { rating: '3', label: '3 & up' }
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <input type="radio" name="rating-filter" className="w-4 h-4 text-[#0066ff] border-gray-300 rounded focus:ring-[#0066ff]" checked={filters.rating === item.rating} onChange={() => handleRatingChange(item.rating)} />
                        <div className="ml-2 flex items-center gap-1">
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{filterCounts.rating[item.rating]}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                    Car Rentals in {city && city.replace(/-/g, ' ')}
                  </h1>
                  <p className="text-gray-600">
  {loading ? 'Loading...' : `${getFilteredCars().length} cars available`}
</p>
                  {/* <p className="text-gray-600">{loading ? 'Loading...' : `${cars.length} cars available`}</p> */}
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
              <div className="grid gap-4">
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading car rentals...</div>
                ) : getFilteredCars().length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No car rentals found.</div>
                ) : (
                  getFilteredCars().map(car => (
                  <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                   <div className="flex flex-col md:flex-row md:h-80">
                      {/* Image */}
                      <div className="w-full md:w-72 h-80 relative">
                                <img
                                      src={car.image || '/images/car-rentals/default.webp'}
                                      alt={car.name || 'Car'}
                                    className="w-full h-full object-cover rounded-l-lg"
                                />
                                </div>
                      <div className="flex-1 p-4 flex flex-col h-full justify-between">
                        <div className="flex-grow">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{car.name || 'No name'}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 mt-2">
                                <MapPin className="w-3.5 h-3.5" />
                                  <span>{car.location || 'No location'}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              {car.rating > 0 && (
                                <>
                                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                  <span className="font-medium">{car.rating}</span>
                                  {car.reviews > 0 && (
                                    <span className="text-gray-500">({car.reviews})</span>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{car.description || 'No description'}</p>
                          <ul className="flex flex-wrap gap-2 mb-2">
                              {car.features && car.features.map((feature, idx) => (
                              <li key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{feature}</li>
                            ))}
                          </ul>
                          <div className="flex flex-col gap-1 text-sm">
                            {car.freeKms && (
                              <span className="text-gray-700">Free KMs: {car.freeKms}</span>
                            )}
                            {car.extraKmRate && (
                              <span className="text-gray-700">Extra KM: {car.extraKmRate}</span>
                            )}
                            {car.freeCancellation && (
                              <div className="flex items-center gap-1 text-green-600">
                                <span>✓</span>
                                <span>Free Cancellation</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* availability */}
                        <div className="mt-auto  flex items-center justify-between">
                          <div>
                            {car.available && (
                              <div className="text-xs text-gray-600">Available: {car.available}</div>
                            )}
                          </div>
                          <div className="text-right">
                            {Number(car.originalPrice) > 0 && (
                              <div className="text-sm text-gray-500 line-through">
                                ₹{Number(car.originalPrice).toLocaleString('en-IN')}
                              </div>
                            )}
                            {Number(car.price) > 0 && (
                              <div className="text-xl font-bold text-gray-900 ">
                                <span className="text-sm font-normal text-gray-500 mr-1">from</span>
                                ₹{Number(car.price).toLocaleString('en-IN')}
                              </div>
                            )}
                            <button 
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                              onClick={() => navigate(`/car-rentals/booking/${car.slug}`)}
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default CarRentalDetailsPage;