// src/components/CarImageGallery.tsx
import React from 'react';
import sampleCarImage1 from '../assets/tesla.png'; 
import sampleCarImage2 from '../assets/tesla2.png'; 

const CarImageGallery: React.FC = () => {
  return (
    <div className="car-image-gallery">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={sampleCarImage1} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={sampleCarImage2} alt="Second slide" />
          </div>
        </div>
        <a
          className="carousel-control-prev custom-arrow-prev"
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </a>
        <a
          className="carousel-control-next custom-arrow-next"
          href="#carouselExampleControls"
          role="button"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </a>
      </div>
    </div>
  );
};

export default CarImageGallery;
