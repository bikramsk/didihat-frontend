import React from 'react';
import { MapPin, Mail, Phone, Clock, Globe } from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Our Location",
      details: ["Didihat, Uttarakhand, India"],
      color: "text-blue-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Numbers",
      details: ["+91 9410116800"],
      color: "text-green-600",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Address",
      details: ["contact@didihat.com"],
      color: "text-purple-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
                "Mon–Fri: 9 AM – 6 PM",
                "Sat–Sun: 10 AM – 4 PM"
                ],
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Get in Touch
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          We're here to help you plan your perfect trip to Uttarakhand. Reach out through any of these channels.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-gray-200 rounded-xl">
        {contactDetails.map((item, index) => (
          <div
            key={index}
            className="p-5 "
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-md bg-gray-100 ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-[#003B95] to-[#4F8CE5] rounded-2xl p-6 text-white mt-10">
        <div className="flex items-center gap-3 mb-5">
          <Globe className="w-6 h-6" />
          <h3 className="text-xl font-semibold">
            Why Choose Didihat.com?
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 text-sm">
          {[
            "Local Expertise",
            "24/7 Customer Support",
            "Best Price Guarantee",
            "Authentic Experiences",
            "Trusted by Thousands",
            "Easy Booking Process",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
