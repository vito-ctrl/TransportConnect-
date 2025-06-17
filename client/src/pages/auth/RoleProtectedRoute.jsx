// RoleProtectedRoute.jsx - Protection avancée par rôles et permissions
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import { AlertTriangle, Lock, ArrowLeft } from 'lucide-react';

// Page d'accès non autorisé
export const UnauthorizedPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès Non Autorisé</h1>
          
          <p className="text-gray-600 mb-6">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          
          {user && (
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <div className="text-sm text-gray-600">
                <p><strong>Utilisateur:</strong> {user.user || user.email}</p>
                <p><strong>Rôle actuel:</strong> {user.role?.replace('_', ' ').toUpperCase()}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </button>
            
            <a
              href="/dashboard"
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Aller au Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant principal de protection par rôles
const RoleProtectedRoute = ({ 
  children, 
  requiredRoles = [],
  requiredRole = null,
  minimumRole = null,
  requiredPermission = null,
  requiredPermissions = [],
  anyPermission = false,
  showFallback = true,
  fallbackComponent = null
}) => {
  const { 
    isAuthenticated, 
    isLoading, 
    user,
    hasRole, 
    hasRoleOrHigher, 
    hasPermission,
    hasAnyPermission
  } = useAuth();
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

  // Vérification des rôles spécifiques
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return showFallback ? 
      (fallbackComponent || <Navigate to="/unauthorized" replace />) : 
      <Navigate to="/unauthorized" replace />;
  }

  // Vérification d'un rôle unique
  if (requiredRole && !hasRole(requiredRole)) {
    return showFallback ? 
      (fallbackComponent || <Navigate to="/unauthorized" replace />) : 
      <Navigate to="/unauthorized" replace />;
  }

  // Vérification du rôle minimum (hiérarchie)
  if (minimumRole && !hasRoleOrHigher(minimumRole)) {
    return showFallback ? 
      (fallbackComponent || <Navigate to="/unauthorized" replace />) : 
      <Navigate to="/unauthorized" replace />;
  }

  // Vérification d'une permission unique
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return showFallback ? 
      (fallbackComponent || <Navigate to="/unauthorized" replace />) : 
      <Navigate to="/unauthorized" replace />;
  }

  // Vérification de permissions multiples (toutes requises)
  if (requiredPermissions.length > 0 && !hasPermission(requiredPermissions)) {
    return showFallback ? 
      (fallbackComponent || <Navigate to="/unauthorized" replace />) : 
      <Navigate to="/unauthorized" replace />;
  }

  // Vérification d'au moins une permission parmi plusieurs
  if (anyPermission && requiredPermissions.length > 0 && !hasAnyPermission(requiredPermissions)) {
    return showFallback ? 
      (fallbackComponent || <Navigate to="/unauthorized" replace />) : 
      <Navigate to="/unauthorized" replace />;
  }

  // Si toutes les vérifications passent, rendre le composant enfant
  return children;
};

export default RoleProtectedRoute;