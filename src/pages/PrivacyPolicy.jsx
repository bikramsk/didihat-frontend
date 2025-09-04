import React from 'react';
import { Helmet } from 'react-helmet';
import PrivacyHero from '../components/sections/PrivacyHero';
import PrivacyContent from '../components/sections/PrivacyContent';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - DIDIHAT Travel & Tourism</title>
        <meta name="description" content="Read DIDIHAT's Privacy Policy to understand how we collect, use, and protect your personal information." />
      </Helmet>
      <PrivacyHero />
      <PrivacyContent />
    </>
  );
};

export default PrivacyPolicy;