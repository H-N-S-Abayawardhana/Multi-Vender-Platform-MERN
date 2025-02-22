import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import UserProfile from './Pages/UserProfile';
import Checkout from './Pages/CheckoutPage';
import SellerProfile from './Pages/UserProfile';
import AdminProfile from './Pages/UserProfile';
import BecomeSeller from './Pages/BecomeSeller';
import SellerDashboard from './Pages/seller/SellerDashboard';
import AddStore from './Pages/seller/AddStore';
import AddItems from './Pages/seller/AddItems';
import SellerNotifications from './Pages/seller/SellerNotifications';
import AdminNotificationPage from './Pages/admin/AdminNotificationPage';
import AdminDashboard from './Pages/admin/AdminDashboard';
import SellerRequests from './Pages/admin/SellerRequests';

// Import protected routes
//import { BuyerProtectedRoute, SellerProtectedRoute, AdminProtectedRoute } from './components/ProtectedRoutes';
import BuyerProtectedRoute from './components/BuyerProtectedRoute';
import SellerProtectedRoute from './components/SellerProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import StoreList from './Pages/seller/StoreList';
import StoreDetails from './Pages/seller/StoreDetails';



function App() {
  return (
    <Router>
      <div> <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<BuyerProtectedRoute><UserProfile /></BuyerProtectedRoute>} />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/seller-dashboard" element={<SellerProtectedRoute><SellerDashboard /></SellerProtectedRoute>} />
        <Route path="/add-store" element={<SellerProtectedRoute><AddStore /></SellerProtectedRoute>} />
        <Route path="/stores" element={<SellerProtectedRoute><StoreList /></SellerProtectedRoute>} />
        <Route path="/store/:id" element={<SellerProtectedRoute><StoreDetails /></SellerProtectedRoute>} />
        <Route path="/seller-profile" element={<SellerProtectedRoute><SellerProfile /></SellerProtectedRoute>} />
        <Route path="/add-items" element={<SellerProtectedRoute><AddItems /></SellerProtectedRoute>} />
        <Route path="/seller-notifications" element={<SellerProtectedRoute><SellerNotifications /></SellerProtectedRoute>} />
        <Route path="/admin-notifications" element={<AdminProtectedRoute><AdminNotificationPage/></AdminProtectedRoute >} />
        <Route path="/admin-dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
        <Route path="/seller-requests" element={<AdminProtectedRoute><SellerRequests /></AdminProtectedRoute>} />
        <Route path="/admin-profile" element={<AdminProtectedRoute><SellerProfile /></AdminProtectedRoute>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
