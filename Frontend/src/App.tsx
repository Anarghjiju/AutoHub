import React from 'react';
import './styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProtectedRoute from './UserProtectedRoute';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import BrandListing from './pages/BrandListing';
import CarDetail from './pages/CarDetailsPage';
import CarListing from './pages/CarExplorePage';
import CarsInBrand from './pages/CarsInBrand';
import SellUsedCar from './pages/SellUsedCar';
import UsedCarListingPage from './pages/UsedCarListingPage';
import UsedCarDetailsPage from './pages/UsedCarDetailsPage';
import ProfilePage from './pages/ProfilePage';
import BookAService from './pages/BookAService';
// import ServiceListPage from './pages/ServiceListPage';
import SelectedProvider from './pages/SelectedProvider';
import BookingConfirmPage from './pages/BookingConfirmPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/brands" element={<BrandListing />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/detail/:id" element={<CarDetail />} />
        <Route path="/cars/:name" element={<CarsInBrand />} />
        <Route path="/buy" element={<UsedCarListingPage />} />
        <Route path="/usedcar/:id" element={<UsedCarDetailsPage />} />

        {/* Protected Routes */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/service" element={<BookAService />} />
          {/* <Route path="/servicelist/:make" element={<ServiceListPage />} /> */}
          <Route path="/provider/:make/:location" element={<SelectedProvider />} />
          <Route path="/bookingConfirm" element={<BookingConfirmPage />} />
          <Route path="/sell" element={<SellUsedCar />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
