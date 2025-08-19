import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Check, X, Car, Users, Fuel, Settings, Clock, Shield, Phone, Mail, User, ShoppingCart } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

const API_URL = import.meta.env.MODE === "production"
  ? "https://demo.didihat.com"
  : "http://localhost:1350";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const getHeaders = () => ({
  'Authorization': `Bearer ${API_TOKEN}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

// HeroSection for car rental booking
const HeroSection = () => (
  <section className="bg-gray-900 pt-28 pb-16">
    <div className="container mx-auto px-4">
      <div className="text-center">
        
      </div>
    </div>
  </section>
);

const CarRentalBookingPage = () => {
  const { carSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
    dropDate: '',
    pickupLocation: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationError, setValidationError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});


  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const url = `${API_URL}/api/car-rentals?filters[slug][$eq]=${carSlug}&populate=image`;
        const response = await fetch(url, { headers: getHeaders() });
        const data = await response.json();
        if (response.ok && data.data && data.data.length > 0) {
          const item = data.data[0];
          setCar({
            id: item.id,
            name: item.name || 'No name',
            image: item.image?.url ? `${API_URL}${item.image.url}` : '/images/car-rentals/default.webp',
            price: Number(item.price) || 0,
            originalPrice: Number(item.originalPrice) || 0,
            location: item.location || 'No location',
            description: item.description || 'No description',
            features: Array.isArray(item.features) ? item.features : [],
            rating: Number(item.rating) || 0,
            reviews: Number(item.reviews) || 0,
            freeKms: item.freeKms || '',
            extraKmRate: item.extraKmRate || '',
            freeCancellation: item.freeCancellation || false,
            available: item.available || '',
            slug: item.slug || '',
            carType: item.carType || '',
            transmission: item.transmission || '',
            included: Array.isArray(item.included) ? item.included : [],
            notIncluded: Array.isArray(item.notIncluded) ? item.notIncluded : [],
            capacity: item.capacity || '',
            fuelType: item.fuelType || '',
          });
        } else {
          setCar(null);
        }
      } catch {
        setCar(null);
      }
      setLoading(false);
    };
    fetchCar();
  }, [carSlug]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddToCart = () => {
    // Clear previous messages
    setValidationError('');
    setSuccessMessage('');
    setFieldErrors({});

    const errors = {};

    // Validation checks
    if (!form.pickupDate) {
      errors.pickupDate = 'Please select pickup date';
    }

    if (!form.dropDate) {
      errors.dropDate = 'Please select drop-off date';
    }

    if (!form.pickupLocation) {
      errors.pickupLocation = 'Please enter pickup location';
    }

    if (!car) {
      setValidationError('Car information not available');
      return;
    }

    if (form.pickupDate && form.dropDate && new Date(form.pickupDate) >= new Date(form.dropDate)) {
      errors.dropDate = 'Drop-off date must be after pickup date';
    }

    // If there are any errors, set them and return
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const cartItem = {
      id: car.id,
      type: 'car-rental',
      name: car.name,
      image: car.image,
      location: car.location,
      selectedDate: form.pickupDate,
      dropDate: form.dropDate,
      pickupLocation: form.pickupLocation,
      quantity: 1,
      price: car.price,
      totalPrice: car.price,
      carType: car.carType,
      transmission: car.transmission,
      fuelType: car.fuelType,
      capacity: car.capacity
    };

    addToCart(cartItem);
    setSuccessMessage('Successfully added to cart! Redirecting to cart...');

    // Redirect to cart after a short delay
    setTimeout(() => {
      navigate('/cart');
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
         
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Car Not Found</h2>
          <p className="text-gray-600 mb-6">The requested car could not be loaded.</p>
          <button 
            onClick={() => navigate('/car-rentals')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Car Rentals
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        {/* <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-gray-800">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for booking <span className="font-semibold text-blue-600">{car.name}</span>.
            <br />We will contact you within 24 hours to confirm your reservation.
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors w-full"
            onClick={() => navigate('/car-rentals')}
          >
            Back to Car Rentals
          </button>
        </div> */}
        <p>Thank you for booking</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <HeroSection car={car} />
      <div className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Car Details */}
            <div className="flex-1">
            
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/images/car-rentals/default.webp';
                      }}
                    />
                  </div>
                  
               
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Rating Bage */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1 text-sm font-medium shadow-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{car.rating || 4.5}</span>
                      <span className="text-gray-500">({car.reviews || 0})</span>
                    </div>
                  </div>
                  
             
                </div>
                
                <div className="p-8">
                  {/* Car Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
                    <div className="flex-1">
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{car.name}</h1>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          <span className="font-medium">{car.location}</span>
                        </div>
                        {car.available && (
                          <div className="flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">{car.available}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                   
                    <div className="bg-blue-50 rounded-xl p-4 text-center md:min-w-[200px]">
                      <p className="text-sm text-gray-600 mb-1">Starting from</p>
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{Number(car.price).toLocaleString('en-IN')}
                      </div>
                      <p className="text-sm text-gray-500">per day</p>
                    </div>
                  </div>

                  {/* Car Specifications */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <Car className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-semibold text-gray-800">{car.carType}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <Settings className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Transmission</p>
                      <p className="font-semibold text-gray-800">{car.transmission}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Capacity</p>
                      <p className="font-semibold text-gray-800">{car.capacity} Seats</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <Fuel className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Fuel Type</p>
                      <p className="font-semibold text-gray-800">{car.fuelType}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">About this car</h3>
                    <p className="text-gray-700 leading-relaxed">{car.description}</p>
                  </div>

                  {/* Features */}
                  {car.features && car.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {car.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Included & Not Included */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                    {car.included?.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                          <Check className="w-5 h-5" />
                          What's Included
                        </h4>
                        <ul className="space-y-2">
                          {car.included.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-green-700">
                              <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

               
                    {car.notIncluded?.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                          <X className="w-5 h-5" />
                          Not Included
                        </h4>
                        <ul className="space-y-2">
                          {car.notIncluded.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                              <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8" id="car-booking-form">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h2>
                  <p className="text-gray-600">Fill in your details to reserve this amazing car</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
               
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-500" />
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={form.name} 
                          onChange={handleChange} 
                          required 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={form.phone} 
                          onChange={handleChange} 
                          required 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Rental Details */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      Rental Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                        <input
                          type="date"
                          name="pickupDate"
                          value={form.pickupDate}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        {fieldErrors.pickupDate && (
                          <div className="mt-1 text-red-600 text-sm">
                            {fieldErrors.pickupDate}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Date</label>
                        <input
                          type="date"
                          name="dropDate"
                          value={form.dropDate}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        {fieldErrors.dropDate && (
                          <div className="mt-1 text-red-600 text-sm">
                            {fieldErrors.dropDate}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                      <input
                        type="text"
                        name="pickupLocation"
                        value={form.pickupLocation}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter pickup location"
                      />
                      {fieldErrors.pickupLocation && (
                        <div className="mt-1 text-red-600 text-sm">
                          {fieldErrors.pickupLocation}
                        </div>
                      )}
                    </div>
                  </div>

              
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                    <textarea 
                      name="notes" 
                      value={form.notes} 
                      onChange={handleChange} 
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      rows={4}
                      placeholder="Any special requests or additional information..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                      {error}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="w-full bg-[#003B95] hover:bg-[#002D70] text-white py-3 rounded-lg font-medium text-base transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Booking...
                      </div>
                    ) : (
                      'Confirm and Pay'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/*  Pricing  */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
                {/* Header */}
                <div className=" p-6 text-white">
                  <h2 className="text-2xl text-gray-800 font-bold mb-2">Booking Summary</h2>
                  <p className="text-gray-500">Review your rental details</p>
                </div>

           
                <div className="p-6">
            
                  <div className="mb-6">
                    <div className="flex flex-col items-center justify-center mb-4">
                      {Number(car.originalPrice) > 0 && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base text-gray-400 line-through">
                            ₹{Number(car.originalPrice).toLocaleString('en-IN')}
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                            {Math.round((1 - car.price / car.originalPrice) * 100)}% OFF
                          </span>
                        </div>
                      )}
                      <div className="text-5xl font-extrabold text-[#0066ff] mb-1">
                        ₹{Number(car.price).toLocaleString('en-IN')}
                      </div>
                      <p className="text-gray-600 text-base">per day</p>
                    </div>
                  </div>

                
                  <div className="space-y-3 mb-6">
                    {car.freeKms && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{car.freeKms} free kilometers</span>
                      </div>
                    )}
                    {car.freeCancellation && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Shield className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Free cancellation</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">24/7 customer support</span>
                    </div>
                  </div>





                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarRentalBookingPage;