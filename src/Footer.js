import React from 'react';
import './Footer.css';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-section about">
        <h2>About Us</h2>
        <p>
          At Real-Time Volunteering Opportunities, we connect passionate individuals with meaningful volunteer roles. Our platform empowers volunteers and organizations to make a positive impact in communities worldwide. Join us in fostering change through the power of volunteering.
        </p>
        <a href="/organization">Read More</a>
      </div>

      <div className="footer-section contact">
        <h2>Contact Information</h2>
        <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Main St, Anytown, USA</p>
        <div className="social-icons">
          <a href="https://facebook.com"><Facebook /></a>
          <a href="https://twitter.com"><Twitter /></a>
          <a href="https://linkedin.com"><LinkedIn /></a>
          <a href="https://instagram.com"><Instagram /></a>
        </div>
      </div>
      
      <div className="footer-section links">
        <h2>Quick Links</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/organization">About Us</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/donate">Donate</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
      
      <div className="footer-section support">
        <h2>Support Us</h2>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'white',
            color: '#ff7043',
            '&:hover': {
              backgroundColor: '#ff7043',
              color: 'white',
            },
          }}
          className="donate-button"
          onClick={() => navigate('/donate')}
        >
          Donate
        </Button>
      </div>
      
      <div className="footer-section resources">
        <h2>Resources</h2>
        <ul>
          <li><a href="/volunteer-resources">Volunteer Resources</a></li>
          <li><a href="/organization-resources">Organization Resources</a></li>
          <li><a href="/success-stories">Success Stories</a></li>
          <li><a href="/newsletters">Newsletters</a></li>
        </ul>
      </div>
      
      <div className="footer-section legal">
        <h2>Legal</h2>
        <ul>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
          <li><a href="/cookie-policy">Cookie Policy</a></li>
        </ul>
      </div>
      
      
    </footer>
  );
}

export default Footer;
