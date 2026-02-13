import React from 'react';
import { Users, MapPin, Star, Calendar } from 'lucide-react';

const AboutStats = () => {
  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Happy Travelers",
      description: "Satisfied customers who trusted us with their journey"
    },
    {
      icon: MapPin,
      number: "50+",
      label: "Destinations",
      description: "Carefully curated destinations across India"
    },
    {
      icon: Star,
      number: "4.8",
      label: "Average Rating",
      description: "Based on thousands of customer reviews"
    },
    {
      icon: Calendar,
      number: "5+",
      label: "Years Experience",
      description: "Years of expertise in travel and tourism"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
              <span className="text-[#003B95] text-sm font-medium uppercase tracking-wider">Our Impact</span>
              <div className="h-[1px] w-8 bg-[#003B95]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Numbers That Tell Our Story
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence is reflected in the trust our customers place in us and the experiences we've created together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#003B95] rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStats;