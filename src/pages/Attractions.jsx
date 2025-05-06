import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Attractions = () => {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    date: '',
    guests: 2
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search params:', searchParams);
  };

  const categories = [
    { name: "Tours & Sightseeing", image: "/images/attractions/categories/tours.jpg" },
    { name: "Adventure Activities", image: "/images/attractions/categories/adventure.jpg" },
    { name: "Cultural Experiences", image: "/images/attractions/categories/cultural.jpg" },
    { name: "Nature & Wildlife", image: "/images/attractions/categories/wildlife.jpg" },
  ];

  const featuredAttractions = [
    {
      id: 1,
      name: "Valley of Flowers Trek",
      location: "Uttarakhand",
      rating: "4.8",
      reviews: "1,234",
      price: "₹2,499",
      duration: "8 hours",
      image: "/images/attractions/valley-flowers.jpg",
      tags: ["Skip the line", "Free cancellation"]
    },
    {
      id: 2,
      name: "Nainital Lake Tour",
      location: "Nainital",
      rating: "4.6",
      reviews: "856",
      price: "₹1,299",
      duration: "4 hours",
      image: "/images/attractions/nainital-lake.jpg",
      tags: ["Instant confirmation", "Free cancellation"]
    },
    {
      id: 3,
      name: "Rishikesh River Rafting",
      location: "Rishikesh",
      rating: "4.9",
      reviews: "2,145",
      price: "₹1,999",
      duration: "6 hours",
      image: "/images/attractions/rafting.jpg",
      tags: ["Best seller", "Free cancellation"]
    },
    {
      id: 4,
      name: "Jim Corbett Safari",
      location: "Jim Corbett National Park",
      rating: "4.7",
      reviews: "945",
      price: "₹3,499",
      duration: "Full day",
      image: "/images/attractions/corbett.jpg",
      tags: ["Small group", "Free cancellation"]
    }
  ];

  const destinations = [
    { name: "Delhi", count: "45 activities", image: "/images/attractions/destinations/nainital.jpg" },
    { name: "Mussoorie", count: "38 activities", image: "/images/attractions/destinations/mussoorie.jpg" },
    { name: "Rishikesh", count: "52 activities", image: "/images/attractions/destinations/rishikesh.jpg" },
    { name: "Varanasi", count: "31 activities", image: "/images/attractions/destinations/dehradun.jpg" },
      { name: "Agra", count: "31 activities", image: "/images/attractions/destinations/dehradun.jpg" },
      { name: "Goa", count: "31 activities", image: "/images/attractions/destinations/dehradun.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[600px] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.webp"
            alt="hero bg"
            className="w-full h-full object-cover opacity-60"
            loading="lazy"
            fetchpriority="high"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
              Discover Unforgettable Experiences
            </h1>
          </div>
          
          <div className="max-w-2xl w-full mx-auto mt-8">
            <div className="bg-white rounded-xl p-6 shadow-xl">
              <form onSubmit={handleSearch} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Destination Input */}
                  <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#84cc16] transition-colors">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="destination"
                        type="text"
                        value={searchParams.destination}
                        onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                        placeholder="Where are you going?"
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#84cc16] transition-colors">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="date"
                        type="text"
                        placeholder="Select your dates"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => {
                          if (!e.target.value) e.target.type = 'text'
                        }}
                        value={searchParams.date}
                        onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="mt-6 text-center">
                  <button
                    type="submit"
                    className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-2.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066ff]"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[#84cc16] text-sm font-semibold tracking-wider uppercase mb-2 block">Categories</span>
              <h2 className="text-3xl font-bold text-gray-900">Browse by category</h2>
            </div>
            <Link to="/categories" className="text-[#84cc16] font-medium hover:text-[#65a30d] flex items-center gap-1 group">
              View all categories
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={index} 
                    className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                    <h3 className="text-white text-xl font-semibold group-hover:translate-x-2 transition-transform">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Popular Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[#84cc16] text-sm font-semibold tracking-wider uppercase mb-2 block">Destinations</span>
              <h2 className="text-3xl font-bold text-gray-900">Popular destinations</h2>
            </div>
            <Link to="/destinations" className="text-[#84cc16] font-medium hover:text-[#65a30d] flex items-center gap-1 group">
              View all destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <Link to={`/destination/${destination.name.toLowerCase()}`} key={index} 
                    className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-semibold group-hover:translate-x-2 transition-transform">
                      {destination.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-1 group-hover:translate-x-2 transition-transform">
                      {destination.count}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Attractions; 
