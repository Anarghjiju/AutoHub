import React, { useState } from 'react';
import { Navbar, Button, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css';
import logo from '../assets/image-admin.png';
import { Link } from 'react-router-dom';

import { useUserContext } from '../UserContext'; // Import context to get user info



const NavbarComponent: React.FC = () => {
  const { user, logout } = useUserContext(); // Access user info and logout function

  return (
    <div className='nav-main'>
      <Navbar bg="light" expand="lg" fixed="top">
        <img src={logo} alt="logo" />
        <Navbar.Brand className="mx-auto">
          <Link to='/'><h2><strong>AutoHub</strong></h2></Link>
        </Navbar.Brand>

        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Popover id="popover-basic">
              <Popover.Body>
                <div className="d-flex flex-column align-items-center">
                  <strong>{user?.name || "Guest"}</strong> {/* Show username or 'Guest' */}
                <Link to='/login'>  <Button variant="link" onClick={logout} className="text-danger mt-2">Logout</Button></Link>
                </div>
              </Popover.Body>
            </Popover>
          }
          rootClose // Closes the popover when clicked outside
        >
          <Button variant="outline-none" className="profile-icon">
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </Button>
        </OverlayTrigger>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
