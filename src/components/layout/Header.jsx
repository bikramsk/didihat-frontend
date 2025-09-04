import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, MapPin, Phone, Mail, LogIn, UserPlus, ShoppingCart } from 'lucide-react';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import { useCart } from '../../context/CartContext';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { getCartTotals } = useCart();
  const { itemCount } = getCartTotals();

  
  const isAuthPage = ['/login', '/signup', '/reset-password'].includes(location.pathname);

  // if page is dashboard or profile
  const isDashboardPage = location.pathname === '/dashboard';
  const isProfilePage = location.pathname === '/profile';

 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.auth-dropdown')) {
        // No longer needed
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {

    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('user')));
      } catch {
        setUser(null);
      }
    };

    
    window.addEventListener('storage', syncUser);

    window.addEventListener('userLogout', syncUser);

    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('userLogout', syncUser);
    };
  }, []);

  useEffect(() => {
    if (!accountDropdownOpen) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [accountDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setUser(null);

    
    window.dispatchEvent(new Event('userLogout'));
    navigate('/');
  };

  if (isAuthPage) {
    return null;
  }

  const handleLoginClick = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  // Show only top bar on dashboard and profile page
  if (isDashboardPage || isProfilePage) {
    return (
      <>
        
        <div className="bg-gray-900 text-white py-2 px-4">
          <div className="container mx-auto flex flex-wrap justify-between items-center">
           
            <div className="flex flex-wrap items-center gap-4 font-sans">
              <div className="hidden md:flex items-center">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">Didihat(UK), India</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-1" />
                <span className="text-sm">+91 9410116800</span>
              </div>
              <div className="hidden sm:flex items-center">
                <Mail size={16} className="mr-1" />
                <span className="text-sm">contact@didihat.com</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-blue-500 transition-colors">
                <FaFacebook size={14} />
              </a>
              <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-pink-600 transition-colors">
                <FaInstagram size={14} />
              </a>
              {/* Hide on mobile */}
              <div className="hidden sm:flex items-center gap-2">
                <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-blue-500 transition-colors">
                  <FaTwitter size={14} />
                </a>
                <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-blue-700 transition-colors">
                  <FaLinkedin size={14} />
                </a>
                <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-red-600 transition-colors">
                  <FaYoutube size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
        
          <div className="flex flex-wrap items-center gap-4 font-sans">
         
            <div className="hidden md:flex items-center">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">Didihat(UK), India</span>
            </div>
          
            <div className="flex items-center">
              <Phone size={16} className="mr-1" />
              <span className="text-sm">+91 9410116800</span>
            </div>
          
            <div className="hidden sm:flex items-center">
              <Mail size={16} className="mr-1" />
              <span className="text-sm">contact@didihat.com</span>
            </div>
          </div>

          {/* Social  */}
          <div className="flex items-center gap-2">
            
            <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-blue-500 transition-colors">
              <FaFacebook size={14} />
            </a>
            <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-pink-600 transition-colors">
              <FaInstagram size={14} />
            </a>
            {/* Hide on mobile */}
            <div className="hidden sm:flex items-center gap-2">
              <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-blue-500 transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-blue-700 transition-colors">
                <FaLinkedin size={14} />
              </a>
              <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-red-600 transition-colors">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white shadow-md py-2 mt-0 border-gray-200' 
          : 'bg-transparent py-4 mt-[44px] border-white/10'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
         
            <Link 
              to="/" 
              className="transition-colors duration-300"
              onClick={() => {
               
                setIsOpen(false);
              }}
            >
              <img 
                src="/didihat-logo.png" 
                alt="Didihat.com Logo" 
                className={`h-14 -ml-7 transition-all duration-300 ${
                  isScrolled ? 'opacity-100' : 'opacity-100 brightness-0 invert'
                }`}
              />
            </Link>
            {/* <Link to="/" className={`text-3xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-[#003B95]'
            }`}>
              Didihat.com
            </Link> */}

            {/* Mobile menu  */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden focus:outline-none transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              {isOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-12 font-sans">
              <Link to="/stays" className={`relative group py-2 text-sm xl:text-base ${
                isScrolled ? 'text-gray-900 hover:text-[#003B95]' : 'text-white hover:text-[#4F8CE5]'
              }`}>
                Stays
                {!isScrolled && (
                  <div className="absolute bottom-[-20px] left-0 w-full h-[2px] bg-[#4F8CE5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </Link>
              <a href="/attractions" className={`relative group py-2 text-sm xl:text-base ${
                isScrolled ? 'text-gray-900 hover:text-[#003B95]' : 'text-white hover:text-[#4F8CE5]'
              }`}>
               Attractions
                {!isScrolled && (
                  <div className="absolute bottom-[-20px] left-0 w-full h-[2px] bg-[#4F8CE5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </a>
             
              <a href="/tour-packages" className={`relative group py-2 text-sm xl:text-base ${
                isScrolled ? 'text-gray-900 hover:text-[#4F8CE5]' : 'text-white hover:text-[#4F8CE5]'
              }`}>
                Tour Packages
                {!isScrolled && (
                  <div className="absolute bottom-[-20px] left-0 w-full h-[2px] bg-[#4F8CE5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </a>
              
              <Link to="/car-rentals" className={`relative group py-2 text-sm xl:text-base ${
                isScrolled ? 'text-gray-900 hover:text-[#003B95]' : 'text-white hover:text-[#4F8CE5]'
              }`}>
                Car Rentals
                {!isScrolled && (
                  <div className="absolute bottom-[-20px] left-0 w-full h-[2px] bg-[#4F8CE5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </Link>

              {/* Cart Icon */}
              <Link to="/cart" className={`relative py-2 ${
                isScrolled ? 'text-gray-900 hover:text-[#003B95]' : 'text-white hover:text-[#4F8CE5]'
              }`}>
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* Auth Buttons for Desktop */}
              {!user ? (
                <div className="hidden lg:flex items-center gap-3 ml-3 xl:ml-8">
                  <button
                    onClick={handleLoginClick}
                    className={`text-sm font-medium py-2 px-3 rounded transition-colors ${
                      isScrolled 
                        ? 'bg-[#003B95] text-white hover:bg-[#002D70]' 
                        : 'bg-white text-[#003B95] hover:bg-gray-100'
                    }`}
                  >
                    Sign in
                  </button>
                  <button
                    onClick={handleSignupClick}
                    className={`text-sm font-medium py-2 px-3 rounded transition-colors ${
                      isScrolled 
                        ? 'bg-[#003B95] text-white hover:bg-[#002D70]' 
                        : 'bg-white text-[#003B95] hover:bg-gray-100'
                    }`}
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="relative hidden lg:block ml-3 xl:ml-8">
                  <button
                    onClick={() => setAccountDropdownOpen((open) => !open)}
                    className={`flex items-center gap-2 text-sm font-medium py-2 px-3 rounded transition-colors ${
                      isScrolled 
                        ? 'bg-[#003B95] text-white hover:bg-[#002D70]' 
                        : 'bg-white text-[#003B95] hover:bg-gray-100'
                    }`}
                  >
                    My Account <ChevronDown size={16} />
                  </button>
                  {accountDropdownOpen && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-sm min-w-[160px]">
                      <ul className="py-1">
                        
                        <li>
                          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 font-normal">My Profile</Link>
                        </li>
                        <li>
                          <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 font-normal">My Booking</Link>
                        </li>
                        <li><hr className="my-1 border-gray-200" /></li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 font-normal focus:outline-none"
                            type="button"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

              
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div className="lg:hidden absolute top-full left-0 right-0 bg-white font-sans shadow-lg mt-0 border-t border-gray-100">
                <div className="container mx-auto px-4 py-3">
                  <div className="flex flex-col space-y-3">
                    <Link to="/stays" className="text-gray-900 hover:text-[#003B95] transition-colors duration-300 py-2">
                      Stays
                    </Link>
                   
                    <a href="/attractions" className="text-gray-900 hover:text-[#003B95] transition-colors duration-300 py-2">
                     Attractions
                    </a>
                   <a href="/tour-packages" className="text-gray-900 hover:text-[#003B95] transition-colors duration-300 py-2">
                      Tour Packages
                    </a>
                    
                    <Link to="/car-rentals" className="text-gray-900 hover:text-[#003B95] transition-colors duration-300 py-2">
                     Car Rentals
                    </Link>

                    <Link to="/cart" className="flex items-center justify-between text-gray-900 hover:text-[#003B95] transition-colors duration-300 py-2">
                      <span>Shopping Cart</span>
                      <div className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        {itemCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                            {itemCount > 99 ? '99+' : itemCount}
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Mobile -Auth Buttons */}
                    {!user ? (
                      <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            handleLoginClick();
                          }}
                          className="flex items-center justify-center gap-2 w-full bg-[#003B95] text-white px-4 py-2.5 rounded-lg hover:bg-[#003B95] transition-colors"
                        >
                          <span>Login</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            handleSignupClick();
                          }}
                          className="flex items-center justify-center gap-2 w-full border-2 border-[#003B95] text-[#003B95] px-4 py-2.5 rounded-lg hover:bg-[#003B95] hover:text-white transition-colors"
                        >
                          <span>Register</span>
                        </button>
                      </div>
                    ) : (
                      <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
                        <button
                          onClick={() => setAccountDropdownOpen((open) => !open)}
                          className="flex items-center justify-center gap-2 w-full bg-[#003B95] text-white px-4 py-2.5 rounded-lg hover:bg-[#003B95] transition-colors"
                        >
                          My Account <ChevronDown size={16} />
                        </button>
                        {accountDropdownOpen && (
                          <div ref={dropdownRef} className="w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-2 text-sm min-w-[160px]">
                            <ul className="py-1">
                              <li>
                                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 font-normal">My Booking</Link>
                              </li>
                              <li>
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 font-normal">My Profile</Link>
                              </li>
                              <li><hr className="my-1 border-gray-200" /></li>
                              <li>
                                <button
                                  onClick={handleLogout}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 font-normal focus:outline-none"
                                  type="button"
                                >
                                  Logout
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

{/*auth Modals */}
<Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <Login 
          onClose={() => setLoginModalOpen(false)} 
          onSwitchToSignup={handleSignupClick}
        />
      </Modal>

      <Modal isOpen={signupModalOpen} onClose={() => setSignupModalOpen(false)}>
        <Signup 
          onClose={() => setSignupModalOpen(false)}
          onSwitchToLogin={handleLoginClick}
        />
      </Modal>
    </>
  );
};

export default Header;