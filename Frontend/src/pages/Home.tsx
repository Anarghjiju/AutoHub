import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ShopByBrands from '../components/ShopByBrands';
import FeaturedCars from '../components/FeaturedCars';
import Footer from '../components/FooterSection';
import '../styles/styles.css';
const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ShopByBrands />
      <FeaturedCars />
      <Footer />
    </div>
  );
};

export default Home;
