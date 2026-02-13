import React from 'react';

const AboutHero = () => {
  return (
    <section className="relative bg-gray-900 pt-36 pb-16 overflow-hidden">
      
   <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-white"></div>
            <span className="text-white text-sm font-medium uppercase tracking-wider">About DIDIHAT</span>
            <div className="h-[1px] w-12 bg-white"></div>
          </div>
          
         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight whitespace-nowrap">
  Your Gateway to <span className="text-[#4F8CE5]">Incredible India</span>
</h1>

          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover the beauty of Uttarakhand and beyond with DIDIHAT - your trusted travel companion since our inception.
          </p>
          
          
        </div>
      </div>
    </section>
  );
};

export default AboutHero;