import React from 'react';
import { Helmet } from 'react-helmet';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import MapComponent from '../components/contact/MapComponent';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Didihat.com | Get in Touch</title>
        <meta name="description" content="Contact Didihat.com for all your travel needs in Uttarakhand. We're here to help you plan your perfect trip to the Himalayas." />
        <meta name="keywords" content="contact didihat, uttarakhand travel contact, Didihat contact, himalayan travel support" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white py-20 md:py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 text-center mt-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Ready to explore the beauty of Uttarakhand? We're here to help you plan your perfect journey to the Himalayas.
            </p>
            
           
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Phone className="w-5 h-5" />
                <span className="text-sm md:text-base">+91 9410116800</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Mail className="w-5 h-5" />
                <span className="text-sm md:text-base">contact@didihat.com</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="w-5 h-5" />
                <span className="text-sm md:text-base">Didihat, Uttarakhand</span>
              </div>
            </div>
          </div>
        </div>

   
        <div className="container mx-auto px-4 py-16 md:py-20">
         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        
            <div>
              <ContactForm />
            </div>
            
          
            <div>
              <ContactInfo />
            </div>
          </div>

      
          <div className="mb-16">
            <MapComponent />
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Plan Your Uttarakhand Adventure
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From the spiritual ghats of Rishikesh to the snow-capped peaks of the Himalayas, 
                we help you discover the incredible beauty and culture of Uttarakhand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-[#003B95] mb-2">500+</div>
                <div className="text-gray-600">Happy Travelers</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-600">Destinations</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-gray-600">Tour Packages</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;