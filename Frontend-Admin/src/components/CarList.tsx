import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import '../styles/carList.css';

interface Car {
    _id: string;
    make: string;
    carModel: string;
    year: number;
    kmsDriven: number;
    price: number;
    sellerId: string;
    description: string;
    buyerId?: string; // Optional if a buyer hasn't been assigned yet
    verified: boolean;
    listed: boolean;
    isSold:boolean;
    images: {
        publicId: string;
        url: string;
    }[];
}

const CarList: React.FC = () => {
    const [carList, setCarList] = useState<Car[]>([]);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
    const [filter, setFilter] = useState<'all' | 'sold' | 'unsold'>('all');

    useEffect(() => {
        // Fetch the verified car listings from the backend
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/usedcars'); // Adjust endpoint as needed
                const data = await response.json();
                setCarList(data);
                setFilteredCars(data); // Initially set all cars as filtered
            } catch (error) {
                console.error('Error fetching verified cars:', error);
            }
        };

        fetchCars();
    }, []);

    // Update the displayed cars based on the selected filter
    useEffect(() => {
        let filtered;
        if (filter === 'sold') {
            filtered = carList.filter((car) => car.isSold);
        } else if (filter === 'unsold') {
            filtered = carList.filter((car) => !car.isSold);
        } else {
            filtered = carList;
        }
        setFilteredCars(filtered);
    }, [filter, carList]);

    return (
        <div className="verified-car-list">
            <h3>Verified Car Listings</h3>
            <div className="toggle-container">
  <ButtonGroup className="filter-toggle">
    <Button variant={filter === 'all' ? 'light' : 'outline-light'} onClick={() => setFilter('all')}>
      All
    </Button>
    <Button variant={filter === 'sold' ? 'light' : 'outline-light'} onClick={() => setFilter('sold')}>
      Sold
    </Button>
    <Button variant={filter === 'unsold' ? 'light' : 'outline-light'} onClick={() => setFilter('unsold')}>
      Unsold
    </Button>
  </ButtonGroup>
</div>

            <div className="car-list">
                {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                        <div key={car._id} className="car-item">
                            <p><strong>Make:</strong> {car.make}</p>
                            <p><strong>Model:</strong> {car.carModel}</p>
                            <p><strong>Seller ID:</strong> {car.sellerId}</p>
                            <p><strong>Price:</strong> Rs. {car.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No cars found for this filter.</p>
                )}
            </div>
        </div>
    );
};

export default CarList;
