import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';

const AboutMission = () => {
  const missions = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide exceptional travel experiences that connect people with the natural beauty and rich culture of Uttarakhand and India, while promoting sustainable tourism practices."
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To become the leading travel platform that makes exploring India accessible, memorable, and meaningful for every traveler, fostering cultural exchange and environmental consciousness."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "We believe in authentic experiences, sustainable tourism, customer satisfaction, and supporting local communities while preserving the natural heritage of our destinations."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase tracking-wider">Our Purpose</span>
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Driven by Purpose, Guided by Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At DIDIHAT, we're more than just a travel company. We're passionate about creating meaningful connections between travelers and destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missions.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-[#003B95] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#002D70] transition-colors duration-300">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;