import React, { useState, useEffect } from 'react';
import Modal from '../components/Model';
import ConfirmModal from '../components/ConfirmModel';

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
  sellerId: string;
}

interface User {
  name: string;
  email: string;
  phno?: number;
}

interface UsedCarDetailsProps {
  car: Car;
}

const ApproveCarDetail: React.FC<UsedCarDetailsProps> = ({ car }) => {
  const [newPrice, setNewPrice] = useState<number>(car.price);
  const [seller, setSeller] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  // Fetch seller details based on sellerId
  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/users/data/${car.sellerId}`);
        const data = await response.json();
        setSeller(data);
      } catch (error) {
        console.error("Error fetching seller details:", error);
      }
    };

    if (car.sellerId) {
      fetchSellerDetails();
    }
  }, [car.sellerId]);

  const sendNotification = async (userId: string, message: string) => {
    try {
        const response = await fetch(`http://localhost:3002/api/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, message, date: new Date(), status: false }),
        });

        if (!response.ok) {
            throw new Error('Failed to send notification');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};


  const handleConfirmPrice = async (price: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/usedcar/update/${car._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price }), 
      });
      if (response.ok) {
        await sendNotification(car.sellerId, `Your price has been Reviewd by Admin and final price is : ${price} `); // Send notification
        alert('Price updated successfully');
        setNewPrice(price); 
      } else {
        alert('Failed to update price');
      }
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handleReviewPrice = () => {
    setIsModalOpen(true);
  };

  const handleVerify = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/usedcars/approve/${car._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert('Car listing approved successfully');
        await sendNotification(car.sellerId, `Your Car has been verified and listed  on our website`); // Send notification


      } else {
        alert('Failed to verify the car listing');
      }
    } catch (error) {
      console.error("Error verifying car listing:", error);
    } finally {
      setIsConfirmModalOpen(false);
    }
  };
  const handleReject = () => {
    alert('Car rejected !')
    sendNotification(car.sellerId, `Your  Car has been rejected by Admin`); // Send notification


  };
  

  return (
    <div className="car-info">
      <header className="car-detail-header">
        <h1>{car.carModel}</h1>
        <h3>{car.make}</h3>
      </header>

      <div className="car-detail-content">
        <h2>Vehicle Details</h2>
        <ul>
          <li><strong>Price:</strong> Rs. {newPrice}</li>
          <li><strong>Description:</strong> {car.description}</li>
          <li><strong>KMs Driven:</strong> {car.kmsDriven} Km</li>
          <li><strong>Year:</strong> {car.year}</li>
          <li><strong>Verified:</strong> {car.verified ? 'Yes' : 'No'}</li>
          <li><strong>Listed:</strong> {car.listed ? 'Yes' : 'No'}</li>
        </ul>

        {/* Seller Details */}
        {seller && (
          <div className="seller-info">
            <h2>Seller Details</h2>
            <ul>
              <li><strong>Name:</strong> {seller.name}</li>
              <li><strong>Email:</strong> {seller.email}</li>
              {seller.phno && <li><strong>Phone Number:</strong> {seller.phno}</li>}
            </ul>
          </div>
        )}

        <div className="price-section">
          <button className="order-button" onClick={() => setIsConfirmModalOpen(true)}>Verify</button>
          <button className="order-button" onClick={handleReject}>Reject</button>
          <button className="order-button" onClick={handleReviewPrice}>Review price</button>
        </div>
      </div>

      {/* Modal for Price Review */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPrice}
        currentPrice={newPrice}
      />

      {/* Confirmation Modal for Verification */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleVerify}
      />
    </div>
  );
};

export default ApproveCarDetail;
