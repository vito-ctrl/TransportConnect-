// Dashboard.jsx - Main Dashboard Component
import React from 'react';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  User,
  Calendar,
  FileText,
  TrendingUp,
  Bell,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const { user, hasRole, hasPermission, hasRoleOrHigher, ROLES, PERMISSIONS } = useAuth();

  // Cards de statistiques générales
  const statsCards = [
    {
      title: 'Utilisateurs Actifs',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Revenus Mensuels',
      value: '€45,231',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Commandes',
      value: '892',
      change: '-2.1%',
      changeType: 'negative',
      icon: FileText,
      color: 'orange'
    },
    {
      title: 'Taux de Conversion',
      value: '3.24%',
      change: '+0.8%',
      changeType: 'positive',
      icon: Activity,
      color: 'purple'
    }
  ];

  // Liens rapides basés sur les rôles
  const getQuickLinks = () => {
    const links = [
      {
        title: 'Mon Profil',
        description: 'Gérer mes informations personnelles',
        href: '/profile',
        icon: User,
        color: 'bg-gray-500',
        available: true
      }
    ];

    if (hasPermission(PERMISSIONS.VIEW_ANALYTICS)) {
      links.push({
        title: 'Analytics',
        description: 'Voir les statistiques détaillées',
        href: '/analytics',
        icon: BarChart3,
        color: 'bg-blue-500',
        available: true
      });
    }

    if (hasRoleOrHigher(ROLES.MANAGER)) {
      links.push({
        title: 'Gestion d\'Équipe',
        description: 'Dashboard manager',
        href: '/manager',
        icon: Users,
        color: 'bg-purple-500',
        available: true
      });
    }

    if (hasRole([ROLES.ADMIN, ROLES.SUPER_ADMIN])) {
      links.push({
        title: 'Administration',
        description: 'Panneau d\'administration',
        href: '/admin',
        icon: Shield,
        color: 'bg-red-500',
        available: true
      });
    }

    if (hasPermission(PERMISSIONS.MANAGE_SETTINGS)) {
      links.push({
        title: 'Paramètres',
        description: 'Configuration du système',
        href: '/settings',
        icon: Settings,
        color: 'bg-green-500',
        available: true
      });
    }

    if (hasPermission([PERMISSIONS.READ_USERS, PERMISSIONS.WRITE_USERS])) {
      links.push({
        title: 'Gestion Utilisateurs',
        description: 'Gérer les utilisateurs',
        href: '/user-management',
        icon: Users,
        color: 'bg-indigo-500',
        available: true
      });
    }

    return links;
  };

  const quickLinks = getQuickLinks();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Bonjour {user?.user || user?.email} - Rôle: {user?.role?.replace('_', ' ').toUpperCase()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.role === ROLES.SUPER_ADMIN ? 'bg-purple-100 text-purple-800' :
                    user?.role === ROLES.ADMIN ? 'bg-red-100 text-red-800' :
                    user?.role === ROLES.MANAGER ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user?.role?.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-md bg-${card.color}-500`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {card.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {card.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Accès Rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="block bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 p-3 rounded-md ${link.color}`}>
                      <link.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Activité Récente</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Dernières actions sur votre compte
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {[
              { action: 'Connexion réussie', time: 'Il y a 2 minutes', type: 'success' },
              { action: 'Profil mis à jour', time: 'Il y a 1 heure', type: 'info' },
              { action: 'Paramètres modifiés', time: 'Il y a 3 heures', type: 'warning' },
              { action: 'Rapport généré', time: 'Il y a 5 heures', type: 'info' }
            ].map((activity, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-2 w-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <p className="ml-3 text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {activity.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;