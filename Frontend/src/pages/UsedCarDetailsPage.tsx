// src/pages/CarDetailPage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import UsedCarDetails from '../components/UsedCarDetails';
import '../styles/carDetail.css';
import { useParams } from 'react-router-dom';
import UsedCarImageGallery from '../components/UsedCarImageGallery';

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
  images: Image[];
}

const UsedCarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/usedcar/${id}`);
        if (!response.ok) {
          throw new Error('Car not found');
        }
        const carData = await response.json();
        setCar(carData);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (!car) {
    return <p>No car data available.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="car-detail-page">
        <UsedCarImageGallery images={car.images} />
        <UsedCarDetails car={car} />
      </div>
    </div>
  );
};

export default UsedCarDetailsPage;
