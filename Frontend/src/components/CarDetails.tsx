import React from 'react';
import '../styles/carDetail.css'; // Make sure to import your CSS file for styles

interface Car {
    _id: string;
    Make: string;
    Model: string;	
    Ex_Showroom_Price: string;
    Fuel_Type: string;
    Power: string;
    Torque: string;
    Displacement: string;	
    Fuel_Tank_Capacity: string;	
    Type: string;	
    Body_Type: string;	
    Doors: string;
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
    Electric_Range: string;
    Variants: string[];
    imageUrls: string[];
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
        <h3>{car.Make}</h3>
      </header>

      <div className="car-detail-content">
        <h2>Vehicle Details</h2>
        <ul>
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
        </div>
      </div>

      <div className="car-detail-sections">
        <section>
          <h2>Performance</h2>
          <li><strong>ARAI Certified Mileage: </strong> {car.ARAI_Certified_Mileage}</li>
          <li><strong>Type: </strong> {car.Type}</li>
        </section>

        <section>
          <h2>Dimensions</h2>
          <li><strong>Length: </strong> {car.Length}</li>
          <li><strong>Width: </strong> {car.Width}</li>
          <li><strong>Height: </strong> {car.Height}</li>
          <li><strong>Kerb Weight: </strong> {car.Kerb_Weight}</li>
          <li><strong>Ground Clearance: </strong> {car.Ground_Clearance}</li>
        </section>

        <section>
          <h2>Brakes</h2>
          <li><strong>Front Brakes: </strong> {car.Front_Brakes}</li>
          <li><strong>Rear Brakes: </strong> {car.Rear_Brakes}</li>
        </section>

        {/* New Section for Variants */}
        <section>
          <h2>Variants</h2>
          <div className="variants-container">
            {car.Variants.map((variant, index) => (
              <div className="variant-card" key={index}>
                {variant}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CarDetails;
