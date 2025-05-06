import { Helmet } from 'react-helmet';
import HeroSection from '../components/sections/HeroSection';
import OurServices from '../components/sections/OurServices';
import PopularDestinations from '../components/sections/PopularDestinations';
import HolidayHomes from '../components/sections/HolidayHomes';
import FeaturedHotels from '../components/sections/FeaturedHotels';
import BookingSteps from '../components/sections/BookingSteps';
import ChooseSection from '../components/sections/ChooseSection';
import AwesomePackages from '../components/sections/AwesomePackages';
import Testimonials from '../components/sections/Testimonials';
import PropertyTypes from '../components/sections/PropertyTypes';
import ExploreIndia from '../components/sections/ExploreIndia';
import UniqueProperties from '../components/sections/UniqueProperties';

const Home = () => {
  return (
   <>
      <Helmet>
        <title>DIDIHAT - Travel & Tourism</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <HeroSection />
      <OurServices />
      <PropertyTypes />
      <PopularDestinations />   
      <ExploreIndia />
     <HolidayHomes />
      <FeaturedHotels />
      <UniqueProperties />
      <AwesomePackages />
      <BookingSteps />
      <ChooseSection />      
      <Testimonials />
    </>
  );
};

export default Home;
