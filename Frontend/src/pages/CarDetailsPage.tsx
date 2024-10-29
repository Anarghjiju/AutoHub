import React, { useState } from 'react';
import '../styles/carDetail.css';
import Navbar from '../components/Navbar';
import sampleCarImage1 from '../assets/tesla.png'; 
import sampleCarImage2 from '../assets/tesla2.png'; 

const CarDetailPage: React.FC = () => {
  return (
    <div>
        <Navbar />
  
   
    <div className="car-detail-page">
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

      <div className="car-info">
        <header className="car-detail-header">
          <h1>2022 Model Y</h1>
          <h3>Long Range All-Wheel Drive</h3>
        </header>

        <div className="car-detail-content">
          <h2>Vehicle Details</h2>
          <ul>
            <li><strong>Range:</strong> 330 miles</li>
            <li><strong>Top Speed:</strong> 135 mph</li>
            <li><strong>0-60 mph:</strong> 4.2 seconds</li>
            <li><strong>Odometer:</strong> 15,405 miles</li>
            <li><strong>VIN:</strong> 7SAYGDEE8NF313E07</li>
            <li><strong>Paint:</strong> Pearl White</li>
          </ul>
          <div className="price-section">
            <h3>Price: RS.75,00,000</h3>
            <button className="order-button">Order Now</button>
          </div>
        </div>

        <div className="car-detail-sections">
          <section>
            <h2>Basic Autopilot</h2>
            <p>Included</p>
          </section>

          <section>
            <h2>Charging</h2>
          </section>

          <section>
            <h2>Warranty</h2>
            <p>1 year / 10,000 miles</p>
          </section>

          <section>
            <h2>Condition</h2>
            <ul>
              <li>No reported accidents</li>
              <li>Meets Tesla's mechanical requirements</li>
              <li>May be subject to an open recall</li>
            </ul>
          </section>

          <section>
            <h2>Delivery Location</h2>
            <label>
              Registration Zip Code:
              <input type="text" placeholder="Enter Zip Code" />
            </label>
            <button className="submit-button">Submit</button>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CarDetailPage;
