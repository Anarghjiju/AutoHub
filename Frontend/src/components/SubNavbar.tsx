// src/components/SubNavbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="sub-navbar d-flex justify-content-between align-items-center p-3 mb-3">
      {/* Back to Home Button */}
      <button className="btn btn-primary" onClick={handleBackClick}>
        Back to Home
      </button>

      {/* Center Heading */}
      {/* <h4 className="mb-0">Car Listings</h4> */}

      {/* Search Bar */}
      <form className="d-flex">
        <input
          type="search"
          className="form-control"
          placeholder="Search cars..."
          aria-label="Search"
        />
      </form>
    </div>
  );
};

export default SubNavbar;
