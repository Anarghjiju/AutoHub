import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import FilterSidebarUsed from '../components/FilterSidebarused';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/CarListingPage.css';
import UsedCarListing from '../components/UsedCarListing';

const UsedCarListingPage: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]); // Replace `any` with your car type
  const [filteredCars, setFilteredCars] = useState<any[]>([]); // Replace `any` with your car type

  // State for filters
  const [minBudget, setMinBudget] = useState<number>(100000);
  const [maxBudget, setMaxBudget] = useState<number>(50000000);
  const [modelYear, setModelYear] = useState<string>('');
  const [kmsDriven, setKmsDriven] = useState<string>('');

  useEffect(() => {
    // Fetch the used car data from the API
    const fetchCars = async () => {
      const response = await fetch('http://localhost:3001/api/usedcars'); // Adjust API endpoint as necessary
      const data = await response.json();
      console.log("Fetched Used Cars Data:", data); // Log fetched data
      setCars(data);
      setFilteredCars(data); // Set the initial filtered cars to all cars
    };

    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car => {
      const cleanedPrice = car.price;
      console.log("Car Price Cleaned:", cleanedPrice); // Log cleaned price

      const isInBudget = cleanedPrice >= minBudget && cleanedPrice <= maxBudget;
      console.log("Is In Budget:", isInBudget, cleanedPrice, minBudget, maxBudget); // Log budget check

      const matchesModelYear = modelYear ? checkModelYear(car.year,modelYear) : true;
      console.log("Matches Model Year:", matchesModelYear, car.year, modelYear); // Log model year check

      const matchesKmsDriven = kmsDriven ? checkKmsDriven(car.kmsDriven, kmsDriven) : true;
      console.log("Matches Kms Driven:", matchesKmsDriven, car.kmsDriven, kmsDriven); // Log kms driven check

      return isInBudget && matchesModelYear && matchesKmsDriven;
    });

    setFilteredCars(filtered);
    console.log("Filtered Used Cars:", filtered); // Log filtered cars
  }, [cars, minBudget, maxBudget, modelYear, kmsDriven]);

  // Helper function to check kms driven range
  const checkKmsDriven = (kms: number, range: string) => {
    switch (range) {
      case 'Under 10,000 km':
        return kms < 10000;
      case '10,000 - 30,000 km':
        return kms >= 10000 && kms <= 30000;
      case '30,000 - 50,000 km':
        return kms > 30000 && kms <= 50000;
      case 'Above 50,000 km':
        return kms > 50000;
      default:
        return true;
    }
  };

  const checkModelYear = (kms: number, range: string) => {
    switch (range) {
      case '2021':
        return kms === 2021;
      case '2022':
        return kms === 2022;
      case '2023':
        return  kms === 2023;
      case '2024':
        return  kms === 2024;
      case '2018':
        return  kms === 2018;
      case '2017':
        return  kms === 2017;
      case '2019':
        return  kms === 2019;
      case '2020':
          return  kms === 2020;  
      default:
        return true;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <FilterSidebarUsed
              minBudget={minBudget}
              setMinBudget={setMinBudget}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              modelYear={modelYear}
              setModelYear={setModelYear}
              kmsDriven={kmsDriven}
              setKmsDriven={setKmsDriven}
            />
          </div>

          <div className="col-md-9">
            <UsedCarListing cars={filteredCars} /> {/* Pass filtered cars to the listing */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedCarListingPage;
