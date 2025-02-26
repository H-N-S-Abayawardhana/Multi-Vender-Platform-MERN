import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../../assets/images/logo.png';

const SellerNavBar = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notifications count
  const fetchUnreadCount = async () => {
    try {
      const email = localStorage.getItem('email');
      if (!email) return;
      
      const response = await axios.get(`http://localhost:9000/api/notifications/${email}`);
      const unreadNotifications = response.data.filter(notification => !notification.isRead);
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Fetch count when component mounts and set up interval
  useEffect(() => {
    fetchUnreadCount();
    
    // Set up polling interval to check for new notifications
    const interval = setInterval(fetchUnreadCount, 30000); // Check every 30 seconds
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Handler for notification click - now navigates to notifications page
  const handleNotificationClick = (e) => {
    e.preventDefault();
    navigate('/seller-notifications');
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      
      const response = await fetch('http://localhost:9000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        // Clear ALL localStorage items
        localStorage.removeItem('token');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('email');
        localStorage.removeItem('userLevel');
        localStorage.removeItem('userData');
        localStorage.clear();

        // Show success message
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          timer: 1500
        });

        // Redirect to login page
        navigate('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to logout. Please try again.',
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img 
            src={logo} 
            alt="E-Commerce Logo" 
            height="40"
            className="d-inline-block align-top"
          />
        </Link>

        {/* Toggle button for mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* All items aligned to the right */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {/* Seller Dashboard Link */}
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/seller-dashboard">
                Dashboard
              </Link>
            </li>

            {/* Seller Products Link */}
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/my-products">
                My Products
              </Link>
            </li>

            {/* Seller Orders Link */}
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/my-orders">
                Orders
              </Link>
            </li>

            {/* Notification Icon - Updated to use Link component */}
            <li className="nav-item mx-3">
              <Link 
                to="/seller-notifications" 
                className="nav-link position-relative"
                onClick={handleNotificationClick}
              >
                <FaBell size={20} />
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                    <span className="visually-hidden">unread notifications</span>
                  </span>
                )}
              </Link>
            </li>

            {/* Profile Dropdown */}
            <li className="nav-item dropdown mx-3">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="profileDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <FaUser size={20} />
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li>
                  <Link className="dropdown-item" to="/seller-profile">
                    Seller Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/seller/settings">
                    Settings
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button 
                    className="dropdown-item" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SellerNavBar;