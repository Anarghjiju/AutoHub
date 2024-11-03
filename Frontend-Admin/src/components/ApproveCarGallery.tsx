// src/components/CarImageGallery.tsx
import React from 'react';

interface Image {
  publicId: string;
  url: string;
}

interface CarImageGalleryProps {
  images: Image[];
}

const UsedCarImageGallery: React.FC<CarImageGalleryProps> = ({ images }) => {
  return (
    <div className="car-image-gallery">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={image.publicId}>
              <img className="d-block w-100" src={image.url} alt={`Slide ${index + 1}`} />
            </div>
          ))}
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

export default UsedCarImageGallery;
