// src/pages/CarListingPage.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import Listing from '../components/Listing';

const CarListingPage: React.FC = () => {
  return (
    <div>
      {/* Main Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 filter-sidebar">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="col-md-9 listing-content">
            <Listing />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;
