import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protected Route Component - restricts access based on authentication and role
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, userRole } = useAuth();

  // If user is not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If route requires admin role and user is not admin, redirect to home
  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
