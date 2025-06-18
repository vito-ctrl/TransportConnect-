import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserRoundPen, LogOut, User, Settings, Shield, Truck, Package } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import vitoTransport from '../assets/Company_logo_only.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { isAuthenticated, user, logout, hasRole, isDriver, isAdmin, ROLES } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items based on authentication and roles
  const getNavigationItems = () => {
    if (!isAuthenticated()) {
      return [
        { name: 'Accueil', href: '/', current: location.pathname === '/' },
        { name: 'Connexion', href: '/login', current: location.pathname === '/login' },
        { name: 'Inscription', href: '/register', current: location.pathname === '/register' },
      ];
    }

    const navItems = [
      { name: 'Dashboard', href: '/dashboard', current: location.pathname === '/dashboard' },
      { name: 'Profil', href: '/profile', current: location.pathname === '/profile' },
    ];

    // Add Trajet page only for drivers
    if (isDriver()) {
      navItems.push({ 
        name: 'Mes Trajets', 
        href: '/trajets', 
        current: location.pathname === '/trajets',
        icon: Truck
      });
    }

    // Add Requests page for senders
    if (hasRole(ROLES.SENDER)) {
      navItems.push({ 
        name: 'Mes Demandes', 
        href: '/requests', 
        current: location.pathname === '/requests',
        icon: Package
      });
    }

    // Add Admin Panel for admins
    if (isAdmin()) {
      navItems.push({ 
        name: 'Administration', 
        href: '/admin', 
        current: location.pathname === '/admin',
        icon: Shield
      });
    }

    return navItems;
  };

  const navigation = getNavigationItems();

  return (
    <Disclosure as="nav" className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  alt="Vito Transport"
                  src={vitoTransport}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium flex items-center space-x-1'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuthenticated() ? (
              <>
                {/* User role badge */}
                <div className="hidden sm:block mr-4">
                  <span className={classNames(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    user?.role === ROLES.ADMIN ? 'bg-red-100 text-red-800' :
                    user?.role === ROLES.DRIVER ? 'bg-blue-100 text-blue-800' :
                    user?.role === ROLES.SENDER ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  )}>
                    {user?.role?.toUpperCase()}
                  </span>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <div className="flex items-center space-x-2 px-3 py-2">
                        <UserRoundPen className="h-5 w-5 text-white" />
                        <span className="text-white text-sm font-medium">
                          {user?.name || user?.email}
                        </span>
                      </div>
                    </MenuButton>
                  </div>
                  
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="mr-3 h-4 w-4" />
                        Votre Profil
                      </Link>
                    </MenuItem>
                    
                    {isAdmin() && (
                      <MenuItem>
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="mr-3 h-4 w-4" />
                          Administration
                        </Link>
                      </MenuItem>
                    )}
                    
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Se déconnecter
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-black hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <div className="flex items-center space-x-2">
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </div>
            </DisclosureButton>
          ))}
        </div>
        
        {isAuthenticated() && (
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <UserRoundPen className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user?.name || user?.email}</div>
                <div className="text-sm font-medium text-gray-400">{user?.email}</div>
              </div>
              <div className="ml-auto">
                <span className={classNames(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  user?.role === ROLES.ADMIN ? 'bg-red-100 text-red-800' :
                  user?.role === ROLES.DRIVER ? 'bg-blue-100 text-blue-800' :
                  user?.role === ROLES.SENDER ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                )}>
                  {user?.role?.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <DisclosureButton
                as={Link}
                to="/profile"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Votre Profil
              </DisclosureButton>
              {isAdmin() && (
                <DisclosureButton
                  as={Link}
                  to="/admin"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Administration
                </DisclosureButton>
              )}
              <DisclosureButton
                as="button"
                onClick={handleLogout}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Se déconnecter
              </DisclosureButton>
            </div>
          </div>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}