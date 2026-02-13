import React from 'react';
import { Helmet } from 'react-helmet';
import TermsHero from '../components/sections/TermsHero';
import TermsContent from '../components/sections/TermsContent';

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - DIDIHAT Travel & Tourism</title>
        <meta name="description" content="Read DIDIHAT's Terms & Conditions to understand the rules and guidelines for using our travel booking services." />
      </Helmet>
      <TermsHero />
      <TermsContent />
    </>
  );
};

export default TermsAndConditions;