import React, { useState } from 'react';
import Modal from '../components/Model'; // Adjust the import based on your file structure
import ConfirmModal from '../components/ConfirmModel'; // Import your new confirmation modal

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
}

interface UsedCarDetailsProps {
  car: Car;
}

const ApproveCarDetail: React.FC<UsedCarDetailsProps> = ({ car }) => {
  const [newPrice, setNewPrice] = useState<number>(car.price);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const handleConfirmPrice = async (price: number) => {
    console.log('Confirm price clicked:', price); // Debugging line
    try {
      const response = await fetch(`http://localhost:3001/api/usedcar/update/${car._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price }), 
      });

      if (response.ok) {
        const data = await response.json(); 
        console.log('Response from server:', data); 
        alert('Price updated successfully');
        setNewPrice(price); 
      } else {
        const errorData = await response.json(); 
        console.error('Update error response:', errorData);
        alert('Failed to update price: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Error updating price');
    }
  };

  const handleReviewPrice = () => {
    setIsModalOpen(true); // Open the price review modal
  };

  const handleVerify = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/usedcars/approve/${car._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json(); 
        console.log('Verification response:', data);
        alert('Car listing approved successfully');
      } else {
        const errorData = await response.json();
        console.error('Verification error response:', errorData);
        alert('Failed to verify the car listing: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error verifying car listing:', error);
      alert('Error verifying the car listing');
    } finally {
      setIsConfirmModalOpen(false); // Close confirmation modal
    }
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
          <li><strong>Price:</strong> Rs. {car.price}</li>
          <li><strong>Description:</strong> {car.description}</li>
          <li><strong>KMs Driven:</strong> {car.kmsDriven} Km</li>
          <li><strong>Year:</strong> {car.year}</li>
          <li><strong>Verified:</strong> {car.verified ? 'Yes' : 'No'}</li>
          <li><strong>Listed:</strong> {car.listed ? 'Yes' : 'No'}</li>
        </ul>
        <div className="price-section">
          <h5>Price:</h5>
          <h3> Rs. {newPrice}</h3> {/* Display the new price instead */}
          <button className="order-button" onClick={() => setIsConfirmModalOpen(true)}>Verify</button>
          <button className="order-button">Reject</button>
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
