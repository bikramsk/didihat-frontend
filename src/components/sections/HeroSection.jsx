import { Search, MapPin, Calendar, Users, Plus, Minus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const HeroSection = () => {
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    rooms: 1
  });

  const trendingDestinations = [
    { name: 'Almora', description: 'Cultural heritage & panoramic Himalayan views' },
    { name: 'Munsiyari', description: 'Gateway to Johar Valley & snow peaks' },
    { name: 'Pithoragarh', description: 'Mini Kashmir of Uttarakhand' },
    { name: 'Champawat', description: 'Historical temples & wildlife' },
    { name: 'Berinag', description: 'Tea gardens & mountain landscapes' }
  ];

  // Add click outside handler for both dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsGuestsOpen(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationClick = (destination) => {
    setSearchValue(destination);
    setIsLocationOpen(false);
  };

  const handleGuestChange = (type, operation) => {
    setGuests(prev => {
      const newValue = operation === 'increment' 
        ? prev[type] + 1 
        : Math.max(type === 'adults' || type === 'rooms' ? 1 : 0, prev[type] - 1);
      
      return {
        ...prev,
        [type]: newValue
      };
    });
  };

  const getGuestsText = () => {
    const parts = [];
    if (guests.adults) parts.push(`${guests.adults} Adult${guests.adults > 1 ? 's' : ''}`);
    if (guests.children) parts.push(`${guests.children} Child${guests.children > 1 ? 's' : ''}`);
    if (guests.rooms) parts.push(`${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/hero-bg.webp")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 md:pt-48 lg:pt-64 pb-20">
        <div className="text-center text-white max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Explore The Divine Beauty of Uttarakhand
          </h1>
          <p className="text-lg md:text-xl mb-8 md:mb-12">
            Journey through sacred lands—where adventure meets spirituality
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg p-4 md:p-6 max-w-6xl mx-auto shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Location */}
            <div className="relative" ref={locationDropdownRef}>
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsLocationOpen(true)}
                />

                {/* Location Suggestions Dropdown */}
                {isLocationOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <h3 className="text-xs font-semibold text-gray-900 mb-1">Trending Destinations</h3>
                      <div className="space-y-1">
                        {trendingDestinations.map((destination, index) => (
                          <button
                            key={index}
                            className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded-lg transition-colors group"
                            onClick={() => handleLocationClick(destination.name)}
                          >
                            <div className="flex items-start">
                              <MapPin size={14} className="text-gray-400 group-hover:text-[#84cc16] mt-0.5 flex-shrink-0" />
                              <div className="ml-1.5">
                                <p className="text-sm text-gray-900 font-medium group-hover:text-[#84cc16] leading-tight">{destination.name}</p>
                                <p className="text-xs text-gray-500 leading-tight">{destination.description}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Check In */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Check In</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                />
              </div>
            </div>

            {/* Check Out */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Check Out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-gray-700 text-sm font-medium mb-1.5">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <button
                  type="button"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84cc16] text-left bg-white"
                  onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                >
                  {getGuestsText()}
                </button>

                {/* Guests Dropdown Panel */}
                {isGuestsOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200 w-[280px] sm:w-[300px] lg:w-[280px] -left-0 lg:-left-20">
                    {/* Adults */}
                    <div className="flex items-center justify-between py-1">
                      <div>
                        <p className="text-sm font-medium">Adults</p>
                        <p className="text-xs text-gray-500">Ages 13 or above</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleGuestChange('adults', 'decrement')}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm">{guests.adults}</span>
                        <button 
                          onClick={() => handleGuestChange('adults', 'increment')}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between py-1 border-t">
                      <div>
                        <p className="text-sm font-medium">Children</p>
                        <p className="text-xs text-gray-500">Ages 0-12</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleGuestChange('children', 'decrement')}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm">{guests.children}</span>
                        <button 
                          onClick={() => handleGuestChange('children', 'increment')}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Rooms */}
                    <div className="flex items-center justify-between py-1 border-t">
                      <div>
                        <p className="text-sm font-medium">Rooms</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleGuestChange('rooms', 'decrement')}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm">{guests.rooms}</span>
                        <button 
                          onClick={() => handleGuestChange('rooms', 'increment')}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Done Button */}
                    <button
                      className="w-full mt-2 bg-[#84cc16] text-white py-1.5 rounded-lg hover:bg-[#65a30d] transition-colors text-sm"
                      onClick={() => setIsGuestsOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-4 md:mt-6 text-center">
            <button className="bg-[#84cc16] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-[#65a30d] transition-colors flex items-center justify-center mx-auto">
              <Search size={18} className="mr-2" />
              Search
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto text-center text-white">
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">500+</h3>
            <p className="text-sm md:text-base">Destinations</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">100+</h3>
            <p className="text-sm md:text-base">Hotels</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">10K+</h3>
            <p className="text-sm md:text-base">Tourists</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">2K+</h3>
            <p className="text-sm md:text-base">Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
