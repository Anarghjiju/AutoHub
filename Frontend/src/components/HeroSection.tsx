import React from 'react';
import carimage from '../assets/carimage.png'

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <img src={carimage} alt="Car Image" className="hero-image" />
      <div className="hero-text">
        <h1>AutoHUB</h1>
        <p>Find Best Deals For your Car</p>
      </div>
      <div className="hero-buttons">
        <button className="primary-button">Order Now</button>
        <button className="secondary-button">Demo Drive</button>
      </div>
    </div>
  );
};

export default HeroSection;
