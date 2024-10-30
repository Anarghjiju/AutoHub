// src/pages/CarDetailPage.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import CarImageGallery from '../components/CarImageGallery';
import CarDetails from '../components/CarDetails';
import '../styles/carDetail.css';
import { useLocation } from 'react-router-dom';

interface Car {
  _id: string;
  Make: string;
  Model: string;
  Variant: string;
  Ex_Showroom_Price: string;
  Fuel_Type: string;
  Power: string;
  Torque: string;
  Displacement: string;
  Fuel_Tank_Capacity: string;
  Type: string;
  Body_Type: string;
  Seating_Capacity: string;
  ARAI_Certified_Mileage: string;
  Length: string;
  Width: string;
  Height: string;
  Kerb_Weight: string;
  Ground_Clearance: string;
  Front_Brakes: string;
  Rear_Brakes: string;
  ABS: string;
}



const CarDetailPage: React.FC = () => {
  const { state } = useLocation();
  const car = state?.car as Car;

  if (!car) {
    return <p>No car found.</p>;
  }
  return (
    <div>
      <Navbar />
      <div className="car-detail-page">
        <CarImageGallery />
        <CarDetails car={car} />
      </div>
    </div>
  );
};

export default CarDetailPage;
