// src/App.tsx
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/Herosection';
import ShopByBrands from './components/ShopByBrands';
import FeaturedCars from './components/FeaturedCars';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ShopByBrands />
      <FeaturedCars />
    </div>
  );
};

export default App;
