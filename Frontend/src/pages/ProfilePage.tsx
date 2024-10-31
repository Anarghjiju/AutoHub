import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/profile.css'

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div>
      <Navbar />
      <div className="container-fluid-profile">
        <div className="sidebar-profile">
          <h5 className="side-profile" onClick={() => setActiveTab('personal')}>
            Personal Info
          </h5>
          <hr />
          <h5 className="side-profile" onClick={() => setActiveTab('carsSold')}>
            Cars Sold
          </h5>
          <hr />
          <h5 className="side-profile" onClick={() => setActiveTab('carsBought')}>
            Cars Bought
          </h5>
          <hr />
        </div>
        <div className="mainprt-profile">
          {activeTab === 'personal' && (
            <div className='personal-info'>
              <h3 className="mphead-personal-info">Personal Information</h3>
              <div className='personal-info-details'>
                <p>Name: John Doe</p>
                <p>Email: johndoe@example.com</p>
                <p>Phone: 123-456-7890</p>
              </div>
            </div>
          )}

          {activeTab === 'carsSold' && (
            <div className='personal-info'>
              <h3 className="mphead-personal-info">Cars Sold</h3>
              <div className='listing-admin'>
                <div className="car-box">
                  <img className="car-image" src="car-image-url" alt="Car Model" />
                  <h3 className="car-name">Toyota Camry</h3>
                  <p className="car-details">Year: 2019</p>
                  <p className="car-price">Price: $15,000</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'carsBought' && (
            <div className='personal-info'>
              <h3 className="mphead-personal-info">Cars Bought</h3>
              <div className='listing-admin'>
                <div className="car-box">
                  <img className="car-image" src="car-image-url" alt="Car Model" />
                  <h3 className="car-name">Ford Mustang</h3>
                  <p className="car-details">Year: 2020</p>
                  <p className="car-price">Price: $25,000</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
