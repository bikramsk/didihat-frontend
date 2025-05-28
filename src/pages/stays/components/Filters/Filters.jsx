import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useStaysContext } from '../../context/StaysContext';
import styles from './Filters.module.css';

const popularFilters = [
  { id: '5-stars', label: '5 stars' },
  { id: 'no-credit-card', label: 'Book without credit card' },
   { id: 'no-prepayment', label: 'No prepayment' },
  { id: 'private-pool', label: 'Private pool' },
  { id: 'swimming-pool', label: 'Swimming Pool' },
  { id: 'hotels', label: 'Hotels' }
];

// const amenities = [
//   { id: 'parking', label: 'Parking' },
//   { id: 'Room service', label: 'Room service' },
//   { id: '24-hour front desk', label: '24-hour front desk' },
//   { id: 'Family rooms', label: 'Family rooms' },
//   { id: 'Free WiFi', label: 'Free WiFi' },
//   { id: 'TV', label: 'TV' },
//   { id: 'Doctor on Call', label: 'Doctor on Call' },
//   { id: 'Non-smoking rooms', label: 'Non-smoking rooms' },
//   { id: 'Restaurant', label: 'Restaurant' },
//   { id: 'Pets allowed', label: 'Pets allowed' },
//   { id: 'Airport shuttle', label: 'Airport shuttle' },
//   { id: 'Swimming Pool', label: 'Swimming Pool' },
//   { id: 'Wheelchair accessible', label: 'Wheelchair accessible' },
//   { id: 'Spa and wellness centre', label: 'Spa and wellness centre' },
//   { id: 'Fitness centre', label: 'Fitness centre' },
//   { id: 'Hot tub/Jacuzzi', label: 'Hot tub/Jacuzzi' },
//   { id: 'Electric vehicle charging station', label: 'Electric vehicle charging station' }
// ];

const amenities = [
  { id: 'parking', label: 'Parking' },
  { id: 'room service', label: 'Room service' },
  { id: '24-hour front desk', label: '24-hour front desk' },
  { id: 'family rooms', label: 'Family rooms' },
  { id: 'wifi', label: 'Free WiFi' },
  { id: 'non-smoking rooms', label: 'Non-smoking rooms' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'pets', label: 'Pets allowed' },
  { id: 'airport-shuttle', label: 'Airport shuttle' },
  { id: 'swimming-pool', label: 'Swimming Pool' },
  { id: 'air conditioning', label: 'Air conditioning' },
  { id: 'wheelchair', label: 'Wheelchair accessible' },
  { id: 'spa', label: 'Spa and wellness centre' },
  { id: 'fitness', label: 'Fitness centre' },
  { id: 'hot-tub', label: 'Hot tub/Jacuzzi' },
  { id: 'ev-charging', label: 'Electric vehicle charging station' }
];

const propertyTypes = [
  { id: 'hotels', label: 'Hotels' },
  { id: 'entire-homes', label: 'Entire homes & apartments' },
  { id: 'homestays', label: 'Homestays' },
  { id: 'resorts', label: 'Resorts' },
  { id: 'apartments', label: 'Apartments' },
  { id: 'hostels', label: 'Hostels' },
  { id: 'villas', label: 'Villas' },
  { id: 'guest-houses', label: 'Guest houses' },
  { id: 'bed-and-breakfasts', label: 'Bed and breakfasts' },
  { id: 'rest-house', label: 'Rest House' },
  { id: 'holiday-homes', label: 'Holiday homes' },
  { id: 'lodges', label: 'Lodges' },
  { id: 'campsites', label: 'Campsites' },
  { id: 'farm-stays', label: 'Farm stays' },
  { id: 'country-houses', label: 'Country houses' },
  { id: 'motels', label: 'Motels' },
  { id: 'chalets', label: 'Chalets' },
  { id: 'holiday-parks', label: 'Holiday parks' },
  { id: 'capsule-hotels', label: 'Capsule hotels' }
];

const propertyRatings = [
  { id: '5-star', label: '5 stars' },
  { id: '4-star', label: '4 stars' },
  { id: '3-star', label: '3 stars' },
  { id: '2-star', label: '2 stars' },
  { id: '1-star', label: '1 star' }
];

// const mealOptions = [
//   { id: 'Self catering', label: 'Self catering' },
//   { id: 'Breakfast included', label: 'Breakfast included' },
//   { id: 'All meals included', label: 'All meals included' },
//   { id: 'All-inclusive', label: 'All-inclusive' },
//   { id: 'Breakfast & lunch included', label: 'Breakfast & lunch included' },
//   { id: 'Breakfast & dinner included', label: 'Breakfast & dinner included' }
// ];

const mealOptions = [
  { id: 'self-catering', label: 'Self catering' },
  { id: 'breakfast-included', label: 'Breakfast included' },
  { id: 'all-meals', label: 'All meals included' },
  { id: 'all-inclusive', label: 'All-inclusive' },
  { id: 'breakfast-lunch', label: 'Breakfast & lunch included' },
  { id: 'breakfast-dinner', label: 'Breakfast & dinner included' }
];

// const roomFacilities = [
//   { id: 'Private bathroom', label: 'Private bathroom' },
//   { id: 'View', label: 'View' },
//   { id: 'Air conditioning', label: 'Air conditioning' },
//   { id: 'Balcony', label: 'Balcony' },
//   { id: 'Terrace', label: 'Terrace' },
//   { id: 'Kitchen/kitchenette', label: 'Kitchen/kitchenette' },
//   { id: 'Laundry', label: 'Laundry' },
//   { id: 'Lake view', label: 'Lake view' },
//   { id: 'Privacy curtain', label: 'Privacy curtain' },
//   { id: 'Reading light', label: 'Reading light' },
//   { id: 'Hot tub', label: 'Hot tub' },
//   { id: 'Private pool', label: 'Private pool' },
//   { id: 'Plunge pool', label: 'Plunge pool' },
//   { id: 'Infinity pool', label: 'Infinity pool' },
//   { id: 'Computer', label: 'Computer' },
//   { id: 'Sea view', label: 'Sea view' },
//   { id: 'Pool cover', label: 'Pool cover' },
//   { id: 'Video games', label: 'Video games' },
//   { id: 'Sauna', label: 'Sauna' },
//   { id: 'Rooftop pool', label: 'Rooftop pool' },
//   { id: 'Game console', label: 'Game console' },
//   { id: 'Salt water pool', label: 'Salt water pool' },
//   { id: 'Fan', label: 'Fan' },
//   { id: 'Complimentary evening snacks', label: 'Complimentary evening snacks' }
// ];

const roomFacilities = [
  { id: 'private-bathroom', label: 'Private bathroom' },
  { id: 'view', label: 'View' },
  // { id: 'air-conditioning', label: 'Air conditioning' },
  { id: 'air conditioning', label: 'Air conditioning' },
  { id: 'balcony', label: 'Balcony' },
  { id: 'terrace', label: 'Terrace' },
  { id: 'kitchen', label: 'Kitchen/kitchenette' },
  { id: 'washing-machine', label: 'Washing machine' },
  { id: 'lake-view', label: 'Lake view' },
  { id: 'privacy-curtain', label: 'Privacy curtain' },
  { id: 'reading-light', label: 'Reading light' },
  { id: 'hot-tub', label: 'Hot tub' },
  { id: 'private-pool', label: 'Private pool' },
  { id: 'plunge-pool', label: 'Plunge pool' },
  { id: 'infinity-pool', label: 'Infinity pool' },
  { id: 'computer', label: 'Computer' },
  { id: 'sea-view', label: 'Sea view' },
  { id: 'pool-cover', label: 'Pool cover' },
  { id: 'video-games', label: 'Video games' },
  { id: 'sauna', label: 'Sauna' },
  { id: 'rooftop-pool', label: 'Rooftop pool' },
  { id: 'game-console', label: 'Game console' },
  { id: 'salt-water-pool', label: 'Salt water pool' },
  { id: 'fan', label: 'Fan' },
  { id: 'evening-snacks', label: 'Complimentary evening snacks' }
];

const funActivities = [
  { id: 'Paragliding', label: 'Paragliding' },
  { id: 'River Repelling', label: 'River Repelling' },
  { id: 'Trekking', label: 'Trekking' },
  { id: 'Hiking', label: 'Hiking' },
  { id: 'Bike on Rent', label: 'Bike on Rent' },
  { id: 'Table Tennis', label: 'Table Tennis' },
  { id: 'Snow Skiing', label: 'Snow Skiing' },
  { id: 'Billiards', label: 'Billiards' },
  { id: 'Snooker', label: 'Snooker' },
  { id: 'Massage', label: 'Massage' }
];

const INITIAL_SHOW_COUNT = 5;

const Filters = ({ onClose }) => {
  const { filters, setFilters, staysCounts } = useStaysContext();
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllRoomFacilities, setShowAllRoomFacilities] = useState(false);
  // const [showAllPropertyTypes, setShowAllPropertyTypes] = useState(false);

  const handlePopularFilterChange = (filterId) => {
    const newFilters = filters.popularFilters.includes(filterId)
      ? filters.popularFilters.filter(id => id !== filterId)
      : [...filters.popularFilters, filterId];
    setFilters({ ...filters, popularFilters: newFilters });
  };

  const handleAmenityChange = (amenityId) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    setFilters({ ...filters, amenities: newAmenities });
  };

  const handlePropertyTypeChange = (typeId) => {
    const newTypes = filters.propertyTypes.includes(typeId)
      ? filters.propertyTypes.filter(id => id !== typeId)
      : [...filters.propertyTypes, typeId];
    setFilters({ ...filters, propertyTypes: newTypes });
  };

  const handleRatingChange = (ratingId) => {
    const newRatings = filters.propertyRating.includes(ratingId)
      ? filters.propertyRating.filter(id => id !== ratingId)
      : [...filters.propertyRating, ratingId];
    setFilters({ ...filters, propertyRating: newRatings });
  };

  const handleMealOptionChange = (mealId) => {
    const newMeals = filters.mealOptions.includes(mealId)
      ? filters.mealOptions.filter(id => id !== mealId)
      : [...filters.mealOptions, mealId];
    setFilters({ ...filters, mealOptions: newMeals });
  };

  const handleRoomFacilityChange = (facilityId) => {
    const newFacilities = filters.roomFacilities.includes(facilityId)
      ? filters.roomFacilities.filter(id => id !== facilityId)
      : [...filters.roomFacilities, facilityId];
    setFilters({ ...filters, roomFacilities: newFacilities });
  };

  const handleActivityChange = (activityId) => {
    const newActivities = filters.activities?.includes(activityId)
      ? filters.activities.filter(id => id !== activityId)
      : [...(filters.activities || []), activityId];
    setFilters({ ...filters, activities: newActivities });
  };

  const handlePriceChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    const newPriceRange = [...filters.priceRange];
    newPriceRange[type === 'min' ? 0 : 1] = numValue;
    setFilters({ ...filters, priceRange: newPriceRange });
  };

  const handleClearAll = () => {
    setFilters({
      ...filters,
      popularFilters: [],
      amenities: [],
      propertyTypes: [],
      propertyRating: [],
      mealOptions: [],
      roomFacilities: [],
      activities: [],
      priceRange: [0, 10000]
    });
  };

  const visibleAmenities = showAllAmenities ? amenities : amenities.slice(0, INITIAL_SHOW_COUNT);
  const visibleRoomFacilities = showAllRoomFacilities ? roomFacilities : roomFacilities.slice(0, INITIAL_SHOW_COUNT);
  // const visiblePropertyTypes = showAllPropertyTypes ? propertyTypes : propertyTypes.slice(0, INITIAL_SHOW_COUNT);

  
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

      {/* Price Range */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Price Range</h3>
        <div className={styles.priceFilter}>
          <div className={styles.priceInputs}>
            <div className={styles.priceInputGroup}>
              <label>Min Price</label>
              <div className={styles.priceInputWrapper}>
                <span>₹</span>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className={styles.priceInput}
                />
              </div>
            </div>
            <div className={styles.priceInputDivider}>-</div>
            <div className={styles.priceInputGroup}>
              <label>Max Price</label>
              <div className={styles.priceInputWrapper}>
                <span>₹</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className={styles.priceInput}
                />
              </div>
            </div>
          </div>
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
                  {filter.subtext && <span className={styles.subtext}>{filter.subtext}</span>}
                </div>
              </div>
              {staysCounts[filter.id] && (
                <span className={styles.count}>{staysCounts[filter.id]}</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Amenities</h3>
        <div className={styles.filterList}>
          {visibleAmenities.map(amenity => (
            <label key={amenity.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity.id)}
                  onChange={() => handleAmenityChange(amenity.id)}
                />
                <span className={styles.checkboxLabel}>{amenity.label}</span>
              </div>
              {staysCounts[amenity.id] && (
                <span className={styles.count}>{staysCounts[amenity.id]}</span>
              )}
            </label>
          ))}
          {amenities.length > INITIAL_SHOW_COUNT && (
            <button
              className={styles.toggleButton}
              onClick={() => setShowAllAmenities(!showAllAmenities)}
            >
              {showAllAmenities ? (
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

      {/* Meals Options */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Meals options</h3>
        <div className={styles.filterList}>
          {mealOptions.map(meal => (
            <label key={meal.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.mealOptions.includes(meal.id)}
                  onChange={() => handleMealOptionChange(meal.id)}
                />
                <span className={styles.checkboxLabel}>{meal.label}</span>
              </div>
              {staysCounts[meal.id] && (
                <span className={styles.count}>{staysCounts[meal.id]}</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Property type</h3>
        <div className={styles.filterList}>
          {propertyTypes.map(type => (
            <label key={type.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.propertyTypes.includes(type.id)}
                  onChange={() => handlePropertyTypeChange(type.id)}
                />
                <span className={styles.checkboxLabel}>{type.label}</span>
              </div>
              {staysCounts[type.id] && (
                <span className={styles.count}>{staysCounts[type.id]}</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Room Facilities */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Room facilities</h3>
        <div className={styles.filterList}>
          {visibleRoomFacilities.map(facility => (
            <label key={facility.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.roomFacilities.includes(facility.id)}
                  onChange={() => handleRoomFacilityChange(facility.id)}
                />
                <span className={styles.checkboxLabel}>{facility.label}</span>
              </div>
              {staysCounts[facility.id] && (
                <span className={styles.count}>{staysCounts[facility.id]}</span>
              )}
            </label>
          ))}
          {roomFacilities.length > INITIAL_SHOW_COUNT && (
            <button 
              className={styles.toggleButton}
              onClick={() => setShowAllRoomFacilities(!showAllRoomFacilities)}
            >
              {showAllRoomFacilities ? (
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

      {/* Property Rating */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Property rating</h3>
        <div className={styles.filterList}>
          {propertyRatings.map(rating => (
            <label key={rating.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.propertyRating.includes(rating.id)}
                  onChange={() => handleRatingChange(rating.id)}
                />
                <span className={styles.checkboxLabel}>{rating.label}</span>
              </div>
              {staysCounts[rating.id] && (
                <span className={styles.count}>{staysCounts[rating.id]}</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Fun things to do section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Fun things to do</h3>
        <div className={styles.filterList}>
          {funActivities.map(activity => (
            <label key={activity.id} className={styles.filterItem}>
              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={filters.activities?.includes(activity.id)}
                  onChange={() => handleActivityChange(activity.id)}
                />
                <span className={styles.checkboxLabel}>{activity.label}</span>
              </div>
              {staysCounts[activity.id] && (
                <span className={styles.count}>{staysCounts[activity.id]}</span>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters; 