import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Profile.css';
import { useUserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Import the green tick icon

interface Notification {
  _id: string;
  userId: string;
  message: string;
  date: string;
  status: boolean;
}

interface Image {
  publicId: string;
  url: string;
}

interface UsedCar {
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
  orders: string[];
  sellerId: string;
  buyerId: string;
}

interface ServiceBooked {
  _id: string;
  Make: string;
  status: boolean;
  bookingDate: Date;
  price: number;
  car_model: string;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [carsSold, setCarsSold] = useState<UsedCar[]>([]);
  const [carsBought, setCarsBought] = useState<UsedCar[]>([]);
  const [servicesBooked, setServicesBooked] = useState<ServiceBooked[]>([]);
  const { user, logout } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'notifications' && user) {
          const response = await fetch(`http://localhost:3002/api/notifications/${user._id}`);
          const data: Notification[] = await response.json();
          setNotifications(data.filter((notification) => !notification.status));
        } else if (activeTab === 'carsSold' && user) {
          const response = await fetch(`http://localhost:3001/api/usedcars/seller/${user._id}`);
          const data: UsedCar[] = await response.json();
          setCarsSold(Array.isArray(data) ? data : []);
        } else if (activeTab === 'carsBought' && user) {
          const response = await fetch(`http://localhost:3001/api/usedcars/buyer/${user._id}`);
          const data: UsedCar[] = await response.json();
          setCarsBought(Array.isArray(data) ? data : []);
        } else if (activeTab === 'services' && user) {
          const response = await fetch(`http://localhost:5001/api/bookings/${user._id}`);
          const data: ServiceBooked[] = await response.json();
          setServicesBooked(data);
        }
      } catch (error) {
        console.error(`Error fetching data for ${activeTab} tab:`, error);
      }
    };
    fetchData();
  }, [activeTab, user]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await fetch(`http://localhost:3002/api/read/${notificationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: true }),
      });
      setNotifications(notifications.filter((notification) => notification._id !== notificationId));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const renderCars = (cars: UsedCar[]) => (
    <div className="row">
      {cars.map((car) => (
        <div className="col-md-4 mb-4" key={car._id}>
          <div className="card h-100 shadow-sm compact-card text-center">
            <img
              src={car.images.length > 0 ? car.images[0].url : 'fallback-image-url.jpg'}
              className="card-img-top"
              alt={car.carModel}
            />
            <div className="card-body">
              <h3 className="card-title car-make">{car.make}</h3>
              <h5 className="card-title">{car.carModel}</h5>
              <p className="card-text">Rs. {car.price}</p>
              <Link to={`/usedcar/${car._id}`} className="btn btn-dark text-white btn-lg">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container-fluid-profile">
        <aside className="sidebar-profile">
          <h5 className={`side-profile ${activeTab === 'personal' ? 'active-tab' : ''}`} onClick={() => setActiveTab('personal')}>Personal Info</h5>
          <h5 className={`side-profile ${activeTab === 'carsSold' ? 'active-tab' : ''}`} onClick={() => setActiveTab('carsSold')}>Cars Sold</h5>
          <h5 className={`side-profile ${activeTab === 'carsBought' ? 'active-tab' : ''}`} onClick={() => setActiveTab('carsBought')}>Cars Bought</h5>
          <h5 className={`side-profile ${activeTab === 'services' ? 'active-tab' : ''}`} onClick={() => setActiveTab('services')}>Booked Services</h5>
          <h5 className={`side-profile ${activeTab === 'notifications' ? 'active-tab' : ''}`} onClick={() => setActiveTab('notifications')}>Notifications</h5>
          {user && (
            <h5 className={`side-profile ${activeTab === 'logout' ? 'active-tab' : ''}`} onClick={handleLogout}>Logout</h5>
          )}
        </aside>

        <main className="mainprt-profile">
          {activeTab === 'personal' && (
            <section className="personal-info">
              <div className="mphead-personal-info-container">
                <h3 className="mphead-personal-info">Personal Information</h3>
                {user && <button className="edit-button">Edit</button>}
              </div>
              <div className="personal-info-details">
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>
                <p>Phone: {user?.phno}</p>
              </div>
            </section>
          )}

          {activeTab === 'carsSold' && (
            <section className="personal-info">
              <h3 className="mphead-personal-info">Cars Sold</h3>
              {renderCars(carsSold)}
            </section>
          )}

          {activeTab === 'carsBought' && (
            <section className="personal-info">
              <h3 className="mphead-personal-info">Cars Bought</h3>
              {renderCars(carsBought)}
            </section>
          )}

          {activeTab === 'services' && (
            <section className="personal-info">
              <h3 className="mphead-personal-info">Services Booked</h3>
              <div className="row">
                {servicesBooked.length > 0 ? (
                  servicesBooked.map((service) => (
                    <div className="col-md-4 mb-4" key={service._id}>
                      <div className="card h-100 shadow-sm compact-card text-center">
                        <div className="card-body">
                          <h3 className="card-title">{service.Make}</h3>
                          <p className="card-text">{service.car_model}</p>
                          <p className="card-price">Service Date: {new Date(service.bookingDate).toLocaleDateString()}</p>
                          <p className="card-status">Status: {service.status ? 'over' : 'pending'}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No services booked yet.</p>
                )}
              </div>
            </section>
          )}

          {activeTab === 'notifications' && (
            <section className="personal-info">
              <h3 className="mphead-personal-info">Notifications</h3>
              <div className="notifications">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div className="notification-item" key={notification._id}>
                      <p>
                        {notification.message}
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{ color: notification.status ? 'green' : 'green', marginLeft: '8px', cursor: 'pointer' }}
                          onClick={() => handleMarkAsRead(notification._id)}
                        />
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No notifications.</p>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
