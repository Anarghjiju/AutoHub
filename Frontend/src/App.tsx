// src/App.tsx
import React from 'react';
import './styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CarBrandListing from './pages/CarBrandListing';
import CarDetail from './pages/CarDetailsPage'
import CarListing from './pages/CarExplorePage';
import BrandCarList from './pages/BrandCarList'
import SellUsedCar from './pages/sellUsedCar';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/brands" element={<CarBrandListing />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/detail" element={<CarDetail />} />
        <Route path="/cars/:name" element={<BrandCarList />} />
        <Route path="/sell" element={<SellUsedCar />} />
        <Route path="/cars/:name" element={<BrandCarList  />} />
      </Routes>
    </Router>
  );
};

export default App;
