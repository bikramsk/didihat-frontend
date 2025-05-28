import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
   
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
       
          <div className="sm:col-span-2 lg:col-span-1">
            {/* <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-2">DIDIHAT.com</h3> */}
            <Link to="/" className="transition-colors duration-300 ">
              <img 
                src="/didihat-logo.png" 
                alt="Didihat.com Logo" 
                className="h-12 brightness-0 invert mb-2"
                
              />
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">
              Travel the way you want
            </p>
            <div className="mb-6">
              <h4 className="text-base md:text-lg font-semibold mb-3">Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003B95] transition-all duration-300 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#003B95] text-white rounded-lg hover:bg-[#002D70] transition-colors duration-300 flex items-center justify-center gap-2 group text-sm font-medium"
                >
                  Subscribe to Updates
                  <Send size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Agra
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Delhi
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Varansai
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Rishikesh
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Kerala
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  List your Hotel
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  List your Holiday Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  List your Tour Package
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  List your Vehicle
                </Link>
              </li>
              <li>
                <Link to="/tour-guides" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Tour Guide
                </Link>
              </li>
              <li>
                <Link to="/travel-agents" className="text-gray-400 flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Travel Agent
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#003B95] mr-2.5 flex-shrink-0" />
                <span>Uttarakhand, India</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-[#003B95] mr-2.5 flex-shrink-0" />
                <span>+91 9410116800</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#003B95] mr-2.5 flex-shrink-0" />
                <span>contact@didihat.com</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Clock className="w-4 h-4 text-[#003B95] mr-2.5 flex-shrink-0" />
                <span>24/7 Customer Support</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/contact" className="inline-flex items-center px-6 py-2.5 bg-[#003B95] text-white rounded-full hover:bg-[#002D70] transition-colors text-sm font-medium">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
              <Link to="/" className="text-gray-400">
                Home
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link to="/about" className="text-gray-400 ">
                About Us
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link to="/privacy-policy" className="text-gray-400">
                Privacy Policy
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link to="/terms" className="text-gray-400">
                Terms & Conditions
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link to="/advertise" className="text-gray-400 ">
                Advertise With Us
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link to="/feedback" className="text-gray-400 ">
                Feedback
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link to="/contact" className="text-gray-400 ">
                Contact
              </Link>
            </div>
            <p className="text-gray-400 text-xs md:text-sm text-center">
              © {new Date().getFullYear()} DIDIHAT. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 