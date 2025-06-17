import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Plus, Minus } from 'lucide-react';
import styles from './SearchBar.module.css';
import { useStaysContext } from '../../context/StaysContext';

const SearchBar = () => {
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isDatesOpen, setIsDatesOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [dates, setDates] = useState({
    checkIn: '',
    checkOut: ''
  });
  const dropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const datesDropdownRef = useRef(null);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    rooms: 1
  });

  const { fetchStays, setFilters } = useStaysContext();

  const trendingDestinations = [
    { name: 'Ramnagar' },
    { name: 'Mumbai' },
    { name: 'Kolhapur' },
    { name: 'Pune' },
    { name: 'New Delhi' }
  ];

  // Add click outside handler for all dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsGuestsOpen(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
      if (datesDropdownRef.current && !datesDropdownRef.current.contains(event.target)) {
        setIsDatesOpen(false);
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

  const handleDateChange = (type, value) => {
    setDates(prev => {
      const newDates = { ...prev, [type]: value };
      
      
      if (type === 'checkIn' && prev.checkOut && new Date(value) > new Date(prev.checkOut)) {
        newDates.checkOut = '';
      }
      
     
      if (type === 'checkOut' && prev.checkIn && new Date(value) < new Date(prev.checkIn)) {
        newDates.checkIn = '';
      }
      
      return newDates;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Update filters with the search parameters
    setFilters(prev => ({
      ...prev,
      location: searchValue,
      dates: dates,
      guests: guests
    }));

    // Navigate to stays page if we're not already there
    const currentPath = window.location.pathname;
    if (!currentPath.startsWith('/stays') || currentPath.split('/').length > 2) {
      
      window.open(`/stays?location=${encodeURIComponent(searchValue)}`, '_blank');
    } else {
      
      fetchStays();
    }

    // Close all dropdowns
    setIsLocationOpen(false);
    setIsDatesOpen(false);
    setIsGuestsOpen(false);
  };

  // Filter destinations based on search input
  const getFilteredDestinations = () => {
    if (!searchValue) return trendingDestinations;

    const searchTerms = searchValue.toLowerCase().split(/[\s,]+/);
    return trendingDestinations.filter(destination => {
      const destinationLower = destination.name.toLowerCase();
      return searchTerms.some(term => destinationLower.includes(term));
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.searchBarWrapper}>
      <form onSubmit={handleSearch} className={styles.searchBar}>
        {/* Location Input */}
        <div className={styles.inputGroup} ref={locationDropdownRef}>
          <MapPin className="w-5 h-5 text-gray-400" />
          <div className={styles.inputContent}>
            <label htmlFor="location" className="block text-sm text-gray-600">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Where are you going?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsLocationOpen(true)}
              className={styles.input}
            />
          </div>
          {/* Location Dropdown */}
          {isLocationOpen && (
            <div className={styles.dropdown}>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Trending Destinations</h3>
                <div className="space-y-2">
                  {getFilteredDestinations().map((destination) => (
                    <button
                      key={destination.name}
                      type="button"
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                      onClick={() => handleLocationClick(destination.name)}
                    >
                      {destination.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Date Inputs */}
        <div className={styles.inputGroup} ref={datesDropdownRef}>
          <Calendar className="w-5 h-5 text-gray-400" />
          <div className={styles.inputContent}>
            <label htmlFor="dates" className="block text-sm text-gray-600">
              Check in - Check out
            </label>
            <button
              type="button"
              onClick={() => setIsDatesOpen(!isDatesOpen)}
              className={styles.input}
            >
              {dates.checkIn || dates.checkOut ? 
                `${dates.checkIn || 'Add date'} → ${dates.checkOut || 'Add date'}` : 
                'Add dates'
              }
            </button>
          </div>
          {/* Dates Dropdown */}
          {isDatesOpen && (
            <div className={`${styles.dropdown} ${styles.datesDropdown}`}>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Check in</label>
                    <input
                      type="date"
                      min={today}
                      value={dates.checkIn}
                      onChange={(e) => handleDateChange('checkIn', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Check out</label>
                    <input
                      type="date"
                      min={dates.checkIn || today}
                      value={dates.checkOut}
                      onChange={(e) => handleDateChange('checkOut', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Guests Input */}
        <div className={styles.inputGroup} ref={dropdownRef}>
          <Users className="w-5 h-5 text-gray-400" />
          <div className={styles.inputContent}>
            <label htmlFor="guests" className="block text-sm text-gray-600">
              Guests
            </label>
            <button
              type="button"
              onClick={() => setIsGuestsOpen(!isGuestsOpen)}
              className={styles.input}
            >
              {`${guests.adults} Adult${guests.adults > 1 ? 's' : ''}, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}, ${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}`}
            </button>
          </div>
          {/* Guests Dropdown */}
          {isGuestsOpen && (
            <div className={styles.dropdown}>
              <div className="p-4 space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">Adults</p>
                    <p className="text-sm text-gray-500">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleGuestChange('adults', 'decrement')}
                      className="p-1 rounded-full border border-gray-300 hover:border-gray-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{guests.adults}</span>
                    <button
                      type="button"
                      onClick={() => handleGuestChange('adults', 'increment')}
                      className="p-1 rounded-full border border-gray-300 hover:border-gray-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">Children</p>
                    <p className="text-sm text-gray-500">Ages 0-12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleGuestChange('children', 'decrement')}
                      className="p-1 rounded-full border border-gray-300 hover:border-gray-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{guests.children}</span>
                    <button
                      type="button"
                      onClick={() => handleGuestChange('children', 'increment')}
                      className="p-1 rounded-full border border-gray-300 hover:border-gray-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Rooms */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">Rooms</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleGuestChange('rooms', 'decrement')}
                      className="p-1 rounded-full border border-gray-300 hover:border-gray-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{guests.rooms}</span>
                    <button
                      type="button"
                      onClick={() => handleGuestChange('rooms', 'increment')}
                      className="p-1 rounded-full border border-gray-300 hover:border-gray-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className={styles.searchButton}>
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar; 