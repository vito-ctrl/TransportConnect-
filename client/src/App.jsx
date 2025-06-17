// App.jsx - Version avec protection par rôles
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ROLES, PERMISSIONS } from './components/AuthContext';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import RoleProtectedRoute, { UnauthorizedPage } from './pages/auth/RoleProtectedRoute';
import AuthRedirect from './pages/auth/AuthRedirect';
import Register from './pages/auth/Register';
import Login from './pages/auth/login';
import Dashboard from './pages/Dashbord';
import Profile from './pages/Profile';
import './App.css';
import Navbar from './components/Navbar';

// Composants d'exemple pour démontrer la protection par rôles
const AdminPanel = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Panneau d'Administration</h1>
        <p className="text-gray-600 mb-6">Réservé aux administrateurs uniquement.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-800">Gestion des utilisateurs</h3>
            <p className="text-red-600 text-sm">Créer, modifier, supprimer des utilisateurs</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800">Configuration système</h3>
            <p className="text-blue-600 text-sm">Paramètres globaux de l'application</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800">Rapports avancés</h3>
            <p className="text-green-600 text-sm">Analytics et statistiques détaillées</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ManagerDashboard = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tableau de bord Manager</h1>
        <p className="text-gray-600 mb-6">Interface pour les managers et superviseurs.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-800">Gestion d'équipe</h3>
            <p className="text-purple-600 text-sm">Superviser et gérer votre équipe</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-orange-800">Rapports de performance</h3>
            <p className="text-orange-600 text-sm">Analyser les performances de l'équipe</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// const UserProfile = () => (
//   <div className="min-h-screen bg-gray-50 py-8">
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="bg-white shadow rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Profil Utilisateur</h1>
//         <p className="text-gray-600">Accessible à tous les utilisateurs authentifiés.</p>
//       </div>
//     </div>
//   </div>
// );

const Analytics = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics</h1>
        <p className="text-gray-600 mb-6">Statistiques et analyses (Permission: VIEW_ANALYTICS requise).</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800">Metric {i}</h3>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Settings = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Paramètres</h1>
        <p className="text-gray-600 mb-6">Configuration (Permission: MANAGE_SETTINGS requise).</p>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800">Paramètres généraux</h3>
            <p className="text-gray-600">Configuration de base de l'application</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800">Sécurité</h3>
            <p className="text-gray-600">Paramètres de sécurité et authentification</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <div className="App">
          <Routes>
            {/* Routes publiques - redirection si déjà authentifié */}
            <Route 
              path="/login" 
              element={
                <AuthRedirect>
                  <Login />
                </AuthRedirect>
              } 
            />
            <Route 
              path="/register" 
              element={
                <AuthRedirect>
                  <Register />
                </AuthRedirect>
              } 
            />
            
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Routes protégées par rôles spécifiques */}
            <Route 
              path="/admin" 
              element={
                <RoleProtectedRoute 
                  requiredRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}
                  showFallback={false}
                >
                  <AdminPanel />
                </RoleProtectedRoute>
              } 
            />
            
            {/* Route avec rôle minimum requis */}
            <Route 
              path="/manager" 
              element={
                <RoleProtectedRoute 
                  minimumRole={ROLES.MANAGER}
                  showFallback={false}
                >
                  <ManagerDashboard />
                </RoleProtectedRoute>
              } 
            />
            
            {/* Routes protégées par permissions */}
            <Route 
              path="/analytics" 
              element={
                <RoleProtectedRoute 
                  requiredPermission={PERMISSIONS.VIEW_ANALYTICS}
                >
                  <Analytics />
                </RoleProtectedRoute>
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                <RoleProtectedRoute 
                  requiredPermission={PERMISSIONS.MANAGE_SETTINGS}
                >
                  <Settings />
                </RoleProtectedRoute>
              } 
            />
            
            {/* Route avec permissions multiples (AND logic) */}
            <Route 
              path="/user-management" 
              element={
                <RoleProtectedRoute 
                  requiredPermissions={[PERMISSIONS.READ_USERS, PERMISSIONS.WRITE_USERS]}
                >
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
                      <p className="text-gray-600">Nécessite les permissions READ_USERS et WRITE_USERS</p>
                    </div>
                  </div>
                </RoleProtectedRoute>
              } 
            />
            
            {/* Route par défaut */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Route catch-all */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;