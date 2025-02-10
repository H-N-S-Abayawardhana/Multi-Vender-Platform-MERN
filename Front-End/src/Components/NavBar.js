import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBell } from 'react-icons/fa';
import Swal from 'sweetalert2';
import logo from '../assets/images/logo.png';

const NavBar = () => {
  // Handler for cart click
  const handleCartClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Shopping Cart',
      text: 'Your shopping cart is empty!',
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Continue Shopping'
    });
  };

  // Handler for notification click
  const handleNotificationClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Notifications',
      text: 'You have no new notifications',
      icon: 'info',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    });
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
            {/* Notification Icon */}
            <li className="nav-item mx-3">
              <a className="nav-link position-relative" href="#" onClick={handleNotificationClick}>
                <FaBell size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                  <span className="visually-hidden">unread notifications</span>
                </span>
              </a>
            </li>

            {/* Cart Icon */}
            <li className="nav-item mx-3">
              <a className="nav-link position-relative" href="#" onClick={handleCartClick}>
                <FaShoppingCart size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                  <span className="visually-hidden">items in cart</span>
                </span>
              </a>
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
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link className="dropdown-item" to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>

            {/* Become a Seller Button */}
            <li className="nav-item mx-3">
              <Link className="btn btn-primary" to="/become-seller">
                Become a Seller
              </Link>
            </li>

            {/* Auth Buttons */}
            <li className="nav-item mx-3">
              <Link className="btn btn-outline-dark" to="/login">
                Sign In
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="btn btn-dark" to="/register">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;