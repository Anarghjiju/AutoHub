import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faUser, faScrewdriverWrench, faCarBurst, faCarAlt, faCarBattery, faCarOn, faCarSide, faCarTunnel } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css';

interface SidebarComponentProps {
  onOptionSelect: (option: string) => void;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ onOptionSelect }) => {
  const options = [
    { icon: faHome, name: 'Dashboard', key: 'dashboard' },
    { icon: faCar, name: 'Approve cars',  key: 'approve' },
    { icon: faCarOn, name: 'Listed Cars', key: 'carList' },
    { icon: faUser, name: 'Manage users', key: 'user' },
    { icon: faScrewdriverWrench, name: 'Manage service providers',  key: 'service' },
  ];

  return (
    <div className="sidebar expanded"> {/* Always use the 'expanded' class */}
      <Nav className="flex-column">
        {options.map((option) => (
          <Nav.Link 
            key={option.key} 
            className="d-flex align-items-center" 
            onClick={() => onOptionSelect(option.key)} 
          >
            <FontAwesomeIcon icon={option.icon} className="me-2" />
            <span>{option.name}</span> {/* Always show the name */}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default SidebarComponent;
