import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp, X } from 'lucide-react';
import styles from './Filters.module.css';

const popularFilters = [
  { id: 'free-cancel', label: 'Free cancellation' },
  { id: 'private-tour', label: 'Private tour' },
];

const languages = [
  { id: 'hindi', label: 'Hindi', code: 'hi' },
  { id: 'english', label: 'English', code: 'en' },
  { id: 'spanish', label: 'Spanish', code: 'es' },
  { id: 'french', label: 'French', code: 'fr' },
  { id: 'german', label: 'German', code: 'de' },
  { id: 'arabic', label: 'Arabic', code: 'ar' }
];

const tourTypes = [
  { id: 'adventure', label: 'Adventure Tours' },
  { id: 'cultural', label: 'Cultural Tours' },
  { id: 'pilgrimage', label: 'Pilgrimage Tours' },
  { id: 'wildlife', label: 'Wildlife Tours' }
];

const ratings = [
  { id: '4.5', label: '4.5 & up' },
  { id: '4', label: '4 & up' },
  { id: '3.5', label: '3.5 & up' },
  { id: '3', label: '3 & up' }
];

const INITIAL_SHOW_COUNT = 5;

const Filters = ({ filters, setFilters, onClose, packages }) => {
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  // Calculate counts for each filter
  const getFilterCounts = () => {
    const counts = {
      'free-cancel': 0,
      'private-tour': 0,
      languages: {},
      tourTypes: {
        adventure: 0,
        cultural: 0,
        pilgrimage: 0,
        wildlife: 0
      },
      durations: {
        '1-3': 0,
        '4-7': 0,
        '8-14': 0,
        '15+': 0
      },
      ratings: {
        '4.5': 0,
        '4': 0,
        '3.5': 0,
        '3': 0
      }
    };

    packages?.forEach(pkg => {
      // Popular filters counts
      if (pkg.freeCancel) counts['free-cancel']++;
      if (pkg.privateTour) counts['private-tour']++;

      // Language counts
      pkg.languages?.forEach(lang => {
        if (lang.code) {
          counts.languages[lang.code] = (counts.languages[lang.code] || 0) + 1;
        }
      });

      // Tour type counts
      if (pkg.type) {
        counts.tourTypes[pkg.type] = (counts.tourTypes[pkg.type] || 0) + 1;
      }

      // Duration counts
      const days = parseInt(pkg.duration);
      if (days <= 3) counts.durations['1-3']++;
      else if (days <= 7) counts.durations['4-7']++;
      else if (days <= 14) counts.durations['8-14']++;
      else counts.durations['15+']++;

      // Rating counts
      const rating = parseFloat(pkg.rating);
      if (rating >= 4.5) counts.ratings['4.5']++;
      else if (rating >= 4) counts.ratings['4']++;
      else if (rating >= 3.5) counts.ratings['3.5']++;
      else if (rating >= 3) counts.ratings['3']++;
    });

    return counts;
  };

  const counts = getFilterCounts();

  const handlePopularFilterChange = (filterId) => {
    const newFilters = filters.popularFilters.includes(filterId)
      ? filters.popularFilters.filter(id => id !== filterId)
      : [...filters.popularFilters, filterId];
    setFilters({ ...filters, popularFilters: newFilters });
  };

  const handleLanguageChange = (langId) => {
    if (filters.language === langId) {
      setFilters({ ...filters, language: null });
    } else {
      const selectedLang = languages.find(lang => lang.id === langId);
      setFilters({ ...filters, language: selectedLang?.code });
    }
  };

  const handleTourTypeChange = (typeId) => {
    setFilters({ ...filters, tourType: typeId === filters.tourType ? null : typeId });
  };

  const handleRatingChange = (ratingId) => {
    setFilters({ ...filters, rating: ratingId === filters.rating ? null : ratingId });
  };

  const handleClearAll = () => {
    setFilters({
      popularFilters: [],
      language: null,
      tourType: null,
      duration: null,
      rating: null
    });
  };

  const visibleLanguages = showAllLanguages ? languages : languages.slice(0, INITIAL_SHOW_COUNT);

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Sliders className="w-5 h-5" />
          <h2>Filters</h2>
        </div>
        <div className={styles.headerControls}>
          <button 
            className={styles.clearButton}
            onClick={handleClearAll}
          >
            Clear all
          </button>
          <button 
            className={styles.mobileCloseButton}
            onClick={onClose}
            aria-label="Close filters"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Popular Filters */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Popular filters</h3>
        <div className={styles.filterList}>
          {popularFilters.map(filter => (
            <label key={filter.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.popularFilters.includes(filter.id)}
                  onChange={() => handlePopularFilterChange(filter.id)}
                />
                <div className={styles.checkboxLabel}>
                  <span>{filter.label}</span>
                </div>
              </div>
              <span className={styles.count}>{counts[filter.id]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Rating</h3>
        <div className={styles.filterList}>
          {ratings.map(rating => (
            <label key={rating.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.rating === rating.id}
                  onChange={() => handleRatingChange(rating.id)}
                />
                <div className={styles.checkboxLabel}>
                  <span>{rating.label}</span>
                </div>
              </div>
              <span className={styles.count}>{counts.ratings[rating.id]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tour Types */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Tour type</h3>
        <div className={styles.filterList}>
          {tourTypes.map(type => (
            <label key={type.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.tourType === type.id}
                  onChange={() => handleTourTypeChange(type.id)}
                />
                <div className={styles.checkboxLabel}>
                  <span>{type.label}</span>
                </div>
              </div>
              <span className={styles.count}>{counts.tourTypes[type.id]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Languages</h3>
        <div className={styles.filterList}>
          {visibleLanguages.map(lang => (
            <label key={lang.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.language === lang.code}
                  onChange={() => handleLanguageChange(lang.id)}
                />
                <div className={styles.checkboxLabel}>
                  <span>{lang.label}</span>
                </div>
              </div>
              <span className={styles.count}>{counts.languages[lang.code] || 0}</span>
            </label>
          ))}
          {languages.length > INITIAL_SHOW_COUNT && (
            <button
              className={styles.toggleButton}
              onClick={() => setShowAllLanguages(!showAllLanguages)}
            >
              {showAllLanguages ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show more</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters; 