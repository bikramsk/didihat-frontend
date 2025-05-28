import React, { useState } from 'react';
import styles from './stays.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import Filters from './components/Filters/Filters';
import StaysList from './components/StaysList/StaysList';
import { StaysProvider } from './context/StaysContext';
import { Sliders } from 'lucide-react';

const StaysPage = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <StaysProvider>
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
    </StaysProvider>
  );
};

export default StaysPage; 