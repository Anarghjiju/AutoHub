// src/pages/CarListingPage.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import Listing from '../components/CarListing'; // Make sure you import the correct component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/CarListingPage.css'

const CarListingPage: React.FC = () => {
  
  return (
    <div>
      {/* Main Navbar */}
      <Navbar />
      {/* Main Container */}
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <Listing />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;
