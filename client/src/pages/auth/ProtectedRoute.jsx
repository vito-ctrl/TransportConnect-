// ProtectedRoute.jsx - Protection basique par authentification
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Afficher le spinner de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  // Rediriger vers login si pas authentifié
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si authentifié, rendre le composant enfant
  return children;
};

export default ProtectedRoute;