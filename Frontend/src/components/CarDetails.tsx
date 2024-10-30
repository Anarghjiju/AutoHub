// src/components/CarDetails.tsx
import React from 'react';

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

interface CarDetailsProps {
  car: Car;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  if (!car) {
    return <p>No car data available.</p>;
  }

  return (
    <div className="car-info">
      <header className="car-detail-header">
        <h1>{car.Model}</h1>
        <h3>{car.Variant}</h3>
      </header>

      <div className="car-detail-content">
        <h2>Vehicle Details</h2>
        <ul>
          <li><strong>Price:</strong> {car.Ex_Showroom_Price}</li>
          <li><strong>Fuel Type:</strong> {car.Fuel_Type}</li>
          <li><strong>Power:</strong> {car.Power}</li>
          <li><strong>Torque:</strong> {car.Torque}</li>
          <li><strong>Displacement:</strong> {car.Displacement}</li>
          <li><strong>Fuel Tank Capacity:</strong> {car.Fuel_Tank_Capacity}</li>
          <li><strong>Body Type:</strong> {car.Body_Type}</li>
          <li><strong>Seating Capacity:</strong> {car.Seating_Capacity}</li>
        </ul>
        <div className="price-section">
          <h3>Price: {car.Ex_Showroom_Price}</h3>
          <button className="order-button">Order Now</button>
        </div>
      </div>

      <div className="car-detail-sections">
        <section>
          <h2>Performance</h2>
          <p>ARAI Certified Mileage: {car.ARAI_Certified_Mileage}</p>
          <p>ABS: {car.ABS}</p>
          <p>Type: {car.Type}</p>
        </section>

        <section>
          <h2>Dimensions</h2>
          <p>Length: {car.Length}</p>
          <p>Width: {car.Width}</p>
          <p>Height: {car.Height}</p>
          <p>Kerb Weight: {car.Kerb_Weight}</p>
          <p>Ground Clearance: {car.Ground_Clearance}</p>
        </section>

        <section>
          <h2>Brakes</h2>
          <p>Front Brakes: {car.Front_Brakes}</p>
          <p>Rear Brakes: {car.Rear_Brakes}</p>
        </section>

        <section>
          <h2>Condition</h2>
          <ul>
            <li>No reported accidents</li>
            <li>Meets mechanical requirements</li>
            <li>May be subject to an open recall</li>
          </ul>
        </section>

        <section>
          <h2>Delivery Location</h2>
          <label>
            Registration Zip Code:
            <input type="text" placeholder="Enter Zip Code" />
          </label>
          <button className="submit-button">Submit</button>
        </section>
      </div>
    </div>
  );
};

export default CarDetails;
