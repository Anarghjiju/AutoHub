import React, { useEffect, useState } from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import '../styles/orderList.css';

const OrderList: React.FC = () => {
    const [cars, setCars] = useState<any[]>([]);
    const [selectedCar, setSelectedCar] = useState<any | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState<any[]>([]);
    const [filter, setFilter] = useState<'all' | 'confirmed' | 'unconfirmed'>('all');
    const [confirmedUserId, setConfirmedUserId] = useState<string | null>(null); // Track confirmed user ID

    useEffect(() => {
        const fetchCarsWithOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/usedcars/orders');
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars with orders:', error);
            }
        };

        fetchCarsWithOrders();
    }, []);

    const fetchUserDetails = async (orderIds: string[]) => {
        try {
            const userRequests = orderIds.map(orderId =>
                axios.get(`http://localhost:3003/api/users/data/${orderId}`)
            );
            const responses = await Promise.all(userRequests);
            const users = responses.map(response => response.data);
            setUserDetails(users);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const openModal = (car: any) => {
        setSelectedCar(car);
        fetchUserDetails(car.orders);
        setConfirmedUserId(null); // Reset confirmed user ID when opening modal
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCar(null);
        setUserDetails([]);
        setConfirmedUserId(null); // Reset confirmed user ID on modal close
    };

    const confirmPurchase = async (userId: string) => {
        if (!selectedCar) return;

        try {
            await axios.patch(`http://localhost:3001/api/usedcars/${selectedCar._id}/buyer`, { buyerId: userId });
            setSelectedCar({ ...selectedCar, buyerId: userId });
            setConfirmedUserId(userId); // Set the confirmed user ID
            console.log(`User ${userId} has been confirmed as the buyer.`); // Debug log
            alert(`User ${userId} has been confirmed as the buyer.`);
            closeModal();
        } catch (error) {
            console.error('Error confirming purchase:', error);
        }
    };

    const filteredCars = cars.filter(car => {
        if (filter === 'confirmed') return car.buyerId; // Only confirmed orders
        if (filter === 'unconfirmed') return !car.buyerId; // Only unconfirmed orders
        return true; // All orders
    });

    return (
        <div className="order-list">
            <h3>Cars with Orders</h3>
            <ButtonGroup className="filter-toggle">
                <Button variant={filter === 'all' ? 'light' : 'outline-light'} onClick={() => setFilter('all')}>
                    All
                </Button>
                <Button variant={filter === 'confirmed' ? 'light' : 'outline-light'} onClick={() => setFilter('confirmed')}>
                    Confirmed
                </Button>
                <Button variant={filter === 'unconfirmed' ? 'light' : 'outline-light'} onClick={() => setFilter('unconfirmed')}>
                    Unconfirmed
                </Button>
            </ButtonGroup>

            {filteredCars.length === 0 ? (
                <p>No cars with orders found for this filter.</p>
            ) : (
                <ul>
                    {filteredCars.map(car => (
                        <li key={car._id} onClick={() => openModal(car)}>
                            <h5>{car.make} {car.carModel} ({car.year})</h5>
                            <p>Price: ${car.price}</p>
                            <p>Orders Count: {car.orders.length}</p>
                        </li>
                    ))}
                </ul>
            )}

            <Modal show={modalIsOpen} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Car Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCar && (
                        <>
                            <h3>{selectedCar.make} {selectedCar.carModel} ({selectedCar.year})</h3>
                            <p>Price: ${selectedCar.price}</p>
                            <h4>Orders:</h4>
                            {userDetails.length > 0 ? (
                                <ul>
                                    {userDetails.map((user: any, index: number) => (
                                        <li key={index}>
                                            <span>- Name: {user.name} <br /> - Email: {user.email}</span>
                                            <Button 
                                                variant="success" 
                                                onClick={() => confirmPurchase(user._id)} 
                                                disabled={confirmedUserId !== null} // Disable if any user is confirmed
                                                style={{ marginLeft: '10px' }}
                                            >
                                                {confirmedUserId === user._id ? 'Confirmed' : 'Confirm Purchase'}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No orders found for this car.</p>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrderList;
