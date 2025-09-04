import React from 'react';
import { Helmet } from 'react-helmet';
import AboutHero from '../components/sections/AboutHero';
import AboutMission from '../components/sections/AboutMission';
import AboutTeam from '../components/sections/AboutTeam';
import AboutStats from '../components/sections/AboutStats';
import AboutValues from '../components/sections/AboutValues';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - DIDIHAT Travel & Tourism</title>
        <meta name="description" content="Learn about DIDIHAT - Your trusted partner for travel and tourism in Uttarakhand, India. Discover our mission, vision, and team." />
      </Helmet>
      <AboutHero />
      <AboutMission />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
    </>
  );
};

export default AboutUs;