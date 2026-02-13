import React, { useState } from 'react';
import { ChevronDown, Star, MapPin, LayoutGrid, List } from 'lucide-react';
import { useStaysContext } from '../../context/StaysContext';
import { Link } from 'react-router-dom';
import styles from './StaysList.module.css';

// const API_URL = import.meta.env.MODE === "production"
//   ? "https://admin.didihat.com"
//   : "http://localhost:1350";

//   const API_URL = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;



const sortOptions = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'price-low', label: 'Price (Low to High)' },
  { id: 'price-high', label: 'Price (High to Low)' },
  { id: 'rating', label: 'Rating' }
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const StaysList = () => {
  const { 
    stays, 
    loading, 
    error, 
    sortBy, 
    setSortBy, 
    fetchStays, 
    pagination,
    filters,
    filteredCount,
    hasActiveFilters,
    setFilters
  } = useStaysContext();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const handleLoadMore = () => {
    fetchStays(true);
  };

 
  const getPropertyTypeName = () => {
    if (filters.propertyTypes.length > 0) {
      const type = filters.propertyTypes[0];
      return type.charAt(0).toUpperCase() + type.slice(1);
    }
    return null;
  };

  const propertyTypeName = getPropertyTypeName();

 
  if (loading && !stays.length) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p className="text-xl font-semibold mb-2">Error loading stays</p>
        <p>{error}</p>
      </div>
    );
  }

 
  if (!loading && (!stays || stays.length === 0)) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {propertyTypeName 
              ? `No ${propertyTypeName.toLowerCase()} found`
              : 'No stays found'
            }
          </h3>
          <p className="text-gray-600 mb-6">
            {hasActiveFilters 
              ? 'Try adjusting your filters or search criteria to find more options.'
              : 'We could not find any stays matching your search. Please try again later.'
            }
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setFilters({
                  location: '',
                  dates: null,
                  guests: 1,
                  priceRange: [0, 100000], 
                  popularFilters: [],
                  amenities: [],
                  propertyTypes: [],
                  propertyRating: [],
                  mealOptions: [],
                  roomFacilities: [],
                  activities: []
                });
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.staysListContainer}>
     
      <div className={styles.header}>
        <h2 className={styles.resultCount}>
          {propertyTypeName 
            ? `${filteredCount} ${propertyTypeName} found`
            : `${filteredCount} stays found`
          }
        </h2>
        <div className={styles.headerControls}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
          <div className={styles.sortContainer}>
            <button 
              className={styles.sortButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Sort by: {sortOptions.find(opt => opt.id === sortBy)?.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isDropdownOpen && (
              <div className={styles.sortDropdown}>
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.sortOption} ${sortBy === option.id ? styles.selected : ''}`}
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
      </div>

      {/* Stays Grid/List */}
      <div className={`${styles.staysContainer} ${styles[viewMode]}`}>
        {stays.map(stay => (
          <a 
            href={`/stays/${stay.slug}`} 
            key={stay.id} 
            className={styles.stayCardLink}
            onClick={(e) => {
              
              window.location.href = `/stays/${stay.slug}`;
              e.preventDefault();
            }}
          >
            <div className={styles.stayCard}>
              <div className={styles.imageContainer}>
                <img 
                  src={stay.image} 
                  alt={stay.name} 
                  className={styles.stayImage}
                />
                <button 
                  className={styles.wishlistButton}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>
              
              <div className={styles.content}>
                <div className={styles.mainContent}>
                  <div className={styles.typeAndRating}>
                    <span className={styles.type}>{stay.type}</span>
                    <div className={styles.rating}>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{stay.rating}</span>
                      <span className={styles.reviews}>({stay.reviews})</span>
                    </div>
                  </div>

                  <h3 className={styles.name}>{stay.name}</h3>
                  
                  <div className={styles.location}>
                    <MapPin className="w-4 h-4" />
                    <span>{stay.location}</span>
                  </div>

                  {stay.description && (
                    <p className={styles.description}>
                      {stay.description}
                    </p>
                  )}
                </div>

                <div className={styles.priceContainer}>
                  <span className={styles.price}>{formatPrice(stay.price)}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Load More Button */}
      {pagination.hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className={`${styles.loadMoreButton} ${loading ? styles.loading : ''}`}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StaysList;