// src/components/ShopByBrands.tsx
import React, { useState } from 'react';
import '../styles/ShopByBrands.css';
import brand1 from '../assets/brand1.jpg';
import brand2 from '../assets/brand2.jpg';
import brand3 from '../assets/brand3.jpg';
import brand4 from '../assets/brand4.jpg';
import brand5 from '../assets/brand5.jpg';
import brand6 from '../assets/brand6.jpg';
import brand7 from '../assets/brand7.jpg';
import brand8 from '../assets/brand8.jpg';

const brands = [
  { id: 1, name: 'Brand 1', image: brand1 },
  { id: 2, name: 'Brand 2', image: brand2 },
  { id: 3, name: 'Brand 3', image: brand3 },
  { id: 4, name: 'Brand 4', image: brand4 },
  { id: 5, name: 'Brand 5', image: brand5 },
  { id: 6, name: 'Brand 6', image: brand6 },
  { id: 7, name: 'Brand 7', image: brand7 },
  { id: 8, name: 'Brand 8', image: brand8 },
];

const ShopByBrands: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 6; // Total number of brands to show at once (including hidden ones)
  const totalBrands = brands.length;

  const nextSlide = () => {
    if (currentIndex + itemsToShow < totalBrands) {
      setCurrentIndex(currentIndex + 2); // Show 2 more brands on each click
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2); // Go back 2 brands
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
      <button className="see-more-button">See More</button>
    </div>
  );
};

export default ShopByBrands;
