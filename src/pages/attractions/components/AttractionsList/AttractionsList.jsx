import React from 'react';
import { Star, MapPin, Clock, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const AttractionsList = ({ attractions }) => {
  return (
    <div className="space-y-4">
      {attractions.map(attraction => (
        <div key={attraction.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex">
            <div className="w-72 h-48 relative">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {attraction.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{attraction.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {attraction.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{attraction.duration}</span>
                    </div>
                    {attraction.freeCancel && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span>Free cancellation</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{attraction.rating}</span>
                    <span className="text-gray-500">({attraction.reviews} reviews)</span>
                  </div>
                  {attraction.originalPrice && (
                    <span className="text-gray-500 line-through">₹{attraction.originalPrice}</span>
                  )}
                  <div className="text-2xl font-bold text-gray-900">₹{attraction.price}</div>
                  <div className="text-sm text-gray-500">
                    Available: {attraction.availability}
                  </div>
                  <Link
                    to={`/attraction/${attraction.attributes.slug}`}
                    className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    See availability
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttractionsList; 