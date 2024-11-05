// src/UserProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from './UserContext';

const UserProtectedRoute: React.FC = () => {
  const { user } = useUserContext();

  if (!user) {
    // Redirect to login if not authenticated, replacing the current history entry
    return <Navigate to="/login" replace />;
  }

  // Allow access if authenticated
  return <Outlet />;
};

export default UserProtectedRoute;
