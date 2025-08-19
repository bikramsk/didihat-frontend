import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const resetCode = searchParams.get('code');
    if (resetCode) setCode(resetCode);
    else setMessage('Invalid reset link.');
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:1350/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation: confirm,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Password Updated. Login to continue');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage(data.error?.message || 'Reset failed');
      }
    } catch {
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003B95] to-[#4F8CE5] flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img
              src="/didihat-logo.png"
              alt="Didihat.com Logo"
              className="h-16 mx-auto brightness-0 invert"
            />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2 font-logo">Reset Your Password</h2>
          <p className="text-blue-100">Enter your new password to secure your account</p>
        </div>

        {/* Reset Password Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent transition-all"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#003B95] text-white font-medium rounded-lg hover:bg-[#002D70] focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:ring-offset-2 transition-all duration-300 shadow-lg"
            >
              Reset Password
            </button>

            {message && (
              <div className={`p-4 rounded-lg text-sm text-center ${
                message.includes('Updated') || message.includes('changed') || message.includes('success') || message.toLowerCase().includes('password updated')
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-[#003B95] hover:text-[#4F8CE5] font-medium transition-colors"
            >
              ← Back to Didihat.com
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-blue-100 text-sm">
            Travel the way you want with Didihat.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
