import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layout/Layout'
import AttractionsPage from './pages/attractions/AttractionsPage'
import StaysPage from './pages/stays/StaysPage'
import StayDetail from './pages/stays/components/StayDetail/StayDetail'
import AttractionDetails from './pages/attractions/components/AttractionDetails/AttractionDetails.jsx'
import AttractionBooking from './pages/attractions/components/AttractionBooking/AttractionBooking';
import TourPackages from './pages/tour-packages/TourPackages';
import TourPackageDetails from './pages/tour-packages/components/TourPackageDetails/TourPackageDetails';
import TourPackageBooking from './pages/tour-packages/components/TourPackageBooking/TourPackageBooking';
import CarRentalsPage from './pages/car-rentals/CarRentalsPage';
import CarRentalDetailsPage from './pages/car-rentals/components/CarRentalDetailsPage';
import CarRentalBookingPage from './pages/car-rentals/components/CarRentalBookingPage';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import CartPage from './pages/cart/CartPage';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import AdvertiseWithUs from './pages/AdvertiseWithUs';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stays" element={<StaysPage />} />
        <Route path="/stays/:id" element={<StayDetail />} />
        <Route path="/attractions" element={<Attractions />} />
      </Routes>
    </Layout>
  )
}

export default App