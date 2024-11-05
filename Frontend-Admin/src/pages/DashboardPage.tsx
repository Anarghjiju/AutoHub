import React, { useState } from 'react';
import NavbarComponent from '../components/Navbar';
import SidebarComponent from '../components/Sidebar';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import ApproveCarList from '../components/ApproveCarListing';
import CarList from '../components/CarList';
import ServiceProviderList from '../components/ServiceProviderList';
import UserList from '../components/UserList';
import OrderList from '../components/OrderList';

const DashboardPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');

 

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <SidebarComponent 
        onOptionSelect={handleOptionSelect} 
      />
      <NavbarComponent />

      <div 
        className="content-area" 
         // Adjust margin based on expanded state
      >
        {selectedOption === 'dashboard' && <AnalyticsDashboard />}
        {selectedOption === 'approve' && <ApproveCarList />}
        {selectedOption === 'carList' && <CarList />}
        {selectedOption === 'user' && <UserList />}
        {selectedOption === 'service' && <ServiceProviderList />}
        {selectedOption === 'order' && <OrderList />}
      </div>
    </div>
  );
};

// Define other content components
const ManageUsersContent = () => <div>Manage Users Content</div>;

export default DashboardPage;
