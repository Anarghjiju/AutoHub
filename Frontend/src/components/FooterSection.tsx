import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <h2 className="footer-logo">AutoHub</h2>
          <p>Contact Information</p>
          <a href="#privacy-policy">Privacy Policy</a>
        </div>
        
        <div className="footer-section sitemap-section">
          <h3>Site Map</h3>
          <ul>
            
            <li><a href="#contact">Contact</a></li>
            <li><a href="#About">About</a></li>
          </ul>
        </div>
        
        <div className="footer-section subscribe-section">
          <div className="social-icons">
            <a href="#instagram"><InstagramIcon/></a>
            <a href="#twitter"><XIcon/></a>
            <a href="#linkedIn"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
