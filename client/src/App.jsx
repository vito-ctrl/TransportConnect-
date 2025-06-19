// App.jsx - Simplified version with role-based protection
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ROLES } from './components/AuthContext';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import RoleProtectedRoute, { UnauthorizedPage } from './pages/auth/RoleProtectedRoute';
import AuthRedirect from './pages/auth/AuthRedirect';
import Register from './pages/auth/Register';
import Login from './pages/auth/login';
import Dashboard from './pages/Dashbord';
import Profile from './pages/Profile';
import TrajetsPage from './pages/traject/TrajetsPage'
import './App.css';
import Navbar from './components/Navbar';
import MyTrajets from './pages/traject/MyTrajets';
import TargetForm from './pages/traject/TrajectForm'

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

const RequestsPage = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mes Demandes</h1>
        <p className="text-gray-600 mb-6">Gérez vos demandes d'expédition.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800">Nouvelle demande</h3>
            <p className="text-green-600 text-sm">Créer une nouvelle demande d'expédition</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800">Demandes en cours</h3>
            <p className="text-blue-600 text-sm">Suivre l'état de vos demandes</p>
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
            
            {/* Routes protégées par authentification */}
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
            
            {/* Route trajets - Réservée aux conducteurs uniquement */}
            <Route 
              path="/trajetForm" 
              element={
                <RoleProtectedRoute 
                  requiredRole={ROLES.DRIVER}
                  showFallback={true}
                >
                  <TargetForm />
                </RoleProtectedRoute>
              } 
            />

            <Route 
              path="/MyTrajets" 
              element={
                <RoleProtectedRoute 
                  requiredRole={ROLES.DRIVER}
                  showFallback={true}
                >
                  <MyTrajets />
                </RoleProtectedRoute>
              } 
            />
            
            {/* Route demandes - Réservée aux expéditeurs */}
            <Route 
              path="/requests" 
              element={
                <RoleProtectedRoute 
                  requiredRole={ROLES.SENDER}
                  showFallback={true}
                >
                  <RequestsPage />
                </RoleProtectedRoute>
              } 
            />
            
            {/* Route admin - Réservée aux administrateurs */}
            <Route 
              path="/admin" 
              element={
                <RoleProtectedRoute 
                  requiredRole={ROLES.ADMIN}
                  showFallback={true}
                >
                  <AdminPanel />
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