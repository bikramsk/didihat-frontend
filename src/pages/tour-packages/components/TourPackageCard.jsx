import React from 'react';
import { MapPin, Clock, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const TourPackageCard = ({ tourPackage }) => {
  const {
    name,
    image,
    location,
    duration,
    price,
    slug
  } = tourPackage;

  return (
    <Link to={`/tour-packages/booking/${slug}`} className="block group h-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
       
        <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

      
        <div className="p-4 flex flex-col flex-grow">
          {/* Location */}
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#003B95] flex-shrink-0" />
            <span className="text-sm font-medium text-gray-600 truncate">{location}</span>
          </div>

      
          <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#003B95] transition-colors line-clamp-2 min-h-[3.5rem]">
            {name}
          </h3>

          {/* Details */}
          <div className="space-y-2 mb-4 flex-grow">
            {duration && (
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm truncate">{duration}</span>
              </div>
            )}
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between gap-4 mt-auto">
            <div className="text-[#003B95] font-semibold whitespace-nowrap">
              ₹{price.toLocaleString('en-IN')}
            </div>
            <button className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
              See availability
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourPackageCard; 