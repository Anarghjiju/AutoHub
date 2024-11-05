// src/components/UsedCarDetails.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import '../styles/UsedCarDetail.css';

interface Image {
  publicId: string;
  url: string;
}

interface Car {
  _id: string;
  make: string;
  carModel: string;
  year: number;
  kmsDriven: number;
  price: number;
  description: string;
  verified: boolean;
  listed: boolean;
  isSold: boolean;
  images: Image[];
  orders: string[]; // Assuming this array holds user IDs who have ordered this car
}

interface UsedCarDetailsProps {
  car: Car;
}

const UsedCarDetails: React.FC<UsedCarDetailsProps> = ({ car }) => {
  const { user } = useUserContext();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isAlreadyOrdered, setIsAlreadyOrdered] = useState(false);

  const handleOrder = async () => {
    if (!user || !user._id) {
      alert('Please log in to place an order.');
      return;
    }

    try {
      // Check if the user has already ordered this car
      const isUserAlreadyOrdered = car.orders.includes(user._id);
      
      if (isUserAlreadyOrdered) {
        // Show warning popup if user has already ordered the car
        setIsAlreadyOrdered(true);
      } else {
        // Proceed with placing a new order
        const response = await axios.patch(`http://localhost:3001/api/usedcars/orders/${car._id}`, {
          userId: user._id,
        });
        if (response.status === 200) {
          setIsOrderConfirmed(true); // Show confirmation overlay on success
        }
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again later.');
    }
  };

  return (
    <div className="car-info">
      <header className="car-detail-header">
        <p></p>
        <h1>{car.carModel}</h1>
        <h3>{car.make}</h3>
      </header>

      <div className="car-detail-content">
        <h2>Vehicle Details</h2>
        <p></p>
        <ul>
          <li><strong>Description:</strong> {car.description}</li>
          <p></p>
          <li><strong>KMs Driven:</strong> {car.kmsDriven} Km</li>
          <p></p>
          <li><strong>Year:</strong> {car.year}</li>
          <p></p>
          <li><strong>Verified:</strong> {car.verified ? 'Yes' : 'No'}</li>
          <p></p>
        </ul>
        <div className="price-section">
          <h5>Price: Rs. {car.price}</h5>
          <p></p>
          <button className="order-button" onClick={handleOrder}>Order Now</button>
        </div>
      </div>

      {isOrderConfirmed && (
        <div className="overlay">
          <div className="popup">
            <span className="green-tick">✔️</span>
            <p>Your order has been sent. A person from our sales team will contact you.</p>
            <button onClick={() => setIsOrderConfirmed(false)}>Close</button>
          </div>
        </div>
      )}

      {isAlreadyOrdered && (
        <div className="overlay">
          <div className="popup warning">
            <span className="warning-sign">⚠️</span>
            <p>You have already ordered this car.</p>
            <button onClick={() => setIsAlreadyOrdered(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsedCarDetails;
