import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './stays.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import Filters from './components/Filters/Filters';
import StaysList from './components/StaysList/StaysList';
import { StaysProvider, useStaysContext } from './context/StaysContext';
import { Sliders } from 'lucide-react';

const StaysPageContent = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setFilters, fetchStays } = useStaysContext();

  // Update the useEffect to handle clearing filters when no params

  useEffect(() => {
    const locationParam = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');
    
    // Clear filters first - increased price range to accommodate all stays
    const defaultFilters = {
      location: '',
      dates: null,
      guests: 1,
      priceRange: [0, 100000], // Increased to match StaysContext
      popularFilters: [],
      amenities: [],
      propertyTypes: [],
      propertyRating: [],
      mealOptions: [],
      roomFacilities: [],
      activities: []
    };

    // If no search params, just set default filters
    if (!locationParam && !propertyType) {
      setFilters(defaultFilters);
      return;
    }

    // Apply filters based on URL params
    setFilters({
      ...defaultFilters,
      ...(locationParam && { location: decodeURIComponent(locationParam) }),
      ...(propertyType && { 
        propertyTypes: [decodeURIComponent(propertyType).toLowerCase()]
      })
    });
  }, [location.search, setFilters]);

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className={styles.staysPage}>
      <section className={`${styles.heroSection} bg-gray-900 pt-32 pb-16`}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Find your perfect stay
          </h1>
          <SearchBar />
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className={styles.staysContent}>
          <button 
            className={`${styles.filterToggle} md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 mb-4`}
            onClick={toggleFilters}
          >
            <Sliders className="w-5 h-5" />
            <span>Filters</span>
          </button>

          <aside className={`${styles.filtersSidebar} ${isFiltersOpen ? styles.active : ''}`}>
            <Filters onClose={() => setIsFiltersOpen(false)} />
          </aside>
          
          <section className={styles.staysListSection}>
            <StaysList />
          </section>
        </div>
      </main>
    </div>
  );
};

const StaysPage = () => {
  return (
    <StaysProvider>
      <StaysPageContent />
    </StaysProvider>
  );
};

export default StaysPage;