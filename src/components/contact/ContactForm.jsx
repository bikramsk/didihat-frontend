import React, { useState } from 'react';
import { Send, User, Mail, Shield } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [userCaptchaAnswer, setUserCaptchaAnswer] = useState('');
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

 
  React.useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion(`${num1} + ${num2} = ?`);
    setCaptchaAnswer(num1 + num2);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value;
    setUserCaptchaAnswer(value);
    setCaptchaVerified(parseInt(value) === captchaAnswer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    if (!captchaVerified) {
      setSubmitStatus({ type: 'error', message: 'Please solve the captcha correctly' });
      return;
    }

    setIsSubmitting(true);

    try {
      const { EmailService } = await import('../../pages/email/emailService');
      await EmailService.sendContactEmail(formData);

      setSubmitStatus({ type: 'success', message: 'Thank you for your message. We will get back to you soon!' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setUserCaptchaAnswer('');
      setCaptchaVerified(false);

      
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      setCaptchaQuestion(`${num1} + ${num2} = ?`);
      setCaptchaAnswer(num1 + num2);


      setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);

    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Send us a Message
        </h2>
        <p className="text-gray-600">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          </div>

      
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>

          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
              placeholder="Enter message subject"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
              placeholder="Enter your message here..."
            />
          </div>
        </div>

        {/* Captcha */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-2">
            Security Verification *
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="text-gray-400 w-5 h-5" />
              <span className="text-lg font-mono bg-white px-3 py-2 rounded border">
                {captchaQuestion}
              </span>
            </div>
            <input
              type="number"
              id="captcha"
              value={userCaptchaAnswer}
              onChange={handleCaptchaChange}
              required
              className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent"
              placeholder="Answer"
            />

            {captchaVerified && (
              <span className="text-green-600 text-sm">✓ Verified</span>
            )}
          </div>
        </div>

        
        <button
          type="submit"
          disabled={isSubmitting || !captchaVerified}
          className="w-full bg-[#003B95] text-white py-3 px-6 rounded-lg hover:bg-[#002D70] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 font-medium"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-5 h-5" />
            </>
          )}
        </button>

        {submitStatus.message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium animate-in fade-in duration-300 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
            {submitStatus.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;