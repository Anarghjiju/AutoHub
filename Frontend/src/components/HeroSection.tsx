import React from 'react';
import carimage from '../assets/carimage.png';
import { Link } from 'react-router-dom';
import { useUserContext } from '../UserContext';

const HeroSection: React.FC = () => {
  const { user } = useUserContext(); // Access the user from context

  return (
    <div className="hero-section">
      <img src={carimage} alt="Car Image" className="hero-image" />
      <div className="hero-text">
        <h1>AutoHUB</h1>
        <p>Find Best Deals For your Car</p>
      </div>
      {!user && ( // Only show buttons if user is not logged in
        <div className="hero-buttons">
          <Link to="/login">
            <button className="primary-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="secondary-button">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
