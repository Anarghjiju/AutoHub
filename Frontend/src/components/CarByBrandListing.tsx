import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholderImage from '../assets/car1.jpg';
// Define a Car type
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
interface CarByBrandListingProps {
  name: string | undefined;
}

// Sample car data
const CarList: React.FC<CarByBrandListingProps> = ({ name }) => {
  //const { name } = useParams<{ name: string }>();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter cars based on the search term
  const filteredCars = cars.filter((car) =>
    car.Model.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="row align-items-center mb-4">
        <div className="col">
          <h2 className="text-left">Car Listings</h2>
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Display Car Cards */}
      {loading ? (
        <p>Loading...</p>
      ) : cars.length ?(
      <div className="container py-4">
        <div className="row">
          {filteredCars.map((car) => (
            <div className="col-md-4 mb-4" key={car._id}>
              <div className="card h-100 shadow-sm">
                <img src={placeholderImage} className="card-img-top" alt={car.Model} />
                <div className="card-body">
                  <h5 className="card-title text-center">{car.Model}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      ) : (
        <p>No cars available for this brand.</p> )
}
    </div>
  );
};

export default CarList;
