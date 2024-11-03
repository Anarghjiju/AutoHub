import React from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css'
import logo from '../assets/image-admin.png'
import { Link } from 'react-router-dom';
const NavbarComponent: React.FC = () => {
  return (
    <div className='nav-main'>
    <Navbar bg="light" expand="lg" fixed="top">
     <img src={logo}></img>
      <Navbar.Brand className="mx-auto"><Link to = '/'><h2><strong>AutoHub</strong></h2></Link></Navbar.Brand>
      <Button variant="outline-none">
        <FontAwesomeIcon icon={faUserCircle} size="lg" />
      </Button>
    </Navbar>
    </div>
  );
};

export default NavbarComponent;
