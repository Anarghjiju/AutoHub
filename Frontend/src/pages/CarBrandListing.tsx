// src/pages/CarBrandListing.tsx
import React, { useState } from 'react';
import '../styles/CarBrandListing.css';
import Navbar from '../components/Navbar';
import brand1 from '../assets/Brands/aston-martin.webp';
import brand2 from '../assets/Brands/audi.webp';
import brand3 from '../assets/Brands/bajaj.webp';
import brand4 from '../assets/Brands/bentley.webp';
import brand5 from '../assets/Brands/benz.webp';
import brand6 from '../assets/Brands/bmw.webp';
import brand7 from '../assets/Brands/bugatti.webp';
import brand8 from '../assets/Brands/datsun.webp';
import brand9 from '../assets/Brands/ferrari.webp';
import brand10 from '../assets/Brands/fiat.webp';
import brand11 from '../assets/Brands/force.webp';
import brand12 from '../assets/Brands/ford.webp';
import brand13 from '../assets/Brands/honda.webp';
import brand14 from '../assets/Brands/hyundai.webp';
import brand15 from '../assets/Brands/isuzu.webp';
import brand16 from '../assets/Brands/jaguar.webp';
import brand17 from '../assets/Brands/jeep.webp';
import brand18 from '../assets/Brands/kia.webp';
import brand19 from '../assets/Brands/lamborghini.webp';
import brand20 from '../assets/Brands/land-rover.webp';
import brand21 from '../assets/Brands/lexus.webp';
import brand22 from '../assets/Brands/mahindra.webp';
import brand23 from '../assets/Brands/maruti.webp';
import brand24 from '../assets/Brands/maserati.webp';
import brand25 from '../assets/Brands/mg.webp';
import brand26 from '../assets/Brands/mini.webp';
import brand27 from '../assets/Brands/nissan.webp';
import brand28 from '../assets/Brands/porsche.webp';
import brand29 from '../assets/Brands/renault.webp';
import brand30 from '../assets/Brands/skoda.webp';
import brand31 from '../assets/Brands/tata.webp';
import brand32 from '../assets/Brands/toyota.webp';
import brand33 from '../assets/Brands/volkswagen.webp';
import brand34 from '../assets/Brands/volvo.webp';

const brands = [
  { id: 1, name: 'Aston Martin', image: brand1 },
  { id: 2, name: 'Audi', image: brand2 },
  { id: 3, name: 'Bajaj', image: brand3 },
  { id: 4, name: 'Bentley', image: brand4 },
  { id: 5, name: 'Benz', image: brand5 },
  { id: 6, name: 'BMW', image: brand6 },
  { id: 7, name: 'Bugatti', image: brand7 },
  { id: 8, name: 'Datsun', image: brand8 },
  { id: 9, name: 'Ferrari', image: brand9 },
  { id: 10, name: 'Fiat', image: brand10 },
  { id: 11, name: 'Force', image: brand11 },
  { id: 12, name: 'Ford', image: brand12 },
  { id: 13, name: 'Honda', image: brand13 },
  { id: 14, name: 'Hyundai', image: brand14 },
  { id: 15, name: 'Isuzu', image: brand15 },
  { id: 16, name: 'Jaguar', image: brand16 },
  { id: 17, name: 'Jeep', image: brand17 },
  { id: 18, name: 'Kia', image: brand18 },
  { id: 19, name: 'Lamborghini', image: brand19 },
  { id: 20, name: 'Land Rover', image: brand20 },
  { id: 21, name: 'Lexus', image: brand21 },
  { id: 22, name: 'Mahindra', image: brand22 },
  { id: 23, name: 'Maruti', image: brand23 },
  { id: 24, name: 'Maserati', image: brand24 },
  { id: 25, name: 'MG', image: brand25 },
  { id: 26, name: 'Mini', image: brand26 },
  { id: 27, name: 'Nissan', image: brand27 },
  { id: 28, name: 'Porsche', image: brand28 },
  { id: 29, name: 'Renault', image: brand29 },
  { id: 30, name: 'Skoda', image: brand30 },
  { id: 31, name: 'Tata', image: brand31 },
  { id: 32, name: 'Toyota', image: brand32 },
  { id: 33, name: 'Volkswagen', image: brand33 },
  { id: 34, name: 'Volvo', image: brand34 }
];

const CarBrandListing: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [brandsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter brands based on the search term
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current brands to display
  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = filteredBrands.slice(indexOfFirstBrand, indexOfLastBrand);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="car-brand-listing">
        <h2>Car Brand Listing</h2>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for a brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="brands-grid">
          {currentBrands.map((brand) => (
            <div className="brand-card" key={brand.id}>
              <img src={brand.image} alt={brand.name} className="brand-image" />
              <h3>{brand.name}</h3>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredBrands.length / brandsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarBrandListing;
