// src/pages/CarListingPage.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/CarListingPage.css'
import UsedCarListing from '../components/UsedCarListing';

const UsedCarListingPage: React.FC = () => {
  
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <FilterSidebar />
          </div>

          <div className="col-md-9">
            <UsedCarListing/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedCarListingPage;
