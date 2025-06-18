// AuthContext.jsx - Simplified version with role-based access only
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Définition des rôles
export const ROLES = {
  ADMIN: 'admin',
  DRIVER: 'driver',
  SENDER: 'sender',
  GUEST: 'guest'
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
            parsedUser.role = ROLES.GUEST;
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
          userData.role = ROLES.GUEST;
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
          role: userData.role || ROLES.GUEST // Rôle par défaut
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

  // Vérifier si l'utilisateur est un conducteur
  const isDriver = () => {
    return hasRole(ROLES.DRIVER);
  };

  // Vérifier si l'utilisateur est un admin
  const isAdmin = () => {
    return hasRole(ROLES.ADMIN);
  };

  // Vérifier si l'utilisateur est un expéditeur
  const isSender = () => {
    return hasRole(ROLES.SENDER);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
    isDriver,
    isAdmin,
    isSender,
    // Constantes exportées pour faciliter l'utilisation
    ROLES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};