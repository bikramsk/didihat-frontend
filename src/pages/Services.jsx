import React from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "List your Hotel",
      description: "Partner with us to showcase your hotel to thousands of travelers"
    },
    {
      title: "List your Holiday Home",
      description: "Rent out your vacation property and earn extra income"
    },
    {
      title: "List your Tour Package",
      description: "Promote your tour packages to adventure seekers"
    },
    {
      title: "List your Vehicle",
      description: "Offer your vehicle for rent to travelers"
    },
    {
      title: "Tour Guide Services",
      description: "Join our network of professional tour guides"
    },
    {
      title: "Travel Agent Partnership",
      description: "Become a certified travel agent with DIDIHAT"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - DIDIHAT</title>
        <meta name="description" content="Partner with DIDIHAT to list your hotel, holiday home, tour packages, vehicles and more. Contact us to get started." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
     
        <div className="bg-gray-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold my-8">
                Partner With DIDIHAT
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                Join our growing network of partners and expand your business reach. 
                We help you connect with travelers from around the world.
              </p>
            </div>
          </div>
        </div>

       
        <div className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Partnership Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore the various ways you can partner with us to grow your business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#003B95] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 text-lg">
                  Contact us today to learn more about our partnership opportunities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                    <h4 className="font-semibold text-gray-900">Support</h4>
                    <p className="text-gray-600">24/7 Customer Support</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a 
                  href="mailto:contactus@didihat.com"
                  className="inline-flex items-center px-8 py-3 bg-[#003B95] text-white rounded-full hover:bg-[#002D70] transition-colors duration-300 font-medium"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;