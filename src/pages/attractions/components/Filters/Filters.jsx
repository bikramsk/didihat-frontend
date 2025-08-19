import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp, X } from 'lucide-react';
import styles from './Filters.module.css';

const popularFilters = [
  { id: 'skip-line', label: 'Skip the line' },
  { id: 'free-cancel', label: 'Free cancellation' },

];

const languages = [
  { id: 'spanish', label: 'Spanish', code: 'es' },
  { id: 'hindi', label: 'Hindi', code: 'hi' },
  { id: 'english', label: 'English', code: 'en' },
  { id: 'french', label: 'French', code: 'fr' },
  { id: 'german', label: 'German', code: 'de' },
  { id: 'arabic', label: 'Arabic', code: 'ar' }
];

const timeSlots = [
  { id: 'morning', label: 'Morning (before 12:00)' },
  { id: 'afternoon', label: 'Afternoon (12:00 - 17:00)' },
  { id: 'evening', label: 'Evening (after 17:00)' }
];

const ratings = [
  { id: '4.5', label: '4.5 & up' },
  { id: '4', label: '4 & up' },
  { id: '3.5', label: '3.5 & up' },
  { id: '3', label: '3 & up' },
  
];

const INITIAL_SHOW_COUNT = 5;

const Filters = ({ filters, setFilters, onClose, attractions }) => {
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  // Calculate counts for each filter
  const getFilterCounts = () => {
    const counts = {
      'skip-line': 0,
      'free-cancel': 0,
      languages: {},
      timeSlots: {
        morning: 0,
        afternoon: 0,
        evening: 0
      },
      ratings: {
        '4.5': 0,
        '4': 0,
        '3.5': 0,
        '3': 0
      }
    };

    attractions?.forEach(attraction => {
      // Popular filters counts
      if (attraction.skipLine) counts['skip-line']++;
      if (attraction.freeCancel) counts['free-cancel']++;

      // Language counts
      attraction.languages?.forEach(lang => {
        if (lang.code) {
          counts.languages[lang.code] = (counts.languages[lang.code] || 0) + 1;
        }
      });

      // Time slots counts
      attraction.timeSlots?.forEach(slot => {
        if (slot.name?.toLowerCase().includes('morning')) counts.timeSlots.morning++;
        if (slot.name?.toLowerCase().includes('afternoon')) counts.timeSlots.afternoon++;
        if (slot.name?.toLowerCase().includes('evening')) counts.timeSlots.evening++;
      });

      // Rating counts
      const rating = parseFloat(attraction.rating);
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
    // If already selected, unselect it
    if (filters.language === langId) {
      setFilters({ ...filters, language: null });
    } else {
      // Find the language object
      const selectedLang = languages.find(lang => lang.id === langId);
      setFilters({ ...filters, language: selectedLang?.code });
    }
  };

  const handleTimeSlotChange = (timeId) => {
    setFilters({ ...filters, timeSlot: timeId });
  };

  const handleRatingChange = (ratingId) => {
    setFilters({ ...filters, rating: ratingId });
  };

  const handleClearAll = () => {
    setFilters({
      popularFilters: [],
      language: null,
      timeSlot: null,
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
                  name="rating"
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

      {/* Time Slots */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Time of day</h3>
        <div className={styles.filterList}>
          {timeSlots.map(slot => (
            <label key={slot.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  name="timeSlot"
                  checked={filters.timeSlot === slot.id}
                  onChange={() => handleTimeSlotChange(slot.id)}
                />
                <div className={styles.checkboxLabel}>
                  <span>{slot.label}</span>
                </div>
              </div>
              <span className={styles.count}>{counts.timeSlots[slot.id]}</span>
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
                  name="language"
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