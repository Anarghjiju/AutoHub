// src/components/CarImageGallery.tsx
import React from 'react';

interface CarImageGalleryProps {
  imageUrls: string[];
}

const CarImageGallery: React.FC<CarImageGalleryProps> = ({ imageUrls }) => {
  return (
    <div className="car-image-gallery">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img className="d-block w-100" src={url} alt={`Car slide ${index + 1}`} />
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <p>No images available.</p>
            </div>
          )}
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
