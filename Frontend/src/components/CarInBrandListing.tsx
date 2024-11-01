import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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

interface CarByBrandListingProps {
  name: string | undefined;
}

const CarList: React.FC<CarByBrandListingProps> = ({ name }) => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = cars.filter((car) =>
    car.Model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/api/cars/cars/${name}`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [name]);

  const handleCardClick = (car: Car) => {
    navigate(`/detail/${car._id}`, { state: { car } }); // Navigate to new route with car data in state
  };

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
      {loading ? (
        <p>Loading...</p>
      ) : cars.length ? (
        <div className="container py-4">
          <div className="row">
            {filteredCars.map((car) => (
              <div className="col-md-4 mb-4" key={car._id} onClick={() => handleCardClick(car)}>
                <div className="card h-100 shadow-sm">
                  <img src={car.imageUrls[0]} className="card-img-top" alt={car.Model} />
                  <div className="card-body">
                    <h5 className="card-title text-center">{car.Model}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No cars available for this brand.</p>
      )}
    </div>
  );
};

export default CarList;
