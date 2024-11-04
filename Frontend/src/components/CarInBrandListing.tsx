import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterSidebar from '../components/FilterSidebar';

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
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  const [minBudget, setMinBudget] = useState<number>(100000);
  const [maxBudget, setMaxBudget] = useState<number>(50000000);
  const [fuelType, setFuelType] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');

  // Function to filter cars based on selected criteria
  const filterCars = (cars: Car[]) => {
    return cars.filter(car => {
      const cleanedPrice = parseFloat(car.Ex_Showroom_Price.replace(/Rs\.?\s?|,/g, '').trim());

      const isInBudget = cleanedPrice >= minBudget && cleanedPrice <= maxBudget;
      const matchesFuelType = fuelType ? car.Fuel_Type === fuelType : true;
      const matchesBodyType = bodyType ? car.Body_Type === bodyType : true;
      const matchesTransmission = transmission ? car.Type === transmission : true;

      return isInBudget && matchesFuelType && matchesBodyType && matchesTransmission;
    });
  };

  // Effect to fetch cars by brand
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

  // Effect to filter cars whenever the filtering criteria change
  useEffect(() => {
    const filtered = filterCars(cars);
    setFilteredCars(filtered);
  }, [cars, minBudget, maxBudget, fuelType, bodyType, transmission]);

  // Effect to apply search term filtering
  const filteredCarsSearch = filteredCars.filter(car =>
    car.Model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (car: Car) => {
    navigate(`/detail/${car._id}`, { state: { car } }); // Navigate to new route with car data in state
  };

  return (
    <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <FilterSidebar 
            minBudget={minBudget}
            setMinBudget={setMinBudget}
            maxBudget={maxBudget}
            setMaxBudget={setMaxBudget}
            fuelType={fuelType}
            setFuelType={setFuelType}
            bodyType={bodyType}
            setBodyType={setBodyType}
            transmission={transmission}
            setTransmission={setTransmission}
            />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
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
      ) : filteredCarsSearch.length ? (
        <div className="container py-4">
          <div className="row">
            {filteredCarsSearch.map((car) => (
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
          </div>
        </div>
      </div>
    
  );
};

export default CarList;
