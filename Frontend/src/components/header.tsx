import React from 'react';
import profileimg from '../assets/profile.jpg'
const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>AutoHub</h1>
      <nav className="nav">
        <a href="#buycar">Buy Car</a>
        <a href="#sellcar">Sell Car</a>
        <a href="#service">Service</a>
        <a href="#explorecar">Explore Car</a>
      </nav>
      <img src={profileimg} alt="Profile Icon" className="profileIcon" />
    </header>
  );
};

export default Header;
