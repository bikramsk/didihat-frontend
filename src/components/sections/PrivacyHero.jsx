import React from 'react';

const PrivacyHero = () => {
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
            Privacy Policy
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          
          <div className="text-gray-400 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyHero;