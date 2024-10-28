// src/components/FeaturedCars.tsx
import React from 'react';
import '../styles/FeaturedCars.css';
import car1 from '../assets/car1.jpg'
import car2 from '../assets/car2.jpg'
import car3 from '../assets/car3.jpg'
import car4 from '../assets/car4.jpg'
import car5 from '../assets/car5.jpg'
import car6 from '../assets/car6.jpg'
import car7 from '../assets/car7.jpg'
import car8 from '../assets/car8.jpg'

const cars = [
  { id: 1, name: 'Car Model 1', image: car1 },
  { id: 2, name: 'Car Model 2', image: car2 },
  { id: 3, name: 'Car Model 3', image: car3 },
  { id: 4, name: 'Car Model 4', image: car4 },
  { id: 5, name: 'Car Model 5', image: car5 },
  { id: 6, name: 'Car Model 6', image: car6 },
  { id: 7, name: 'Car Model 7', image: car7 },
  { id: 8, name: 'Car Model 8', image: car8 },
];

const FeaturedCars: React.FC = () => {
  return (
    <div className="featured-cars">
      <h2>Featured Cars</h2>
      <div className="cars-container">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <img src={car.image} alt={car.name} />
            <h3>{car.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
