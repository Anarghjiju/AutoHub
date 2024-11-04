import React from 'react';

import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebarused';
import CarByBrandListing from '../components/CarInBrandListing'; // Make sure you import the correct component
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
          {/* Main Content */}
          <div >
            <CarByBrandListing name={name}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;