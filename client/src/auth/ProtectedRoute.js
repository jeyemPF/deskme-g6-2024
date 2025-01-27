// src/auth/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); // or however you manage authentication
  const userRole = token ? JSON.parse(sessionStorage.getItem('userCredentials')).user.role : null;

  // Check if the user is authenticated and has the required role
  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/Error" replace />;
  }

  return children;
};

export default ProtectedRoute;
