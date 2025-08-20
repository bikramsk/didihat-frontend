import React, { useState, useEffect } from "react";
import { MapPin, Calendar } from "lucide-react";
import TourPackageCard from "./components/TourPackageCard";
import CategoryCard from "./components/CategoryCard";
import { Link, useParams } from "react-router-dom";


// const API_URL = import.meta.env.MODE === "production"
//   ? "https://admin.didihat.com"
//   : "http://localhost:1350";

  const API_URL = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;


const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const getHeaders = () => ({
  'Authorization': `Bearer ${API_TOKEN}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

const HeroSection = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination) {
      window.location.href = `/tour-packages/${destination.toLowerCase()}`;
    }
  };

  return (
    <section className="bg-gray-900 pt-28 pb-16 relative">
      
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url(/images/tour-packages-hero.jpg)",
          backgroundPosition: "center 40%",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Amazing Tour Packages
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Explore our handcrafted tour packages for unforgettable adventures
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Destination */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Date */}
              <div className="md:w-48 relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Search  */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};


const tourCategories = [
  {
    name: "Pilgrimage Tours",
    image: "/images/tour-packages/pilgrimage.webp",
    count: 12,
    slug: "pilgrimage-tours",
    type: "pilgrimage" 
  },
  {
    name: "Adventure Tours",
    image: "/images/tour-packages/adventure.webp",
    count: 8,
    slug: "adventure-tours",
    type: "adventure" 
  },
  {
    name: "Wildlife Tours",
    image: "/images/tour-packages/wildlife.webp",
    count: 6,
    slug: "wildlife-tours",
    type: "wildlife"  
  },
  {
    name: "Cultural Tours",
    image: "/images/tour-packages/cultural.webp",
    count: 9,
    slug: "cultural-tours",
    type: "cultural"  
  },
];


const tourLocations = [
  { name: "Rishikesh", image: "/images/tour-packages/rishikesh.webp" },
  { name: "Udaipur", image: "/images/tour-packages/udaipur.webp" },
  { name: "Kochi", image: "/images/tour-packages/kochi.webp" },
  { name: "Manali", image: "/images/tour-packages/manali.webp" },
 { name: "Delhi", image: "/images/tour-packages/delhi.webp" },
  { name: "Haridwar", image: "/images/tour-packages/haridwar.webp" },
  { name: "Nainital", image: "/images/tour-packages/nainital.webp" },
  // { name: "Leh", image: "/images/tour-packages/leh.webp" },
  // { name: "Shillong", image: "/images/tour-packages/shillong.webp" },
  // { name: "Darjeeling", image: "/images/tour-packages/darjeeling.webp" },
  // { name: "Srinagar", image: "/images/tour-packages/srinagar.webp" },
];

const getCategoryTitle = (slug) => {
  if (!slug) return null;
  const category = tourCategories.find(cat => cat.slug === slug);
  return category?.name || null;
};

const TourPackages = () => {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categorySlug } = useParams();  // Add this line to get category from URL

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        // Find the category object by slug
        const category = categorySlug 
          ? tourCategories.find(cat => cat.slug === categorySlug)
          : null;

        // Use the exact type value from the backend
        const apiUrl = category
          ? `${API_URL}/api/tour-packages?filters[type][$eq]=${category.type}&populate=*`
          : `${API_URL}/api/tour-packages?filters[featured][$eq]=true&populate=*`;

        const response = await fetch(apiUrl, { headers: getHeaders() });

        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }

        const data = await response.json();
        
        const transformedPackages = data.data.map(pkg => ({
          id: pkg.id,
          name: pkg.name,
          image: pkg.image?.url 
            ? `${API_URL}${pkg.image.url}`
            : '/images/tour-packages/test.webp',
          location: pkg.location,
          duration: pkg.duration,
          price: parseInt(pkg.price || 0),
          rating: parseFloat(pkg.rating || 0),
          reviews: parseInt(pkg.reviews || 0),
          slug: pkg.slug,
          type: pkg.type
        }));

        setFeaturedPackages(transformedPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, [categorySlug]); 

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      {/* Featured/Category Tour Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase">
                {categorySlug ? 'CATEGORY' : 'TOP'}
              </span>
            </div>
            <h2 className="text-[28px] font-bold text-gray-900">
              {categorySlug ? getCategoryTitle(categorySlug) : 'Featured Tour Packages'}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : featuredPackages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPackages.map((tourPackage) => (
                <TourPackageCard key={tourPackage.id} tourPackage={tourPackage} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No tour packages found in this category.</p>
              <Link to="/tour-packages" className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block">
                View all tour packages
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase">
                CATEGORIES
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-[28px] font-bold text-gray-900">
                Browse by Category
              </h2>
            </div>
          </div>

       
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tourCategories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Location */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase">
                LOCATIONS
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-[28px] font-bold text-gray-900">
                Browse by Location
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {tourLocations.map((location) => (
              <Link
                key={location.name}
                to={`/tour-packages/${location.name.toLowerCase()}`}
                className="group cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[5/4]">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-2">
                    <h3 className="text-white text-sm font-medium group-hover:translate-x-1 transition-transform">
                      {location.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase">
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="text-[28px] font-bold text-gray-900">
              Why Choose Our Tour Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#003B95]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Local Guides
              </h3>
              <p className="text-gray-600">
                Professional guides with deep local knowledge and experience
              </p>
            </div>

          
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#003B95]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Flexible Schedules
              </h3>
              <p className="text-gray-600">
                Choose from various durations and customize your itinerary
              </p>
            </div>

           
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-[#003B95]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Best Value
              </h3>
              <p className="text-gray-600">
                Competitive prices with no compromise on quality
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourPackages;
