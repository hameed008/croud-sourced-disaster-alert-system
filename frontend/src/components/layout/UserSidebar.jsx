import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  FiHome,
  FiAlertTriangle,
  FiTool,
  FiFileText,
  FiShoppingCart,
  FiBarChart2,
} from 'react-icons/fi';

const sideBar = [
  { name: "Dashboard", to: "/user", icon: <FiHome size={20} /> },
  { name: "Report Disaster", to: "/user/report-disaster", icon: <FiAlertTriangle size={20} /> },
  { name: "Request Resource", to: "/user/request-resource", icon: <FiTool size={20} /> },
  { name: "My Reports", to: "/user/user-reports", icon: <FiFileText size={20} /> },
  { name: "My Requests", to: "/user/user-requests", icon: <FiShoppingCart size={20} /> },
  { name: "Analytics", to: "/user/analytics", icon: <FiBarChart2 size={20} /> },
];


function UserSidebar() {
  const [isProfileOpen, setProfileOpen] = useState(false);

  return (
    <aside className='flex flex-col h-full'>
      {/* Navigation - grows to take available space */}
      <nav className="p-4 flex-grow overflow-y-auto">
        <ul className="space-y-2">
          {sideBar.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${isActive
                    ? 'bg-violet-100 text-violet-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
}

export default UserSidebar;

