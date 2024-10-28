// src/components/Navbar.tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">AutoHub</div>
      <ul className="nav-links">
        <li><a href="#buy">Buy Car</a></li>
        <li><a href="#sell">Sell Car</a></li>
        <li><a href="#service">Service</a></li>
        <li><a href="#explore">Explore Cars</a></li>
      </ul>
      <div className="profile-icon">👤</div>
    </nav>
  );
};

export default Navbar;
