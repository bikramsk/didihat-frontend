import React, { useState } from 'react';
import { Car, Calendar, MapPin, Star, Users, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CarRentalsPage = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
    carType: 'all'
  });
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault();
    const location = searchParams.location.trim();
    if (location) {
    
      const urlLocation = location.toLowerCase().replace(/ /g, '-');
      navigate(`/car-rentals/${urlLocation}`);
    }
  };

  const carTypes = [
    { value: 'all', label: 'All Car Types' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'muv', label: 'MUV' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'tempo', label: 'Tempo Traveller' }
  ];



 
  const popularCities = [
    { name: 'Uttarakhand', image: 'images/car-rentals/uttarakhand.webp' },
    { name: 'Delhi', image: '/images/car-rentals/delhi.webp' },
    { name: 'Mumbai', image: 'images/car-rentals/mumbai.webp' },
    { name: 'Bangalore', image: 'images/car-rentals/bangalore.webp' },
    { name: 'Himanchal Pradesh', image: 'images/car-rentals/himanchal.webp' },
    { name: 'Kolkata', image: 'images/car-rentals/kolkata.webp' },   
    { name: 'Pune', image: 'images/car-rentals/pune.webp' },
    { name: 'Jaipur', image: 'images/car-rentals/jaipur.webp' },
  ];

  const popularAirports = [
    { name: 'Dehradun Airport (DED)', image: 'images/car-rentals/dehradun.webp' },
    { name: 'Delhi Airport (DEL)', image: 'images/car-rentals/delhi.webp' },
    { name: 'Mumbai Airport (BOM)', image: 'images/car-rentals/mumbai.webp' },
    { name: 'Bangalore Airport (BLR)', image: 'images/car-rentals/bangalore.webp' },   
    { name: 'Kolkata Airport (CCU)', image: 'images/car-rentals/kolkata.webp' },
    { name: 'Himanchal Airport (SLV)', image: 'images/car-rentals/himanchal.webp' },
    { name: 'Pune Airport (PNQ)', image: 'images/car-rentals/pune.webp' },
    { name: 'Jaipur Airport (JAI)', image: 'images/car-rentals/jaipur.webp' },
  ];

    const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All our vehicles are sanitized and maintained to the highest standards'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for your peace of mind'
    },
    {
      icon: Users,
      title: 'Verified Drivers',
      description: 'Professional and experienced drivers for a comfortable journey'
    },
    {
      icon: Star,
      title: 'Best Prices',
      description: 'Competitive rates with no hidden charges or extra fees'
    }
  ];	

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 pt-36 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Rent a Car for Your Journey
          </h1>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Explore our handcrafted car rental packages for unforgettable adventures
          </p>
          
         
          <div className="w-full max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="relative">
                <div className="flex flex-col lg:flex-row gap-4 mb-4">
                  {/* Location */}
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchParams.location}
                        onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                        placeholder="Where do you want to go?"
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Pickup Date */}
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={searchParams.pickupDate}
                        onChange={(e) => setSearchParams({...searchParams, pickupDate: e.target.value})}
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-gray-500 font-semibold">to</div>
                  {/* Return Date */}
                  <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#0066ff] transition-colors">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={searchParams.returnDate}
                        onChange={(e) => setSearchParams({...searchParams, returnDate: e.target.value})}
                        className="w-full pl-10 pr-4 py-3.5 outline-none text-gray-900 bg-transparent"
                      />
                    </div>
                  </div>


    
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </section>

   

      {/* Car Types */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-[1px] w-8 bg-[#003B95]"></div>
          <span className="text-[#003B95] text-sm font-medium uppercase">CAR TYPES</span>
        </div>
        <h2 className="text-[28px] font-bold text-gray-900 mb-8">Choose Your Perfect Car</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {carTypes.slice(1).map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => navigate(`/car-rentals/all?carType=${encodeURIComponent(type.label)}`)}
              className={`p-6 rounded-xl border text-center transition-all duration-200 hover:shadow-lg ${
                searchParams.carType === type.value
                  ? 'border-[#0066ff] bg-blue-50 text-[#0066ff] shadow-md'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#0066ff] hover:text-[#0066ff]'
              }`}
            >
              <div className="flex flex-col items-center">
                <Car className="w-12 h-12 mb-4" />
                <span className="text-lg font-semibold mb-2">{type.label}</span>
                <span className="text-sm text-gray-500">
                  {type.value === 'hatchback' && 'From ₹677'}
                  {type.value === 'sedan' && 'From ₹680'}
                  {type.value === 'suv' && 'From ₹935'}
                  {type.value === 'muv' && 'From ₹1000'}
                  {type.value === 'luxury' && 'From ₹3,000'}
                  {type.value === 'tempo' && 'From ₹5,500'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Car Rentals?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide the best car rental experience with premium services and unmatched reliability</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Popular Cities*/}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-[1px] w-8 bg-[#003B95]"></div>
          <span className="text-[#003B95] text-sm font-medium uppercase">POPULAR CITIES</span>
        </div>
        <h2 className="text-[28px] font-bold text-gray-900 mb-8">Car Hire in Popular Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularCities.map(city => (
            <div key={city.name} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <img src={city.image} alt={city.name} className="w-20 h-20 object-cover rounded-full mb-2" />
              <h3 className="font-bold mb-1">{city.name}</h3>
              <button
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                onClick={() => navigate(`/car-rentals/${city.name.toLowerCase().replace(/ /g, '-')}`)}
              >
                View Cars
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Airports */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-[1px] w-8 bg-[#003B95]"></div>
          <span className="text-[#003B95] text-sm font-medium uppercase">AIRPORTS</span>
        </div>
        <h2 className="text-[28px] font-bold text-gray-900 mb-8">Car Hire at Airports</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {popularAirports.map(airport => (
            <div key={airport.name} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <img src={airport.image} alt={airport.name} className="w-20 h-20 object-cover rounded-full mb-2" />
              <h3 className="font-bold mb-1">{airport.name}</h3>
              <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">Hire at Airport</button>
            </div>
          ))}
        </div>
      </section>

         {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our travel experts are here to help you plan the perfect trip. Get personalized recommendations and exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Contact Us
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Get Quote
            </button>
          </div>
        </div>
      </section>

  

    </div>
  );
};

export default CarRentalsPage;