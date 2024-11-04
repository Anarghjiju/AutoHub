import React, { useState } from 'react';
import NavbarComponent from '../components/Navbar';
import SidebarComponent from '../components/Sidebar';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import ApproveCarList from '../components/ApproveCarListing';
import CarList from '../components/CarList';

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
        {selectedOption === 'user' && <ManageUsersContent />}
        {selectedOption === 'service' && <ManageServiceProvidersContent />}
      </div>
    </div>
  );
};

// Define other content components
const ApproveCarsContent = () => <div>Approve Cars Content</div>;
const ManageUsersContent = () => <div>Manage Users Content</div>;
const ManageServiceProvidersContent = () => <div>Manage Service Providers Content</div>;

export default DashboardPage;
