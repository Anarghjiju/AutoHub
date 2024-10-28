import React from 'react';
import carimage from '../assets/carimage.jpg'

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <img src = {carimage} alt="Car Banner" className="image" />
      <div className="content">
        <h2>Welcome to MyWebsite</h2>
        <p>Discover the best deals for your dream car</p>
        <div className="buttons">
          <button className="loginButton">Login</button>
          <button className="signupButton">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
