// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <Link to="/" className="logo me-auto">AutoHub</Link> {/* Update this line */}
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link" to="#buy">Buy Car</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#sell">Sell Car</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#service">Service</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cars">Explore Cars</Link> {/* Update this line */}
          </li>
        </ul>
        <div className="profile-icon ms-auto">👤</div>
      </div>
    </nav>
  );
};

export default Navbar;
