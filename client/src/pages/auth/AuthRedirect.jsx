import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const AuthRedirect = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  // If already authenticated, redirect to dashboard
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, show the auth component (login/register)
  return children;
};

export default AuthRedirect;