import React from 'react';
import carimage from '../assets/carimage.png'
import { Link } from 'react-router-dom';


const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <img src={carimage} alt="Car Image" className="hero-image" />
      <div className="hero-text">
        <h1>AutoHUB</h1>
        <p>Find Best Deals For your Car</p>
      </div>
      <div className="hero-buttons">
        <Link to="/login"><button className="primary-button" >Login</button></Link>
        <Link to="/register"><button className="secondary-button">Sign Up</button></Link>
      </div>
    </div>
  );
};

export default HeroSection;
