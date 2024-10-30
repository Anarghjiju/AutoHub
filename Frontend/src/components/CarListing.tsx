import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.jpg';
import car3 from '../assets/car3.jpg';
import car4 from '../assets/car4.jpg';
import car5 from '../assets/car5.jpg';
import car6 from '../assets/car6.jpg';
import car7 from '../assets/car1.jpg';
import car8 from '../assets/car2.jpg';
import car9 from '../assets/car3.jpg';
import car10 from '../assets/car4.jpg';
import car11 from '../assets/car5.jpg';
import car12 from '../assets/car6.jpg';

// Define a Car type
interface Car {
  id: number;
  name: string;
  image: string;
}

// Sample car data
const cars: Car[] = [
  { id: 1, name: 'Car Model 1', image: car1 },
  { id: 2, name: 'Car Model 2', image: car2 },
  { id: 3, name: 'Car Model 3', image: car3 },
  { id: 4, name: 'Car Model 4', image: car4 },
  { id: 5, name: 'Car Model 5', image: car5 },
  { id: 6, name: 'Car Model 6', image: car6 },
  { id: 7, name: 'Car Model 7', image: car7 },
  { id: 8, name: 'Car Model 8', image: car8 },
  { id: 9, name: 'Car Model 9', image: car9 },
  { id: 10, name: 'Car Model 10', image: car10 },
  { id: 11, name: 'Car Model 11', image: car11 },
  { id: 12, name: 'Car Model 12', image: car12 },
];

const CarListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter cars based on the search term
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
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
      <div className="container py-4">
        <div className="row">
          {filteredCars.map((car) => (
            <div className="col-md-4 mb-4" key={car.id}>
              <div className="card h-100 shadow-sm">
                <img src={car.image} className="card-img-top" alt={car.name} />
                <div className="card-body">
                  <h5 className="card-title text-center">{car.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarListing;
