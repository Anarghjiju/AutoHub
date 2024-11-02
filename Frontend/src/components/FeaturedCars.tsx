// src/components/FeaturedCars.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/FeaturedCars.css';

interface Car {
  _id: string;
  Model: string;
  imageUrls: string [];
}

const FeaturedCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<Car[]>('http://localhost:5004/api/cars/random');
        setCars(response.data.slice(0, 8));  // Limit to 8 cars if more are returned
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    
    fetchCars();
  }, []);


  const handleCardClick = (car: Car) => {
    navigate(`/detail/${car._id}`, { state: { car } }); // Navigate to new route with car data in state
  };

  return (
    <div className="featured-cars">
      <h2>Featured Cars</h2>
      <div className="cars-container">
        {cars.map((car) => (
          <div className="car-card" key={car._id} onClick={() => handleCardClick(car)}>
            <img src={car.imageUrls[0]} alt={car.Model} />
            <h3>{car.Model}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
