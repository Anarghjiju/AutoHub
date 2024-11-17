import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/orderList.css';

const OrderList: React.FC = () => {
    const [cars, setCars] = useState<any[]>([]);
    const [selectedCar, setSelectedCar] = useState<any | null>(null);
    const [userDetails, setUserDetails] = useState<any[]>([]);
    const [filter, setFilter] = useState<'all' | 'confirmed' | 'unconfirmed'>('all');
    const [confirmedUserId, setConfirmedUserId] = useState<string | null>(null);

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

    const openPopup = (car: any) => {
        setSelectedCar(car);
        fetchUserDetails(car.orders);
        setConfirmedUserId(car.buyerId || null);
    };

    const closePopup = () => {
        setSelectedCar(null);
        setUserDetails([]);
        setConfirmedUserId(null);
    };

    const confirmPurchase = async (userId: string) => {
        if (!selectedCar) return;

        try {
            await axios.patch(`http://localhost:3001/api/usedcars/${selectedCar._id}/buyer`, { buyerId: userId });
            setConfirmedUserId(userId);
            closePopup();
        } catch (error) {
            console.error('Error confirming purchase:', error);
        }
    };

    const deleteOrder = async (userId: string) => {
        if (!selectedCar) return;

        try {
            await axios.patch(`http://localhost:3001/api/usedcars/remove-order/${selectedCar._id}`, { userId });
            // Refresh user details by removing the deleted user
            setUserDetails(prev => prev.filter(user => user._id !== userId));
            // Refresh car data by removing the user from orders
            setCars(prev =>
                prev.map(car =>
                    car._id === selectedCar._id
                        ? { ...car, orders: car.orders.filter((order: string) => order !== userId) }
                        : car
                )
            );
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const filteredCars = cars.filter(car => {
        if (filter === 'confirmed') return car.buyerId;
        if (filter === 'unconfirmed') return !car.buyerId;
        return true;
    });

    return (
        <div className="order-list">
            <h3>Cars with Orders</h3>
            <div className="filter-toggle">
                <button 
                    className={`btn ${filter === 'all' ? 'btn-light' : 'btn-outline-light'}`} 
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button 
                    className={`btn ${filter === 'confirmed' ? 'btn-light' : 'btn-outline-light'}`} 
                    onClick={() => setFilter('confirmed')}
                >
                    Confirmed
                </button>
                <button 
                    className={`btn ${filter === 'unconfirmed' ? 'btn-light' : 'btn-outline-light'}`} 
                    onClick={() => setFilter('unconfirmed')}
                >
                    Unconfirmed
                </button>
            </div>

            {filteredCars.length === 0 ? (
                <p>No cars with orders found for this filter.</p>
            ) : (
                <ul>
                    {filteredCars.map(car => (
                        <li key={car._id} onClick={() => openPopup(car)}>
                            <h5>{car.make} {car.carModel} ({car.year})</h5>
                            <p>Price: ${car.price}</p>
                            <p>Orders Count: {car.orders.length}</p>
                        </li>
                    ))}
                </ul>
            )}

            {selectedCar && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-btn" onClick={closePopup}>×</button>
                        <h3>{selectedCar.make} {selectedCar.carModel} ({selectedCar.year})</h3>
                        <p>Price: ${selectedCar.price}</p>
                        <h4>Orders:</h4>
                        {userDetails.length > 0 ? (
                            <ul>
                                {userDetails.map((user: any, index: number) => (
                                    <li key={index} className="user-detail-item">
                                        <p>- Name: {user.name}</p>
                                        <p>- Email: {user.email}</p>
                                        <div className="user-contact">
                                            <p>- Phone: {user.phno}</p>
                                            {confirmedUserId === user._id ? (
                                                <p className="confirmed-info">Ordered by: {user.name}</p>
                                            ) : (
                                                <>
                                                    <button 
                                                        className="confirm-btn" 
                                                        onClick={() => confirmPurchase(user._id)} 
                                                        disabled={!!confirmedUserId}
                                                    >
                                                        Confirm Purchase
                                                    </button>
                                                    <button 
                                                        className="delete-btn" 
                                                        onClick={() => deleteOrder(user._id)}
                                                    >
                                                        Delete Order
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No orders found for this car.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
