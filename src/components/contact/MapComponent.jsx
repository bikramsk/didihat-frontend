import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const MapComponent = () => {
 
  const latitude = 29.800701;
  const longitude = 80.246072;
  
  const mapSrc = `https://maps.google.com/maps?width=100%25&height=400&hl=en&q=${latitude},${longitude}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-[#003B95] to-[#4F8CE5] text-white">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-6 h-6" />
          <h2 className="text-xl md:text-2xl font-bold">Find Us Here</h2>
        </div>
        <p className="text-blue-100">
          Located in the heart of Didihat, Uttarakhand - Your gateway to the Himalayas
        </p>
      </div>
      
      <div className="relative">
        <iframe 
          src={mapSrc}
          width="100%" 
          height="400" 
          allowFullScreen={true}
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0"
          title="Didihat.com Location - Didihat, Uttarakhand"
        />
        
       
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="bg-[#003B95] text-white p-2 rounded-lg flex-shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Didihat.com Office
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Didihat, Uttarakhand 263601, India
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-[#003B95] text-white px-3 py-1 rounded-full text-xs hover:bg-[#002D70] transition-colors"
                >
                  <Navigation className="w-3 h-3" />
                  Get Directions
                </a>
                <a
                  href={`https://maps.google.com/?q=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border border-[#003B95] text-[#003B95] px-3 py-1 rounded-full text-xs hover:bg-[#003B95] hover:text-white transition-colors"
                >
                  <MapPin className="w-3 h-3" />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* location info */}
      <div className="p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-[#003B95] font-semibold mb-1">Distance from Delhi</div>
            <div className="text-gray-600">~350 km (7-8 hours drive)</div>
          </div>
          <div className="text-center">
            <div className="text-[#003B95] font-semibold mb-1">Nearest Airport</div>
            <div className="text-gray-600">Pantnagar (127 km)</div>
          </div>
          <div className="text-center">
            <div className="text-[#003B95] font-semibold mb-1">Nearest Railway</div>
            <div className="text-gray-600">Kathgodam (90 km)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;