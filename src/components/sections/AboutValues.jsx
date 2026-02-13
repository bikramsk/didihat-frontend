import React from 'react';
import { Shield, Leaf, Handshake, Award } from 'lucide-react';

const AboutValues = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Your safety and security are our top priorities. We ensure all our partners meet the highest standards of service and safety."
    },
    {
      icon: Leaf,
      title: "Sustainable Tourism",
      description: "We promote eco-friendly travel practices that preserve natural beauty and support local communities for future generations."
    },
    {
      icon: Handshake,
      title: "Local Partnerships",
      description: "We work closely with local businesses and communities to provide authentic experiences while supporting the local economy."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We maintain the highest standards of service quality, ensuring every aspect of your journey exceeds expectations."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase tracking-wider">What We Stand For</span>
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape the experiences we create for our travelers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex gap-6 p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#003B95] rounded-lg flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValues;