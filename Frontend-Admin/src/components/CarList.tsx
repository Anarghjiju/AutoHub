import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Import delete icon
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
    isSold: boolean;
    images: {
        publicId: string;
        url: string;
    }[];
}

const CarList: React.FC = () => {
    const [carList, setCarList] = useState<Car[]>([]);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);
    const [filter, setFilter] = useState<'all' | 'sold' | 'unsold'>('all');
    const [showModal, setShowModal] = useState(false); // State for controlling the modal
    const [selectedCar, setSelectedCar] = useState<Car | null>(null); // State for the selected car
    const [activeCarId, setActiveCarId] = useState<string | null>(null); // State to track the active car item for click effect

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/usedcars/all'); // Adjust endpoint as needed
                const data = await response.json();
                setCarList(data);
                setFilteredCars(data); // Initially set all cars as filtered
            } catch (error) {
                console.error('Error fetching verified cars:', error);
            }
        };

        fetchCars();
    }, []);

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

    // Function to handle opening the modal with selected car details
    const handleShowDetails = (car: Car) => {
        setSelectedCar(car);
        setShowModal(true);
        setActiveCarId(car._id); // Set active car id for click effect
    };

    // Function to handle closing the modal
    const handleClose = () => {
        setShowModal(false);
        setSelectedCar(null); // Clear selected car on close
        setActiveCarId(null); // Reset active car id
    };

    // Function to handle car deletion
    const handleDeleteCar = async (carId: string) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await fetch(`http://localhost:3001/api/usedcars/${carId}`, {
                    method: 'DELETE',
                });

                // Update the state after deletion
                setCarList((prevCars) => prevCars.filter((car) => car._id !== carId));
                setFilteredCars((prevCars) => prevCars.filter((car) => car._id !== carId));

                alert('Car deleted successfully.');
            } catch (error) {
                console.error('Error deleting car:', error);
                alert('Error deleting car.');
            }
        }
    };

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
                        <div
                            key={car._id}
                            className={`car-item ${activeCarId === car._id ? 'active' : ''}`} // Add active class based on state
                            onClick={() => handleShowDetails(car)}
                        >
                            <p><strong>Make:</strong> {car.make}</p>
                            <p><strong>Model:</strong> {car.carModel}</p>
                            <p><strong>Seller ID:</strong> {car.sellerId}</p>
                            <p><strong>Price:</strong> Rs. {car.price}</p>
                            <Button
    style={{ backgroundColor: 'white', border: 'none' }} // Set background color to white and remove border
    onClick={(e) => { e.stopPropagation(); handleDeleteCar(car._id); }}
>
    <FontAwesomeIcon color='black' icon={faTrash} />
</Button>

                        </div>
                    ))
                ) : (
                    <p>No cars found for this filter.</p>
                )}
            </div>

            {/* Modal for displaying car details */}
            {selectedCar && (
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Car Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>{selectedCar.make} {selectedCar.carModel}</h5>
                        <p><strong>Year:</strong> {selectedCar.year}</p>
                        <p><strong>KMs Driven:</strong> {selectedCar.kmsDriven}</p>
                        <p><strong>Price:</strong> Rs. {selectedCar.price}</p>
                        <p><strong>Seller ID:</strong> {selectedCar.sellerId}</p>
                        <p><strong>Status:</strong> {selectedCar.isSold ? 'Sold' : 'Available'}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default CarList;
