import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div>
      <Navbar />
      <div className="container-fluid-profile">
        <aside className="sidebar-profile">
          <h5
            className={`side-profile ${activeTab === 'personal' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </h5>
          <h5
            className={`side-profile ${activeTab === 'carsSold' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('carsSold')}
          >
            Cars Sold
          </h5>
          <h5
            className={`side-profile ${activeTab === 'carsBought' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('carsBought')}
          >
            Cars Bought
          </h5>
          <h5
            className={`side-profile ${activeTab === 'services' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Booked Services
          </h5>
        </aside>
        
        <main className="mainprt-profile">
          {activeTab === 'personal' && (
            <section className="personal-info">
              <div className='mphead-personal-info-container'> 
              <h3 className="mphead-personal-info">Personal Information</h3>
              <button className='edit-button'>Edit</button>
              </div>
              <div className="personal-info-details">
                <p>Name: John Doe</p>
                <p>Email: johndoe@example.com</p>
                <p>Phone: 123-456-7890</p>
              </div>
            </section>
          )}

          {activeTab === 'carsSold' && (
            <section className="personal-info">
              <h3 className="mphead-personal-info">Cars Sold</h3>
              <div className="listing-admin">
                <div className="car-box">
                  <img className="car-image" src="car-image-url" alt="Car Model" />
                  <h4 className="car-name">Toyota Camry</h4>
                  <p className="car-details">Year: 2019</p>
                  <p className="car-price">Price: $15,000</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'carsBought' && (
            <section className="personal-info">
              <h3 className="mphead-personal-info">Cars Bought</h3>
              <div className="listing-admin">
                <div className="car-box">
                  <img className="car-image" src="car-image-url" alt="Car Model" />
                  <h4 className="car-name">Ford Mustang</h4>
                  <p className="car-details">Year: 2020</p>
                  <p className="car-price">Price: $25,000</p>
                </div>
              </div>
            </section>
          )}

          
         {activeTab === 'services' && (
            <section className="personal-info">
              <h3 className="mphead-personal-info">Services Booked</h3>
              <div className="listing-admin">
                <div className="car-box">
                  <h4 className="car-name">Maruthi Service</h4>
                  <p className="car-details">General services</p>
                  <p className="car-price">Service Date : 10-07-2024</p>
                  <p className="car-price">Price : Rs. 1000</p>
                </div>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default Profile;
