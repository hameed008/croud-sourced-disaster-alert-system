import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ProfileDialog from '../common/ProfileDialog';
import { useState } from 'react';
import {
  FaChartBar,
  FaClipboardList,
  FaCube,
  FaUsers,
  FaMapMarkedAlt,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';
import { FaUserCircle } from "react-icons/fa"; // or import your custom avatar image


// const sideBar = [
//   { name: "Dashboard", to: "/", icon: <FiHome size={20} /> },
//   { name: "Report Disaster", to: "/report", icon: <FiAlertTriangle size={20} /> },
//   { name: "Request Resource", to: "/request", icon: <FiTool size={20} /> },
//   { name: "My Reports", to: "/userreports", icon: <FiFileText size={20} /> },
//   { name: "My Requests", to: "/userrequest", icon: <FiShoppingCart size={20} /> },
//   { name: "Analytics", to: "/analytics", icon: <FiBarChart2 size={20} /> },
//   { name: "Profile", to: "/profile", icon: <FiUser size={20} /> },
//   { name: "Logout", to: "/logout", icon: <FiLogOut size={20} /> }
// ];



function AdminSidebar({ isOpen, onClose }) {

  const location = useLocation();
  const currentPath = location.pathname.split('/')[2] || 'dashboard';
  const [isProfileOpen, setProfileOpen] = useState(false);



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

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "2023-08-15"
  };


  return (

    <aside className='h-full pt-4'>


      <div className="hidden md:flex min-h-screen md:flex-shrink-0 pb-16">
        <div className="flex flex-col w-64 min-h-full">
          {/* Logo */}
          <div className="flex items-center h-8 flex-shrink-0 px-4">

            <span className="text-black font-bold text-xl">Admin Panel</span>

          </div>

          {/* Main Navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    end
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
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;

