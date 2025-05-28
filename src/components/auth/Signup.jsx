import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, X } from 'lucide-react';

const Signup = ({ onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Signup data:', formData);
  };

  const handleSwitchToLogin = () => {
    onClose();
    onSwitchToLogin();
  };

  return (
    <div className="flex w-full relative h-[550px] md:h-[550px] rounded-lg overflow-hidden">
      {/* Close Button */}
      <button 
        className="absolute right-2 top-2 md:right-4 md:top-4 text-gray-400 hover:text-gray-600 z-10"
        onClick={onClose}
      >
        <X className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Left Section - Image and Brand */}
       <div className="hidden lg:flex lg:w-2/5 relative">
        <div className="absolute inset-0">
          <img
            src="/images/test.jpg"
            alt="Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/30"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center w-full pt-8">
        
       <div className="relative z-10 flex flex-col items-center w-full pt-8">
          <div className="backdrop-blur-sm bg-white/50 p-4 rounded-lg border border-black/30 mx-6">
        
            <img 
              src="/didihat-logo.png" 
              alt="Didihat.com Logo" 
              className="h-12"
            />
            <p className="text-base font-light tracking-wide text-white text-center">
              Travel the way you want
            </p>
          </div>
        </div>
        </div>
      </div> 
      

      {/* Right Section - Signup Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-3 md:p-6 bg-white">
        <div className="w-full max-w-lg">
          <div className="text-center mb-2 md:mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
              Create an account
            </h2>
            {/* <p className="text-xs md:text-sm text-gray-600">
              Join us to explore 
            </p> */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
            {/* Full Name Input */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#003B95]" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
                  placeholder="Full name"
                />
              </div>
            </div>

            {/* Email and Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {/* Email Input */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#003B95]" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-[#003B95]" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>

            {/* Password and Confirm Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {/* Password Input */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#003B95]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-9 py-1.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#003B95]" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-9 py-1.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start mt-2">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="h-3 w-3 md:h-4 md:w-4 text-[#003B95] focus:ring-[#003B95] border-gray-300 rounded"
                />
              </div>
              <div className="ml-2">
                <label htmlFor="agreeToTerms" className="text-xs md:text-sm text-gray-700">
                  I agree to the{' '}
                  <button type="button" className="font-medium text-[#003B95] hover:text-[#65a30d]">
                    Terms
                  </button>
                  {' '}and{' '}
                  <button type="button" className="font-medium text-[#003B95] hover:text-[#65a30d]">
                    Privacy Policy
                  </button>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-1.5 md:py-2 border border-transparent rounded-lg shadow-sm text-xs md:text-sm font-medium text-white bg-[#003B95] hover:bg-[#002D70] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003B95] mt-2 md:mt-3"
            >
             CREATE ACCOUNT
            </button>

            {/* Login Link */}
            <p className="mt-2 md:mt-3 text-center text-xs md:text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={handleSwitchToLogin}
                className="font-medium text-[#003B95] hover:text-[#002D70]"
              >
                Sign In
              </button>
            </p>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 flex justify-center items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm bg-white text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003B95]"
            >
              <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="whitespace-nowrap">Google</span>
            </button>
            <button
              type="button"
              className="flex-1 flex justify-center items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm bg-white text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003B95]"
            >
              <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
              <span className="whitespace-nowrap">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 