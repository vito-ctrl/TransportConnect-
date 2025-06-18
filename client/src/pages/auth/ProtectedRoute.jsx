// RoleProtectedRoute.jsx - Simplified role-based protection
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';

// Page d'accès non autorisé
export const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h1>
      <p className="text-gray-600 mb-6">
        Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
      </p>
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Retour
      </button>
    </div>
  </div>
);

const RoleProtectedRoute = ({ 
  children, 
  requiredRole,
  requiredRoles,
  showFallback = true,
  fallbackComponent = UnauthorizedPage 
}) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();
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

  // Vérifier les rôles requis
  let hasRequiredRole = false;

  if (requiredRole) {
    hasRequiredRole = hasRole(requiredRole);
  } else if (requiredRoles) {
    hasRequiredRole = hasRole(requiredRoles);
  }

  // Si l'utilisateur n'a pas le rôle requis
  if (!hasRequiredRole) {
    if (showFallback) {
      const FallbackComponent = fallbackComponent;
      return <FallbackComponent />;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Si tout est bon, rendre le composant enfant
  return children;
};

export default RoleProtectedRoute;