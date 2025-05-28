import React, { createContext, useContext, useState, useEffect } from 'react';


const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const StaysContext = createContext();

export const useStaysContext = () => {
  const context = useContext(StaysContext);
  if (!context) {
    throw new Error('useStaysContext must be used within a StaysProvider');
  }
  return context;
};

export const StaysProvider = ({ children }) => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 27,
    total: 0,
    hasMore: true
  });
  const [filters, setFilters] = useState({
    location: '',
    dates: null,
    guests: 1,
    priceRange: [0, 10000],
    popularFilters: [],
    amenities: [],
    propertyTypes: [],
    propertyRating: [],
    mealOptions: [],
    roomFacilities: [],
    activities: []
  });
  const [sortBy, setSortBy] = useState('recommended');

  const fetchStays = async (loadMore = false) => {
    try {
      setLoading(true);
      const page = loadMore ? pagination.page + 1 : 1;
      
      console.log('Fetching stays with URL:', `${STRAPI_URL}/api/stays?populate=*&pagination[page]=${page}&pagination[pageSize]=${pagination.pageSize}`);
      
      const response = await fetch(
        `${STRAPI_URL}/api/stays?populate=*&pagination[page]=${page}&pagination[pageSize]=${pagination.pageSize}`, 
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error?.message || 'Failed to fetch stays');
      }

      const data = await response.json();
      console.log('Raw API response:', data);
      
      if (!data.data || !Array.isArray(data.data)) {
        console.error('Invalid data structure:', data);
        throw new Error('Invalid data structure received from API');
      }

      const transformedStays = data.data.map(stay => {
        try {
          // Get the main image URL
          const imageUrl = stay.image?.url || null;

          // Transform the data
          const transformedStay = {
            id: stay.id,
            documentId: stay.documentId,
            slug: stay.slug,
            name: stay.name,
            location: stay.location,
            description: stay.description,
            rating: parseFloat(stay.rating) || 0,
            reviews: parseInt(stay.reviews) || 0,
            price: stay.price ? stay.price.toString() : '0',
            image: imageUrl ? `${STRAPI_URL}${imageUrl}` : null,
            type: stay.type || 'Hotels',
            propertyRating: parseInt(stay.propertyRating) || 0,
            amenities: stay.amenities || [],
            mealOptions: stay.meal_options || [],
            roomFacilities: stay.room_facilities || [],
            activities: stay.activities || []
          };

          return transformedStay;
        } catch (error) {
          console.error('Error processing stay:', error, stay);
          return null;
        }
      }).filter(Boolean);

      console.log('Transformed stays:', transformedStays);

      setPagination({
        page,
        pageSize: pagination.pageSize,
        total: data.meta?.pagination?.total || 0,
        hasMore: data.meta?.pagination?.page < (data.meta?.pagination?.pageCount || 0)
      });

      setStays(loadMore ? [...stays, ...transformedStays] : transformedStays);
      setError(null);
    } catch (error) {
      console.error('Error fetching stays:', error);
      setError(error.message || 'Failed to fetch stays');
    } finally {
      setLoading(false);
    }
  };

  // Function to apply filters and sorting
  const getFilteredAndSortedStays = () => {
    let filteredStays = [...stays];

    // Apply location filter
    if (filters.location) {
      filteredStays = filteredStays.filter(stay => 
        stay.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply price range filter
    filteredStays = filteredStays.filter(stay => {
      const price = parseInt(stay.price.replace(/[^\d]/g, ''));
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Apply property type filter
    if (filters.propertyTypes.length > 0) {
      filteredStays = filteredStays.filter(stay =>
        filters.propertyTypes.includes(stay.type.toLowerCase())
      );
    }

    // Apply property rating filter
    if (filters.propertyRating.length > 0) {
      filteredStays = filteredStays.filter(stay =>
        filters.propertyRating.includes(`${stay.propertyRating}-star`)
      );
    }

    // Apply meal options filter
    if (filters.mealOptions.length > 0) {
      filteredStays = filteredStays.filter(stay =>
        stay.mealOptions.some(meal => 
          filters.mealOptions.includes(meal.name.toLowerCase())
        )
      );
    }

    // Apply room facilities filter
    if (filters.roomFacilities.length > 0) {
      filteredStays = filteredStays.filter(stay =>
        stay.roomFacilities.some(facility => 
          filters.roomFacilities.includes(facility.name.toLowerCase())
        )
      );
    }

    // Apply activities filter
    if (filters.activities?.length > 0) {
      filteredStays = filteredStays.filter(stay =>
        stay.activities.some(activity => 
          activity && activity.name && filters.activities.includes(activity.name.toLowerCase())
        )
      );
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filteredStays = filteredStays.filter(stay =>
        stay.amenities.some(amenity => 
          amenity && amenity.name && filters.amenities.includes(amenity.name.toLowerCase())
        )
      );
    }

    // Apply popular filters
    if (filters.popularFilters.length > 0) {
      filteredStays = filteredStays.filter(stay => {
        return filters.popularFilters.every(filter => {
          switch (filter) {
            case '5-stars':
              return stay.propertyRating === 5;
            case 'breakfast':
              return stay.mealOptions.some(meal => 
                meal.name.toLowerCase().includes('breakfast')
              );
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filteredStays.sort((a, b) => 
          parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''))
        );
        break;
      case 'price-high':
        filteredStays.sort((a, b) => 
          parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''))
        );
        break;
      case 'rating':
        filteredStays.sort((a, b) => b.rating - a.rating);
        break;
      default:
       
        break;
    }

    return filteredStays;
  };

  // Calculate counts for each filter option
  const getStaysCounts = () => {
    const counts = {};
    stays.forEach(stay => {
      // Count property types
      if (stay.type) {
        const typeId = stay.type.toLowerCase();
        counts[typeId] = (counts[typeId] || 0) + 1;
      }

      // Count property ratings
      if (stay.propertyRating) {
        const ratingId = `${stay.propertyRating}-star`;
        counts[ratingId] = (counts[ratingId] || 0) + 1;
      }

      // Count amenities
      if (stay.amenities && Array.isArray(stay.amenities)) {
        stay.amenities.forEach(amenity => {
          if (amenity && amenity.name) {
            const amenityId = amenity.name.toLowerCase();
            counts[amenityId] = (counts[amenityId] || 0) + 1;
          }
        });
      }

      // Count meal options
      if (stay.mealOptions && Array.isArray(stay.mealOptions)) {
        stay.mealOptions.forEach(meal => {
          if (meal && meal.name) {
            const mealId = meal.name.toLowerCase();
            counts[mealId] = (counts[mealId] || 0) + 1;
          }
        });
      }

      // Count room facilities
      if (stay.roomFacilities && Array.isArray(stay.roomFacilities)) {
        stay.roomFacilities.forEach(facility => {
          if (facility && facility.name) {
            const facilityId = facility.name.toLowerCase();
            counts[facilityId] = (counts[facilityId] || 0) + 1;
          }
        });
      }

      // Count activities
      if (stay.activities && Array.isArray(stay.activities)) {
        stay.activities.forEach(activity => {
          if (activity && activity.name) {
            const activityId = activity.name.toLowerCase();
            counts[activityId] = (counts[activityId] || 0) + 1;
          }
        });
      }
    });
    
    console.log('Calculated counts:', counts);
    return counts;
  };

  useEffect(() => {
    fetchStays();
  }, []);

  const value = {
    stays: getFilteredAndSortedStays(),
    loading,
    error,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    fetchStays,
    staysCounts: getStaysCounts(),
    pagination
  };

  return (
    <StaysContext.Provider value={value}>
      {children}
    </StaysContext.Provider>
  );
}; 