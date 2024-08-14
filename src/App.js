import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Events from './Events';
import Organization from './Organization';
import Home from './Home';
import Donate from './DonatePage';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Login from './Login';
import SignUp from './Signup';
import Navbar from './Navbar';
import AdminDashboard from './AdminDashboard';
import VolunteerManagement from './VolunteerManagement';
import VolunteerDashboard from './VolunteerDashboard'; // Import VolunteerDashboard component
import EventManagement from './EventManagement';
import DonateManagement from './DonateManagement';
import FeedbackManagement from './FeedbackManagement';
import ReviewManagement from './ReviewManagement';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const volunteerId = userData ? userData.volunteerId : null;
  return (
    <div className="App">
      <Router>
        <NavbarContainer isLoggedIn={isLoggedIn} userData={userData} setIsLoggedIn={setIsLoggedIn} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData} />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/events" element={<Events isLoggedIn={isLoggedIn} volunteerId={volunteerId}/>} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/donate" element={<Donate userData={userData} />} />
            <Route path="/contact" element={<ContactUs isLoggedIn={isLoggedIn}/>} />
            <Route path="/profile" element={<div></div>} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/volunteers" element={<VolunteerManagement />} />
            <Route path="/admin/events" element={<EventManagement />} />
            <Route path="/admin/donate" element={<DonateManagement/>} />
            <Route path="/admin/feedback" element={<FeedbackManagement/>} />
            <Route path="/admin/review" element={<ReviewManagement/>} />
            <Route path="/volunteer/dashboard" element={<VolunteerDashboard userData={userData} />} />
          </Routes>
        </div>
        <FooterContainer />
      </Router>
    </div>
  );
}

function NavbarContainer({ isLoggedIn, userData, setIsLoggedIn }) {
  const location = useLocation();
  const noNavbarPaths = ['/admin/dashboard', '/admin/events', '/admin/donate', '/admin/volunteers','/admin/feedback','/admin/review'];

  return !noNavbarPaths.includes(location.pathname) ? (
    <Navbar isLoggedIn={isLoggedIn} userData={userData} setIsLoggedIn={setIsLoggedIn} />
  ) : null;
}

function FooterContainer() {
  const location = useLocation();
  const noFooterPaths = ['/login', '/register', '/admin/dashboard', '/admin/events', '/admin/donate', '/admin/volunteers','/volunteer/dashboard','/admin/feedback','/admin/review'];

  return !noFooterPaths.includes(location.pathname) ? <Footer /> : null;
}

export default App;
