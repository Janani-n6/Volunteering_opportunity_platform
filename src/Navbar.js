import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import './App.css';

function Navbar({ isLoggedIn, userData, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    if (!dropdownVisible) {
      navigate('/volunteer/dashboard');
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isAdmin = userData && userData.name.includes('.admin');

  return (
    <div className="navbar">
      <div className="navbar-container">
        <img src='./logo.png' alt="Logo" className="nav-logo" />
        <nav>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/events" className="nav-link">Events</Link></li>
            <li><Link to="/organization" className="nav-link">Organization</Link></li>
            <li><Link to="/donate" className="nav-link">Donate</Link></li>
            <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
          </ul>
        </nav>
        <div className="nav-buttons">
          {isLoggedIn && !isAdmin ? (
            <div className="profile-container" ref={dropdownRef}>
              <img 
                src={userData.profileImage} 
                alt="Profile" 
                className="profile-image" 
                onClick={toggleDropdown}
              />
              <span className="profile-name">{userData.name.split('@')[0]}</span>
              <LogoutIcon className="logout-icon" onClick={handleLogout} />
            </div>
          ) : (
            <>
              <button className="nav-button"><Link to="/login" className="nav-button-link">Sign In</Link></button>
              <button className="nav-button"><Link to="/register" className="nav-button-link">Sign Up</Link></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
