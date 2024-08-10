import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import EventIcon from '@mui/icons-material/Event';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import RateReviewIcon from '@mui/icons-material/RateReview'; // Import the review icon
import './sidebar.css';

const Sidebar = ({ adminData }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.png" alt="Logo" className='nav-logo'/>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/admin/dashboard" className="sidebar-link">
            <DashboardIcon className="sidebar-icon" />
            Dashboard
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/volunteers" className="sidebar-link">
            <VolunteerActivismIcon className="sidebar-icon" />
            Volunteer Management
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/events" className="sidebar-link">
            <EventIcon className="sidebar-icon" />
            Event Management
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/donate" className="sidebar-link">
            <CurrencyRupeeIcon className="sidebar-icon" />
            Donation Management
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/feedback" className="sidebar-link">
            <StarIcon className="sidebar-icon" />
            Feedback Management
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/review" className="sidebar-link">
            <RateReviewIcon className="sidebar-icon" /> {/* New Review Icon */}
            Review
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
