// src/components/UsedCarDetails.tsx
import React from 'react';

interface Image {
  publicId: string;
  url: string;
}

interface Car {
  _id: string;
  make: string;
  carModel: string;
  year: number;
  kmsDriven: number;
  price: number;
  description: string;
  verified: boolean;
  listed: boolean;
  isSold:boolean;
  images: Image[];
}

interface UsedCarDetailsProps {
  car: Car;
}

const UsedCarDetails: React.FC<UsedCarDetailsProps> = ({ car }) => {
  return (
    <div className="car-info">
      <header className="car-detail-header">
        <h1>{car.carModel}</h1>
        <h3>{car.make}</h3>
      </header>

      <div className="car-detail-content">
        <h2>Vehicle Details</h2>
        <ul>
          <li><strong>Price:</strong> Rs. {car.price}</li>
          <li><strong>Description:</strong> {car.description}</li>
          <li><strong>KMs Driven:</strong> </li>
          <p>{car.kmsDriven} Km</p>
          <li><strong>Year:</strong></li>
          <p> {car.year}</p>
          <li><strong>Verified:</strong></li>
          <p> {car.verified ? 'Yes' : 'No'}</p>
          <li><strong>Listed:</strong> </li>
          <p>{car.listed ? 'Yes' : 'No'}</p>
        </ul>
        <div className="price-section">
          <h5>Price:</h5>
          <h3> Rs. {car.price}</h3>
          <button className="order-button">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default UsedCarDetails;
