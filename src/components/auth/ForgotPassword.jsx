import React, { useState } from 'react';
import { X } from 'lucide-react';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    setIsSuccess(false);


  //  const API_URL = import.meta.env.MODE === "production"
  // ? "https://admin.didihat.com"
  // : "http://localhost:1350";
  const API_URL = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;

try {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();


      if (res.ok) {
        setIsSuccess(true);
        setMessage('Password reset link sent to your email! Please check your inbox.');
        
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        const errorMessage = data.error?.message || data.message || `Failed to send email (${res.status})`;
        setMessage(` ${errorMessage}`);

      }
    } catch (err) {
      setMessage(' Network error. Please try again.');

    } finally {
      setIsLoading(false);
    }
  };

  return (


    <div className="relative p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      {/* Close */}
      <button
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </button>

      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Forgot Password</h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
          disabled={isLoading || isSuccess}
        />

        <button
          type="button"
          disabled={isLoading || isSuccess}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            isLoading || isSuccess
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#003B95] hover:bg-[#002D70]'
          } text-white`}
        >
          {isLoading ? 'Sending...' : isSuccess ? 'Sent!' : 'Send Reset Link'}
        </button>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
            isSuccess
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-3 py-2 text-[#003B95] hover:text-[#4F8CE5] text-sm font-medium"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
