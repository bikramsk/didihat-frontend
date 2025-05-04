import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, MapPin, Phone, Mail } from 'lucide-react';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          {/* Contact information */}
          <div className="flex flex-wrap items-center gap-4">
         
            <div className="hidden md:flex items-center">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">Uttarakhand, India</span>
            </div>
          
            <div className="flex items-center">
              <Phone size={16} className="mr-1" />
              <span className="text-sm">+91 9999999999</span>
            </div>
          
            <div className="hidden sm:flex items-center">
              <Mail size={16} className="mr-1" />
              <span className="text-sm">contact@didihat.com</span>
            </div>
          </div>

          {/* Social icons  */}
          <div className="flex items-center gap-2">
            
            <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-blue-500 transition-colors">
              <FaFacebook size={14} />
            </a>
            <a href="#" className="rounded-full bg-transparent border border-gray-600 p-1 hover:bg-pink-600 transition-colors">
              <FaInstagram size={14} />
            </a>
            {/* Hidden on mobile */}
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

      {/* Main Header - Fixed */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white shadow-md py-2 mt-0 border-gray-200' 
          : 'bg-transparent py-4 mt-[44px] border-white/10'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className={`text-3xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-[#84cc16]'
            }`}>
              DIDIHAT
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden focus:outline-none transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-[#84cc16]'
              }`}
            >
              {isOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className={`relative group py-2 ${
                isScrolled ? 'text-gray-900 hover:text-[#84cc16]' : 'text-white hover:text-[#84cc16]'
              }`}>
                Home
                {!isScrolled && (
                  <div className="absolute bottom-[-16px] left-0 w-full h-[2px] bg-[#84cc16] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </a>
              <a href="#" className={`relative group py-2 ${
                isScrolled ? 'text-gray-900 hover:text-[#84cc16]' : 'text-white hover:text-[#84cc16]'
              }`}>
                Holiday Destinations
                {!isScrolled && (
                  <div className="absolute bottom-[-16px] left-0 w-full h-[2px] bg-[#84cc16] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </a>
              <a href="#" className={`relative group py-2 ${
                isScrolled ? 'text-gray-900 hover:text-[#84cc16]' : 'text-white hover:text-[#84cc16]'
              }`}>
                Hotels
                {!isScrolled && (
                  <div className="absolute bottom-[-16px] left-0 w-full h-[2px] bg-[#84cc16] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </a>
              <a href="#" className={`relative group py-2 ${
                isScrolled ? 'text-gray-900 hover:text-[#84cc16]' : 'text-white hover:text-[#84cc16]'
              }`}>
                Holiday Home
                {!isScrolled && (
                  <div className="absolute bottom-[-16px] left-0 w-full h-[2px] bg-[#84cc16] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </a>
              <a href="#" className={`relative group py-2 ${
                isScrolled ? 'text-gray-900 hover:text-[#84cc16]' : 'text-white hover:text-[#84cc16]'
              }`}>
                Tour Packages
                {!isScrolled && (
                  <div className="absolute bottom-[-16px] left-0 w-full h-[2px] bg-[#84cc16] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </a>
              <div className="relative group">
                <button 
                  className={`flex items-center py-2 relative group ${
                    isScrolled ? 'text-gray-900 hover:text-[#84cc16]' : 'text-white hover:text-[#84cc16]'
                  }`}
                  onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                  onBlur={() => setTimeout(() => setPagesDropdownOpen(false), 200)}
                >
                  Listing <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${pagesDropdownOpen ? 'rotate-180' : ''}`} />
                  {!isScrolled && (
                    <div className="absolute bottom-[-16px] left-0 w-full h-[2px] bg-[#84cc16] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
                {/* Dropdown Menu */}
                {pagesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#84cc16]">
                      List you Hotel
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#84cc16]">
                      List you Holiday Home
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#84cc16]">
                      List Tour Packages
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-[#84cc16]">
                      List your Vehicle
                    </a>
                  </div>
                )}
              </div>
              <a href="#" className={`relative group py-2 ${
                isScrolled ? 'text-gray-900 hover:text-[#84cc16]' : 'text-white hover:text-[#84cc16]'
              }`}>
                Vehicle on Rent
                {!isScrolled && (
                  <div className="absolute bottom-[-16px] left-0 w-full h-[2px] bg-[#84cc16] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </a>
              <a href="#" className="bg-[#84cc16] text-white px-6 py-2 rounded-full hover:bg-[#65a30d] transition-colors">
                Register
              </a>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg mt-0 border-t border-gray-100">
                <div className="container mx-auto px-4 py-3">
                  <div className="flex flex-col space-y-3">
                    <a href="#" className="text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                      Home
                    </a>
                    <a href="#" className="text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                      Holiday Destinations
                    </a>
                    <a href="#" className="text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                      Hotels
                    </a>
                    <a href="#" className="text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                      Holiday Home
                    </a>
                    <a href="#" className="text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                      Tour Packages
                    </a>
                    
                    {/* Mobile Listing Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                        className="flex items-center justify-between w-full text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2"
                      >
                        <span>Listing</span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${pagesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {pagesDropdownOpen && (
                        <div className="pl-4 mt-2 space-y-2">
                          <a href="#" className="block text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                            List you Hotel
                          </a>
                          <a href="#" className="block text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                            List you Holiday Home
                          </a>
                          <a href="#" className="block text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                            List Tour Packages
                          </a>
                          <a href="#" className="block text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                            List your Vehicle
                          </a>
                        </div>
                      )}
                    </div>

                    <a href="#" className="text-gray-900 hover:text-[#84cc16] transition-colors duration-300 py-2">
                      Vehicle on Rent
                    </a>
                    <a href="#" className="bg-[#84cc16] text-white px-6 py-2 rounded-full hover:bg-[#65a30d] transition-colors duration-300 text-center mt-2">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;