import React, { useState } from 'react';
import { MapPin, Calendar, ArrowRight, LeafyGreen, CalendarCheck, Headphones } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AttractionsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    destination: '',
    date: '',
    guests: 2
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchParams.destination) {
      navigate(`/attraction/${searchParams.destination.toLowerCase()}`);
    }
  };

  const destinations = [
   
    { name: "Mumbai", image: "/images/attractions/mumbai.webp" },
    { name: "Jaipur", image: "/images/attractions/jaipur.webp" },
    { name: "Udaipur", image: "/images/attractions/udaipur.webp" },
    { name: "Kerala", image: "/images/attractions/kerala.webp" },
    { name: "Shimla", image: "/images/attractions//shimla.webp" },   
    { name: "Amritsar", image: "/images/attractions/amritsar.webp" },
    { name: "Kolkata", image: "/images/attractions/kolkata.webp" },
   { name: "Nainital", image: "/images/attractions/nainital.webp" },
   { name: "Haridwar", image: "/images/attractions/haridwar.webp" },
   { name: "Leh", image: "/images/attractions/leh.webp" },
   { name: "Rishikesh", image: "/images/attractions/rishikesh.webp" },
   { name: "Coimbatore", image: "/images/attractions/coimbatore.webp" },
  { name: "Shillong", image: "/images/attractions/shillong.webp" },
  { name: "Mysore", image: "/images/attractions/mysore.webp" },
  { name: "Darjeeling", image: "/images/attractions/darjeeling.webp" },
  { name: "Srinagar", image: "/images/attractions/srinagar.webp" }



  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 pt-36 pb-16">
        <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          Discover Amazing Attractions
        </h1>
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Destination */}
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
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

                  {/* Date */}
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="date"
                        type="date"
                        value={searchParams.date}
                        onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-[#0066ff] hover:bg-[#0052cc] text-white px-8 py-3.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066ff] whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

     

      {/*Top Attractions */} 
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase">TOP</span>
            </div>
            <h2 className="text-[28px] font-bold text-gray-900">Top Attractions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Varanasi", image: "/images/attractions/varanasi.webp" },
              { name: "Agra", image: "/images/attractions/agra.webp"},
              { name: "Delhi", image: "/images/attractions/delhi.webp"},
              { name: "Goa", image: "/images/attractions/goa.webp"},
              { name: "Manali", image: "/images/attractions/manali.webp"},
              
            ].map((place, idx) => (
              <Link to={`/attraction/${place.name.toLowerCase()}`} key={idx} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3]">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-semibold group-hover:translate-x-2 transition-transform">
                      {place.name}
                    </h3>
                  
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


 {/* covered section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase">Our Commitments</span>
            </div>
            <h2 className="text-[28px] font-bold text-gray-900">We've Got You Covered</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-4">
              <LeafyGreen className="w-12 h-12 text-[#84cc16] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore Top Attractions</h3>
              <p className="text-gray-600">Experience the best of your destination, with attractions, tours, activities and more</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <CalendarCheck className="w-12 h-12 text-[#84cc16] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast and Flexible</h3>
              <p className="text-gray-600">Book tickets online in minutes, with free cancellation on many attractions</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Headphones className="w-12 h-12 text-[#84cc16] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support when you need it</h3>
              <p className="text-gray-600">Our global Customer Service team is here to help 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore more attractions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase">More Attractions</span>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-[28px] font-bold text-gray-900">Explore more attractions</h2>
              <Link to="/all-attractions" className="text-[#003B95] hover:text-blue-700 font-medium">
                View all attractions
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {destinations.map((destination, index) => (
              <Link to={`/attraction/${destination.name.toLowerCase()}`} key={index} 
                    className="group cursor-pointer">
                <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[5/4]">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-2">
                    <h3 className="text-white text-sm font-medium group-hover:translate-x-1 transition-transform">
                      {destination.name}
                    </h3>
                    
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

export default AttractionsPage; 

