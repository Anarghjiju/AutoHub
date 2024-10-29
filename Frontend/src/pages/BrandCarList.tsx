import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  

const CarList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
        try {
          const response = await axios.get(`http://localhost:5004/api/cars/cars/${name}`);
          setCars(response.data); // Use response.data since data is already an array
        } catch (error) {
          console.error("Error fetching cars:", error);
        } finally {
          setLoading(false);
        }
      };
    fetchCars();
  }, [name]);

  return (
    <div>
      <h2>Cars for {name}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cars.length ? (
        <div className="car-list">
          {cars.map((car) => (
            <div key={car._id} className="car-card">
              <h3>{car.Model}</h3>
              {/* Display other car details here */}
            </div>
          ))}
        </div>
      ) : (
        <p>No cars available for this brand.</p>
      )}
    </div>
  );
};

export default CarList;
