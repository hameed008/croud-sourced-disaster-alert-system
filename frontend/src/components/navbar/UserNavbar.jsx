import { useState, useEffect } from "react";
//import logo from "../../assets/logo.svg";
import Logo from "../Logo"
import {
  FiX, FiHome, FiAlertTriangle, FiTool, FiFileText,
  FiShoppingCart, FiBarChart2,
} from "react-icons/fi";
import { IoMdLogIn } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotifactionContext";

import { RiMenu2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import ProfileDialog from "../common/ProfileDialog";
import { FaBell } from "react-icons/fa";
import NotificationTab from "../NotificationTab";


const navLinks = [
  { name: "Home", to: "/user" },
  { name: "About", to: "/about" },
  { name: "Request", to: "/user/request-resource" },
  { name: "Report", to: "/user/report-disaster" },
  { name: "Login", to: "/login" },
];

const sideBarItems = [
  { name: "Dashboard", to: "/user", icon: <FiHome size={20} /> },
  { name: "Report Disaster", to: "/user/report-disaster", icon: <FiAlertTriangle size={20} /> },
  { name: "Request Resource", to: "/user/request-resource", icon: <FiTool size={20} /> },
  { name: "My Reports", to: "/user/user-reports", icon: <FiFileText size={20} /> },
  { name: "My Requests", to: "/user/user-requests", icon: <FiShoppingCart size={20} /> },
  { name: "Analytics", to: "/user/analytics", icon: <FiBarChart2 size={20} /> },
];

const styleMap = {
  Login: "py-3 px-8 block text-center text-black bg-gray-50 hover:bg-violet-50 border border-gray-300  rounded-md",
};

export default function UserNavbar({ toggleSidebar }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { user, isLoggedIn } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false);
  const { alerts, fetchAllAlerts } = useNotification()

  // Fetch All Alerts
  useEffect(() => {
    if (isLoggedIn && user?._id) {
      fetchAllAlerts(user._id);
    }
  }, [isLoggedIn, user?._id, fetchAllAlerts]);

  const unReadAlertsCount = alerts?.filter(alert =>
    alert?.isRead === false
  ).length || 0;
  //const [unreadCount, setUnreadCount] = useState(3); // replace 3 with your dynamic count

  // Close mobile menu when screen reaches desktop size
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // lg breakpoint

    const handleResize = (e) => {
      if (e.matches && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    // Initial check in case component loads on desktop
    if (mediaQuery.matches && isMobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [isMobileMenuOpen]);

  const renderMobileMenu = (items) => (
    <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-60' : 'opacity-0'}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-[70%] md:w-[50%] bg-white shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end p-3">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl text-gray-700 focus:outline-none"
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <div className="px-6 space-y-2">
          <h2 className="text-xl font-bold text-center mb-4">Browse Menu</h2>
          {/* <nav>
            {items.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg ${styleMap[item.name]} transition-colors ${isActive ? 'bg-violet-100 text-violet-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}

                {item.name === "Login" ? (
                  <>
                    <IoMdLogIn size={18} className="mr-1 text-gray-900" />


                    {item.name}
                  </>
                ) : (
                  item.name
                )}

              </NavLink>
            ))}
          </nav> */}
          <nav>
            {items.map((item) =>
              item.name === "Login" ? (
                <div key={item.name} className="w-full flex justify-center mt-4">
                  <NavLink
                    to={item.to}
                    end
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      ` w-full flex items-center justify-center p-3 rounded-lg ${styleMap[item.name]} transition-colors ${isActive ? "bg-violet-50 text-violet-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    <IoMdLogIn size={18} className="mr-1 text-gray-900" />
                    {item.name}
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${isActive ? "bg-violet-50 text-violet-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.name}
                </NavLink>
              )
            )}
          </nav>

        </div>
      </div>
    </div>
  );


  return (
    <header className="w-full flex justify-between h-20 items-center bg-white shadow-sm z-10 px-3 md:px-16">

      {/* Logo */}
      <Logo></Logo>

      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            {/* Desktop Header */}
            <div className="flex items-center space-x-4">

              {/* Show Alert Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative mr-6"
              >
                <FaBell size={24} className="text-green-500" />
                {/* Optional dot indicator */}
                {/* <span className="absolute -top-1 -right-1 bg-red-500 h-3 w-3 rounded-full"></span> */}
                {unReadAlertsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center text-white justify-center rounded-full">
                    {unReadAlertsCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="min-w-md absolute top-20  right-0 mx-2 z-50 animate-slide-down">
                  <NotificationTab userId={user._id} />
                </div>
              )}

              {/* Profile Avatar */}
              <div className="flex items-center space-x-2 cursor-pointer">

                <img src={user?.avatar.url || 'images/user-profile.svg'} alt="User Profile" className="w-8 h-8 rounded-full text-violet-600" onClick={() => setProfileOpen(!isProfileOpen)} />
                <span className="font-medium text-gray-700">{user?.name}</span> {/* Replace with dynamic username */}
              </div>

              {/* Profile Dialog */}
              <ProfileDialog
                isOpen={isProfileOpen}
                onClose={() => setProfileOpen(false)}
                user={user}
              />

              {/* Sidebar Toggle Button */}
              <button
                onClick={toggleSidebar}
                className="text-gray-700 focus:outline-none hidden xl:block"
                aria-label="Toggle sidebar"
              // aria-expanded={isSidebarOpen}
              >
                <span className="border border-gray-200 hover:bg-violet-50 py-2 px-5 block rounded-sm">
                  <RiMenu2Fill size={25} />
                </span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="border border-gray-200 py-2 px-5 block rounded-sm">
                {isMobileMenuOpen ? <FiX size={25} /> : <RiMenu2Fill size={25} />}
              </span>
            </button>



            {renderMobileMenu(sideBarItems)}
          </>
        ) : (
          <>


            {/* Show Alert Notifications */}
            {/* <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative mr-4 lg:mr-10"
            >
              <FaBell size={24} className="text-green-500" /> */}
            {/* Optional dot indicator */}
            {/* <span className="absolute -top-1 -right-1 bg-red-500 h-3 w-3 rounded-full"></span> */}
            {/* {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button> */}


            {/* Notifications Dropdown */}
            {/* {showNotifications && (
              <div className="min-w-md absolute top-20 right-2 mx-2 z-50 animate-slide-down">
                <NotificationTab />
              </div>
            )} */}

            {/* Desktop Header For Non Logged In Menu */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center ${styleMap[link.name] || "transition-colors duration-150  text-black hover:bg-violet-50 py-2 px-4 rounded-sm"} ${isActive ? "font-semibold bg-violet-50" : ""
                    }`
                  }
                >
                  {link.name === "Login" ? (
                    <>
                      <IoMdLogIn size={18} className="mr-1 text-gray-900" />


                      {link.name}
                    </>
                  ) : (
                    link.name
                  )}
                </NavLink>
              ))}


            </nav>



            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="border-1 border-gray-200 py-1.5 md:py-2 px-3.5 md:px-5 block rounded-sm">
                {isMobileMenuOpen ? <FiX size={25} /> : <RiMenu2Fill size={25} />}
              </span>
            </button>
            {renderMobileMenu(navLinks)}

          </>
        )}
      </div>
    </header>
  );
}