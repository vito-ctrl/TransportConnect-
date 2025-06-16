import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from './AuthContext';

const Navbar = () => {
//   const { user, logout } = useAuth();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//   };

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/profile', label: 'Profile' },
    // { path: '/settings', label: 'Settings' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-gray-900">
              MyApp
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                //   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                //     isActive(item.path)
                //       ? 'bg-black text-white'
                //       : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                //   }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 text-sm">
              {/* Welcome, {user?.user || user?.email} */}
            </span>
            <button
            //   onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (you can expand this with state management) */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                // className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                //   isActive(item.path)
                //     ? 'bg-black text-white'
                //     : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                // }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;