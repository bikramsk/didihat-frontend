import React from 'react';
import { Helmet } from 'react-helmet';
import { Plane, Hotel, MapPin, Camera, Users, TrendingUp, Mail, Phone, Clock, Building } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm';

const AdvertiseWithUs = () => {
  const advertisingBenefits = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Travel-Focused Audience",
      description: "Connect with active travelers planning trips to Uttarakhand and across India."
    },
    {
      icon: <Hotel className="w-8 h-8" />,
      title: "Hotel & Accommodation Partners",
      description: "Perfect platform for hotels, resorts, homestays, and guesthouses to reach guests."
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Tourism Promotion",
      description: "Promote destinations, attractions, and local experiences to interested travelers."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Increase Bookings",
      description: "Drive direct bookings and increase revenue for your travel business."
    }
  ];

  const advertisingOptions = [
    {
      title: "Hotel Promotion",
      description: "Feature your hotel, resort, or accommodation prominently in search results and destination pages."
    },
    {
      title: "Tour Package Advertising",
      description: "Promote your tour packages, trekking expeditions, and adventure activities to adventure seekers."
    },
    {
      title: "Destination Marketing",
      description: "Showcase your destination, local attractions, and cultural experiences to potential visitors."
    },
    {
      title: "Transport Service Ads",
      description: "Advertise your taxi services, car rentals, and transportation options for travelers."
    },
    {
      title: "Travel Agency Partnership",
      description: "Partner with us to promote your travel agency services and custom itineraries."
    },
    {
      title: "Local Business Promotion",
      description: "Promote restaurants, shops, guides, and local services to visiting tourists."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Advertise With Us - DIDIHAT</title>
        <meta name="description" content="Partner with DIDIHAT to advertise your travel business. Reach thousands of travelers and boost your bookings with our advertising solutions." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
     
        <div className="bg-gray-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Plane className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Promote Your Travel Business
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                Partner with DIDIHAT to showcase your hotels, tour packages, and travel services. 
                Reach thousands of travelers exploring Uttarakhand and planning their perfect getaway.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Choose DIDIHAT for Travel Advertising?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect with travelers who are actively searching for accommodations, experiences, and services in your area
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {advertisingBenefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100"
                >
                  <div className="w-16 h-16 bg-[#003B95] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advertising */}
        <div className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Travel Industry Advertising Solutions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Specialized advertising options designed for hotels, tour operators, travel agencies, and local businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {advertisingOptions.map((option, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300 border border-gray-200"
                >
                  <div className="w-12 h-12 bg-[#003B95] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Get Started Today
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ready to advertise with us? Send us a message and our team will get back to you with a customized advertising solution.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <p className="text-gray-600 mb-8">
                  Our travel marketing team specializes in promoting hotels, tour packages, and travel services. Let us help you reach more travelers.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#003B95] rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email Us</h4>
                      <a 
                        href="mailto:contactus@didihat.com" 
                        className="text-[#003B95] hover:underline"
                      >
                        contactus@didihat.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#003B95] rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Call Us</h4>
                      <a 
                        href="tel:+919410116800" 
                        className="text-[#003B95] hover:underline"
                      >
                        +91 9410116800
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#003B95] rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Location</h4>
                      <p className="text-gray-600">Didihat(UK), India</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#003B95] rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-gray-600">24/7 Support Available</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Travel Industry Expertise</h4>
                  <p className="text-sm text-gray-600">
                    We understand the travel industry and will help you create campaigns that attract the right travelers to your business. 
                    Response within 24 hours guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertiseWithUs;