// AuthContext.jsx - Version améliorée avec gestion des rôles
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Définition des rôles et permissions
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  GUEST: 'guest'
};

export const PERMISSIONS = {
  READ_USERS: 'read_users',
  WRITE_USERS: 'write_users',
  DELETE_USERS: 'delete_users',
  READ_REPORTS: 'read_reports',
  WRITE_REPORTS: 'write_reports',
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_ANALYTICS: 'view_analytics'
};

// Mapping des rôles vers les permissions
const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.READ_USERS,
    PERMISSIONS.WRITE_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.READ_REPORTS,
    PERMISSIONS.WRITE_REPORTS,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.VIEW_ANALYTICS
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.READ_USERS,
    PERMISSIONS.WRITE_USERS,
    PERMISSIONS.READ_REPORTS,
    PERMISSIONS.WRITE_REPORTS,
    PERMISSIONS.VIEW_ANALYTICS
  ],
  [ROLES.USER]: [
    PERMISSIONS.READ_REPORTS,
    PERMISSIONS.VIEW_ANALYTICS
  ],
  [ROLES.GUEST]: [
    PERMISSIONS.READ_REPORTS
  ]
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          // Assurer que l'utilisateur a un rôle par défaut
          if (!parsedUser.role) {
            parsedUser.role = ROLES.USER;
          }
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const { user: userData, token } = data;
        
        // Assurer que l'utilisateur a un rôle
        if (!userData.role) {
          userData.role = ROLES.USER;
        }
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setUser(userData);
        return { success: true, user: userData };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          role: userData.role || ROLES.USER // Rôle par défaut
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user: newUser, token } = data;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(newUser));
        
        setUser(newUser);
        return { success: true, user: newUser };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (requiredRole) => {
    if (!user || !user.role) return false;
    
    // Si c'est un tableau de rôles
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    return user.role === requiredRole;
  };

  // Vérifier si l'utilisateur a une permission spécifique
  const hasPermission = (permission) => {
    if (!user || !user.role) return false;
    
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    
    // Si c'est un tableau de permissions
    if (Array.isArray(permission)) {
      return permission.every(p => userPermissions.includes(p));
    }
    
    return userPermissions.includes(permission);
  };

  // Vérifier si l'utilisateur a au moins une des permissions
  const hasAnyPermission = (permissions) => {
    if (!user || !user.role) return false;
    
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.some(p => userPermissions.includes(p));
  };

  // Obtenir toutes les permissions de l'utilisateur
  const getUserPermissions = () => {
    if (!user || !user.role) return [];
    return ROLE_PERMISSIONS[user.role] || [];
  };

  // Vérifier la hiérarchie des rôles
  const hasRoleOrHigher = (minimumRole) => {
    if (!user || !user.role) return false;
    
    const roleHierarchy = [
      ROLES.GUEST,
      ROLES.USER,
      ROLES.MANAGER,
      ROLES.ADMIN,
      ROLES.SUPER_ADMIN
    ];
    
    const userRoleIndex = roleHierarchy.indexOf(user.role);
    const requiredRoleIndex = roleHierarchy.indexOf(minimumRole);
    
    return userRoleIndex >= requiredRoleIndex;
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasRoleOrHigher,
    getUserPermissions,
    // Constantes exportées pour faciliter l'utilisation
    ROLES,
    PERMISSIONS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};