import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Profile.css';
import { useUserContext } from '../UserContext';
import { Link } from 'react-router-dom';

interface Notification {
  _id: string;
  userId: string;
  message: string;
  date: string;
  status: boolean;
}

interface CarImage {
  publicId: string;
  url: string;
}

interface UsedCar {
  _id: string;
  make: string;
  carModel: string;
  price: number;
  images: CarImage[];
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
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [carsSold, setCarsSold] = useState<UsedCar[]>([]);
  const [carsBought, setCarsBought] = useState<UsedCar[]>([]);
  const [servicesBooked, setServicesBooked] = useState<ServiceBooked[]>([]);
  const { user, logout } = useUserContext();

  useEffect(() => {
    if (activeTab === 'notifications') {
      if (user) {
        fetch(`http://localhost:3002/api/notifications/${user._id}`)
          .then((response) => response.json())
          .then((data: Notification[]) => {
            const unreadNotifications = data.filter(notification => !notification.status);
            setNotifications(unreadNotifications);
          })
          .catch((error) => console.error('Error fetching notifications:', error));
      }
    }

    // Fetch cars sold and bought when respective tabs are active
    if (activeTab === 'carsSold' && user) {
      fetch(`http://localhost:3001/api/usedcars/seller/${user._id}`)
        .then((response) => response.json())
        .then((data: UsedCar[]) => {
          setCarsSold(data);
        })
        .catch((error) => console.error('Error fetching sold cars:', error));
    }

    if (activeTab === 'carsBought' && user) {
      fetch(`http://localhost:3001/api/usedcars/buyer/${user._id}`)
        .then((response) => response.json())
        .then((data: UsedCar[]) => {
          setCarsBought(data);
        })
        .catch((error) => console.error('Error fetching bought cars:', error));
    }

    // Fetch booked services when the services tab is active
    if (activeTab === 'services' && user) {
      fetch(`http://localhost:5001/api/bookings/${user._id}`)
        .then((response) => response.json())
        .then((data: ServiceBooked[]) => {
          setServicesBooked(data);
        })
        .catch((error) => console.error('Error fetching booked services:', error));
    }
  }, [activeTab, user]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await fetch(`http://localhost:3002/api/read/${notificationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: true }),
      });
      setNotifications(notifications.filter(notification => notification._id !== notificationId));
      setSelectedNotification(null);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

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
              <div className='mphead-personal-info-container'>
                <h3 className="mphead-personal-info">Personal Information</h3>
                {user && <button className='edit-button'>Edit</button>}
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
              <div className="row">
                {carsSold.map((car) => (
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
                        <Link to={`/usedcar/${car._id}`} className="btn btn-dark text-white btn-lg">View Details</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'carsBought' && (
            <section className="personal-info">
              <h3 className="mphead-personal-info">Cars Bought</h3>
              <div className="row">
                {carsBought.map((car) => (
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
                        <Link to={`/usedcar/${car._id}`} className="btn btn-dark text-white btn-lg">View Details</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                          <p className="card-status">Status: {service.status ? "over" : "pending"}</p>
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
                      <p>{notification.message}</p>
                      <button onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button>
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
