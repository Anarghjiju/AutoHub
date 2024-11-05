// src/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from './UserContext';

interface ProtectedRouteProps {
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ adminOnly = true }) => {
  const { user } = useUserContext();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    // If adminOnly is true but user is not an admin, block access
    return <Navigate to="/login" />;
  }

  // Allow access if authenticated (and admin if required)
  return <Outlet />;
};

export default ProtectedRoute;
