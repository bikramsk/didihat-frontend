import React, { useState, useEffect } from 'react';
import { MapPin, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const AwesomePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        setLoading(true);
        
        // Fetch featured tour packages
        const queryUrl = `${API_URL}/api/tour-packages?populate=*&pagination[pageSize]=20`;
        
        const response = await fetch(queryUrl, {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch tour packages data');
        }

        const data = await response.json();
        
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error('Invalid data structure received from API');
        }

        // Transform the data to match the format
        const transformedPackages = data.data.map(pkg => ({
          id: pkg.id,
          image: pkg.image?.url ? `${API_URL}${pkg.image.url}` : null,
          location: pkg.name || pkg.location,
          days: pkg.duration || '5 days',
          persons: '2 Person',
          price: formatPrice(pkg.price),
          rating: parseFloat(pkg.rating) || 5,
          description: pkg.description || `Explore ${pkg.name || pkg.location}'s amazing attractions`,
          slug: pkg.slug,
          type: pkg.type
        }));

        // Randomly shuffle 
        const shuffledPackages = transformedPackages.sort(() => Math.random() - 0.5);
        const selectedPackages = shuffledPackages.slice(0, 3);

        setPackages(selectedPackages);
        setError(null);
        
        
        console.log('Featured Tour Packages loaded:', selectedPackages.length);
      } catch (error) {
        console.error('Error fetching tour packages:', error);
        setError(error.message);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, []);

  const formatPrice = (price) => {
    if (!price) return '24,999';
    
  
    if (typeof price === 'string' && price.includes(',')) {
      return price.replace(/[^\d,]/g, '');
    }
    
   
    const numericPrice = typeof price === 'string' ? 
      parseFloat(price.replace(/[^\d.]/g, '')) : 
      parseFloat(price);
    
    if (isNaN(numericPrice)) return '24,999';
    
    return numericPrice.toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Tour Packages</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Tour Packages</h2>
          </div>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Tour Packages</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Tour Packages</h2>
          </div>
          <div className="text-center py-8 text-red-600">
            <p className="text-lg font-semibold mb-2">Unable to load tour packages</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Tour Packages</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Tour Packages</h2>
          </div>
          <div className="text-center py-8 text-gray-600">
            <p className="text-lg">No tour packages available at the moment</p>
            <p className="text-sm">Please check back later for new packages</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-[#003B95]"></div>
            <span className="text-[#003B95] font-medium uppercase tracking-wider text-sm">Tour Packages</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Popular Tour Packages</h2>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Link 
              key={pkg.id} 
              to={`/tour-packages/booking/${pkg.slug || pkg.location.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 block"
            >
              {/* Image */}
              <div className="relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.location}
                  loading="lazy"
                  className="w-full h-54 object-cover"
                />
                {/* <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs">
                  20% OFF
                </div> */}
                {/* Package Type */}
                {pkg.type && (
                  <div className="absolute top-3 left-3 bg-[#003B95] text-white px-2 py-1 rounded text-xs font-medium capitalize">
                    {pkg.type}
                  </div>
                )}
              </div>

           
              <div className="p-4">
                {/* Title Location */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{pkg.location}</h3>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-[#003B95]" />
                    <span className="text-sm">India</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Calendar className="w-4 h-4 text-[#003B95]" />
                    <span className="text-sm">Durations: {pkg.days}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    {/* <Users className="w-4 h-4 text-[#003B95]" /> */}
                    <span className="text-sm">{pkg.persons}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {pkg.description}
                </p>

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <div className="text-[#003B95] font-bold text-lg">
                    ₹{pkg.price}
                  </div>
                  <Link 
                    to={`/tour-packages/booking/${pkg.slug || pkg.location.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-1.5 bg-[#003B95] text-white text-sm rounded-lg hover:bg-[#65a30d] transition-colors inline-block text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwesomePackages;