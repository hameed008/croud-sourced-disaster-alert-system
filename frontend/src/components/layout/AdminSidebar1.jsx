
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaChartBar,
  FaClipboardList,
  FaCube,
  FaUsers,
  FaMapMarkedAlt,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';


const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[2] || 'dashboard';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartBar, path: '/admin' },
    { id: 'reports', label: 'Incident Reports', icon: FaClipboardList, path: '/admin/reports' },
    { id: 'resources', label: 'Resource Requests', icon: FaCube, path: '/admin/resources' },
    { id: 'users', label: 'User Management', icon: FaUsers, path: '/admin/users' },
    { id: 'map', label: 'Map Overview', icon: FaMapMarkedAlt, path: '/admin/map' }
  ];


  const secondaryItems = [
    { id: 'settings', label: 'Settings', icon: FaCog, path: '/admin/settings' },
    { id: 'logout', label: 'Logout', icon: FaSignOutAlt, path: '/logout' }
  ];



  const isActive = (path) => {
    const pathParts = path.split('/');
    const currentPathParts = location.pathname.split('/');
    return pathParts[2] === currentPathParts[2];
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 h-screen border-r border-gray-200 bg-red-200">
        {/* Logo */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-600">
          <Link to="/admin" className="flex items-center space-x-2">
            <img
              className="h-8 w-auto"
              src="/logo.png"
              alt="Disaster Response Hub"
            />
            <span className="text-white font-bold text-xl">Admin Panel</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive(item.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive(item.path)
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Secondary Navigation */}
          <div className="px-2 py-4 border-t border-gray-200">
            <nav className="space-y-1">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <Icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive(item.path)
                        ? 'text-blue-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile */}
          <div className="p-4 mt-auto border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/avatars/admin.png"
                  alt="Admin User"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs font-medium text-gray-500">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;