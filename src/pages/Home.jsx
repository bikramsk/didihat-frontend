import { Helmet } from 'react-helmet';
import HeroSection from '../components/sections/HeroSection';
import OurServices from '../components/sections/OurServices';
import PopularDestinations from '../components/sections/PopularDestinations';
import HolidayHomes from '../components/sections/HolidayHomes';
import FeaturedHotels from '../components/sections/FeaturedHotels';
import BookingSteps from '../components/sections/BookingSteps';
import AboutSection from '../components/sections/AboutSection';
import ChooseSection from '../components/sections/ChooseSection';
import AwesomePackages from '../components/sections/AwesomePackages';
import Testimonials from '../components/sections/Testimonials';

const Home = () => {
  return (
   <>
      <Helmet>
        <title>DIDIHAT - Travel & Tourism</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <HeroSection />
      <OurServices />
      <PopularDestinations />   
      <HolidayHomes />
      <FeaturedHotels />
      <BookingSteps />
      <AboutSection />
      <ChooseSection />
      <AwesomePackages />
      <Testimonials />
    </>
  );
};

export default Home;
