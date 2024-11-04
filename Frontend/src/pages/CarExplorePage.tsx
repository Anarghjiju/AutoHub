import React, { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import Navbar from '../components/Navbar';
import CarListing from '../components/CarListing'; // Ensure this imports the updated CarListing component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/CarListingPage.css';

const CarListingPage: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]); // Replace `any` with your car type
  const [filteredCars, setFilteredCars] = useState<any[]>([]); // Replace `any` with your car type

  const [minBudget, setMinBudget] = useState<number>(100000);
  const [maxBudget, setMaxBudget] = useState<number>(50000000);
  const [fuelType, setFuelType] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');

  useEffect(() => {
    // Fetch the car data from the API
    const fetchCars = async () => {
      const response = await fetch('http://localhost:5004/api/cars/test');
      const data = await response.json();
      console.log("Fetched Cars Data:", data); // Log fetched data
      setCars(data);
      setFilteredCars(data); // Set the initial filtered cars to all cars
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car => {
      const cleanedPrice = parseFloat(car.Ex_Showroom_Price.replace(/Rs\.?\s?|,/g, '').trim());
console.log("Car Price Cleaned:", cleanedPrice); // Log cleaned price


      const isInBudget =
        cleanedPrice >= minBudget && cleanedPrice <= maxBudget;
      console.log("Is In Budget:", isInBudget, cleanedPrice, minBudget, maxBudget); // Log budget check

      const matchesFuelType = fuelType ? car.Fuel_Type === fuelType : true;
      console.log("Matches Fuel Type:", matchesFuelType, car.Fuel_Type, fuelType); // Log fuel type check

      const matchesBodyType = bodyType ? car.Body_Type === bodyType : true;
      console.log("Matches Body Type:", matchesBodyType, car.Body_Type, bodyType); // Log body type check

      const matchesTransmission = transmission ? car.Type === transmission : true;
      console.log("Matches Transmission:", matchesTransmission, car.Type, transmission); // Log transmission check

      return (
        isInBudget &&
        matchesFuelType &&
        matchesBodyType &&
        matchesTransmission
      );
    });

    setFilteredCars(filtered);
    console.log("Filtered Cars:", filtered); // Log filtered cars
  }, [cars, minBudget, maxBudget, fuelType, bodyType, transmission]);

  return (
    <div>
      {/* Main Navbar */}
      <Navbar />
      {/* Main Container */}
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
            <CarListing cars={filteredCars}/> {/* This will handle its own filtering logic now */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListingPage;
