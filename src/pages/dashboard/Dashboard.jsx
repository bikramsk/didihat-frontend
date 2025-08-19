import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  User,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  ChevronDown,
  Filter,
  Search,
  LogOut,
  MapPin,
  X
} from 'lucide-react';

const API_URL = import.meta.env.MODE === "production"
  ? "https://demo.didihat.com"
  : "http://localhost:1350";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  // Fetch user bookings
  const fetchBookings = async (type = 'ALL', status = 'ALL') => {
    if (!user) {
      console.log('No user found, skipping fetch');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('jwt');
      console.log('JWT Token:', token ? 'Found' : 'Not found');
      console.log('User:', user);

      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const params = new URLSearchParams();
      if (type !== 'ALL') params.append('type', type);
      if (status !== 'ALL') params.append('status', status);

      const url = `${API_URL}/api/bookings?${params.toString()}`;
      console.log('Fetching bookings from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to fetch bookings');
      }

      const data = await response.json();
      console.log('Bookings data:', data);
      setBookings(data.data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);


    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('jwt');


    window.dispatchEvent(new Event('userLogout'));
    navigate('/');
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch bookings when user or active tab changes
  useEffect(() => {
    if (user && (activeSection === 'bookings' || activeSection === 'dashboard')) {
      fetchBookings(activeTab, activeTab);
    }
  }, [user, activeTab, activeSection]);

  // Format booking date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get booking type label
  const getTypeLabel = (type) => {
    const labels = {
      'stay': 'Stay',
      'attraction': 'Attraction',
      'tour-package': 'Tour Package',
      'car-rental': 'Car Rental',
      'activity': 'Activity'
    };
    return labels[type] || 'Item';
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'confirmed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

 
  useEffect(() => {
    const handleUserLogout = () => {
      setUser(null);
    };

    window.addEventListener('userLogout', handleUserLogout);
    return () => window.removeEventListener('userLogout', handleUserLogout);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <User className="w-4 h-4" /> },
    { id: 'bookings', label: 'All Bookings', icon: <Calendar className="w-4 h-4" /> },
    { id: 'modify', label: 'Modify Bookings', icon: <Settings className="w-4 h-4" /> },
    { id: 'vouchers', label: 'Ticket/Vouchers', icon: <FileText className="w-4 h-4" /> },
    // { id: 'refund', label: 'Claim Refund/File TDR', icon: <CreditCard className="w-4 h-4" /> },
    // { id: 'flight-refund', label: 'Flight Refund Status', icon: <FileText className="w-4 h-4" /> },
    // { id: 'ecash', label: 'eCash', icon: <CreditCard className="w-4 h-4" /> },
    // { id: 'profile', label: 'Your Profile', icon: <User className="w-4 h-4" /> },
    { id: 'communication', label: 'Your Communication', icon: <User className="w-4 h-4" /> },
  ];

  const tabs = [
    { id: 'ALL', label: 'ALL' },
    { id: 'STAYS', label: 'STAYS' },
    { id: 'ATTRACTIONS', label: 'ATTRACTIONS' },
    { id: 'TOUR_PACKAGES', label: 'TOUR PACKAGES' },
    { id: 'CAR_RENTALS', label: 'CAR RENTALS' },
    { id: 'ACTIVITIES', label: 'ACTIVITIES' },
    { id: 'CANCELLED', label: 'CANCELLED' },
    { id: 'COMPLETED', label: 'COMPLETED' },
  ];

  if (!user && !isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  if (isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Logging out...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Dashboard - Didihat.com</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/">
                  <img
                    src="/didihat-logo.png"
                    alt="Didihat.com Logo"
                    className="h-12 cursor-pointer"
                  />
                </Link>
                {/* <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600 mt-1">My Bookings</p>
                </div> */}
              </div>
              <div className="flex items-center gap-4">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <p className="text-sm text-gray-500">Hi {user.username || user.email}!</p>
                    <ChevronDown className={`w-4 h-4 transition-transform text-gray-600 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setActiveSection('bookings');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          My Booking
                        </button>
                       <button
      onClick={() => navigate("/profile")}
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
    >
      <User className="w-4 h-4" />
      My Profile
    </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-12 h-12 bg-[#003B95] rounded-full flex items-center justify-center text-white font-semibold">
                  {(user.username || user.email).charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-64 bg-[#003B95] rounded-lg shadow-sm">
              <div className="p-4">
                <div className="bg-[#002D70] rounded-lg p-3 mb-4">
                  <div className="flex items-center text-white text-sm font-medium">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </div>
                </div>
                
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-[#002D70] text-white'
                          : 'text-white/80 hover:bg-[#002D70] hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

         
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-[#003B95] text-[#003B95]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

              
                <div className="p-6">
                  {activeSection === 'bookings' || activeSection === 'dashboard' ? (
                    <>
                      {/* Filter/ Search */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            Filter/Sort By
                          </button>
                          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <option>Relevance</option>
                            <option>Date</option>
                            <option>Price</option>
                          </select>
                        </div>
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search bookings..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
                          />
                        </div>
                      </div>


                      {/* Bookings Display */}
                      {loading ? (
                        <div className="text-center py-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003B95] mx-auto mb-4"></div>
                          <p className="text-gray-500">Loading your bookings...</p>
                        </div>
                      ) : error ? (
                        <div className="text-center py-12">
                          <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <X className="w-12 h-12 text-red-500" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Bookings</h3>
                          <p className="text-gray-500 mb-6">{error}</p>
                          <button
                            onClick={() => fetchBookings(activeTab, activeTab)}
                            className="bg-[#003B95] text-white px-6 py-2 rounded-lg hover:bg-[#002D70] transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      ) : bookings.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-12 h-12 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Found</h3>
                          <p className="text-gray-500 mb-6">
                            {activeTab === 'ALL'
                              ? "You haven't made any bookings yet."
                              : `No ${activeTab.toLowerCase().replace('_', ' ')} bookings found.`
                            }
                          </p>
                          <button
                            onClick={() => navigate('/')}
                            className="bg-[#003B95] text-white px-6 py-2 rounded-lg hover:bg-[#002D70] transition-colors"
                          >
                            Start Booking
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    Booking #{booking.bookingId}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    Booked on {formatDate(booking.bookingDate)}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.bookingStatus)}`}>
                                    {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                                  </span>
                                  <span className="text-lg font-bold text-[#003B95]">
                                    ₹{booking.total.toLocaleString()}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-3">
                                {booking.bookingItems.map((item, index) => (
                                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                    {item.image && (
                                      <img
                                        src={item.image.url || item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                      />
                                    )}
                                    <div className="flex-1">
                                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                                      <p className="text-sm text-gray-500">{getTypeLabel(item.type)}</p>
                                      {item.location && (
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                          <MapPin className="w-3 h-3" />
                                          {item.location}
                                        </p>
                                      )}
                                      {item.selectedDate && (
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          {formatDate(item.selectedDate)}
                                        </p>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                      <p className="font-medium text-gray-900">₹{(item.totalPrice || item.price).toLocaleString()}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                  {booking.itemCount} item{booking.itemCount !== 1 ? 's' : ''} •
                                  Payment: {booking.paymentStatus}
                                </div>
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    View Details
                                  </button>
                                  {booking.bookingStatus === 'confirmed' && (
                                    <button className="px-4 py-2 text-sm bg-[#003B95] text-white rounded-lg hover:bg-[#002D70] transition-colors">
                                      Manage Booking
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {sidebarItems.find(item => item.id === activeSection)?.label}
                      </h3>
                    
                    </div>
                  )}
                </div>
              </div>

              {/* Ads  */}
              <div className="mt-6 bg-gradient-to-r from-[#003B95] to-[#002D70] rounded-lg shadow-sm p-6 text-white">
                <div className="border-2 border-dashed border-white/30 rounded-lg p-4 text-center">
                  <h3 className="text-xl font-bold mb-2">How to</h3>
                  <h2 className="text-2xl font-bold mb-2">Get Best Deals</h2>
                  <h2 className="text-2xl font-bold mb-4">with Didihat?</h2>
                  <button className="bg-white text-[#003B95] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Click Here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
