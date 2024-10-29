// src/components/ShopByBrands.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ShopByBrands.css';
import brand1 from '../assets/Brands/aston-martin.webp';
import brand2 from '../assets/Brands/audi.webp';
import brand3 from '../assets/Brands/bajaj.webp';
import brand4 from '../assets/Brands/bentley.webp';
import brand5 from '../assets/Brands/benz.webp';
import brand6 from '../assets/Brands/bmw.webp';
import brand7 from '../assets/Brands/bugatti.webp';
import brand8 from '../assets/Brands/datsun.webp';

const brands = [
  { id: 1, name: 'Aston Martin', image: brand1 },
  { id: 2, name: 'Audi', image: brand2 },
  { id: 3, name: 'Bajaj', image: brand3 },
  { id: 4, name: 'Bentley', image: brand4 },
  { id: 5, name: 'Benz', image: brand5 },
  { id: 6, name: 'BMW', image: brand6 },
  { id: 7, name: 'Bugatti', image: brand7 },
  { id: 8, name: 'Datsun', image: brand8 }
];

const ShopByBrands: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 6;
  const totalBrands = brands.length;
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentIndex + itemsToShow < totalBrands) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };
  
  return (
    <div className="shop-by-brands">
      <h2>Shop by Brands</h2>
      <div className="brands-container">
        <button className="arrow-button left-arrow" onClick={prevSlide} disabled={currentIndex === 0}>
          &lt;
        </button>
        <div className="brands-slider">
          <div className="brands-display" style={{ transform: `translateX(-${(currentIndex * (100 / itemsToShow))}%)` }}>
            {brands.map((brand) => (
              <div className="brand-card" key={brand.id}>
                <img src={brand.image} alt={brand.name} />
                <h3>{brand.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <button className="arrow-button right-arrow" onClick={nextSlide} disabled={currentIndex + itemsToShow >= totalBrands}>
          &gt;
        </button>
      </div>
      <button className="see-more-button" onClick={() => navigate('/brands')}>See More</button>
    </div>
  );
};

export default ShopByBrands;
