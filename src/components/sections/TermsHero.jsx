import React from 'react';

const TermsHero = () => {
  return (
    <section className="bg-gray-900 pt-36 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-white"></div>
            <span className="text-white text-sm font-medium uppercase tracking-wider">Legal</span>
            <div className="h-[1px] w-12 bg-white"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Terms & Conditions
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our travel booking services.
          </p>
          
          <div className="text-gray-400 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsHero;