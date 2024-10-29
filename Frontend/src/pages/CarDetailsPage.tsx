import React, { useState } from 'react';
import '../styles/carDetail.css';
import Navbar from '../components/Navbar';
import sampleCarImage1 from '../assets/car1.jpg'; // Replace with your actual image paths
import sampleCarImage2 from '../assets/car2.jpg';
import sampleCarImage3 from '../assets/car3.jpg'; // Add more images as needed
 // Add more images as needed

const UsedCarDetail: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(sampleCarImage1);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div>
    <Navbar/>
    <div className="used-car-details-main">
      <div className="used-car-details-container">
        <div className="used-car-image-container">
          <div className="thumbnail-container">
            <div className="thumbnail-images">
              <img
                src={sampleCarImage1}
                alt="Car Thumbnail 1"
                onClick={() => handleImageSelect(sampleCarImage1)}
              />
              <img
                src={sampleCarImage2}
                alt="Car Thumbnail 2"
                onClick={() => handleImageSelect(sampleCarImage2)}
              />
               <img
                src={sampleCarImage3}
                alt="Car Thumbnail 2"
                onClick={() => handleImageSelect(sampleCarImage3)}
              />
              {/* Add more thumbnails as needed */}
            </div>
          </div>
          <div className="main-image-container">
            <img src={selectedImage} alt="Selected Car" />
          </div>
        </div>

        <div className="used-car-info-container">
          <h2>Toyota Camry 2020</h2>
          <p className="used-car-detail-card-title">Price: <span className="used-car-detail-card-price">Rs. 20,00,000</span></p>
          <p className="used-car-detail-card-location">Mileage: 15,000 km</p>
          <p className="used-car-detail-card-location">Fuel Type: Petrol</p>
          <p className="used-car-detail-card-location">Location: Mumbai</p>
          <p className="used-car-detail-card-location">Owner: 1st Owner</p>
        </div>
      </div>

      <div className="below-details-container">
        <div className="used-car-description-main">
          <h3>Description:</h3>
          <p>This Toyota Camry is in excellent condition, has a clean title, and has been well maintained. It comes with a comprehensive service history and is fully loaded with features.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UsedCarDetail;
