import React from 'react';

import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import CarByBrandListing from '../components/CarByBrandListing'; // Make sure you import the correct component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/CarListingPage.css'
import { useParams } from 'react-router-dom';

const CarListingPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
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
            <CarByBrandListing name={name}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;