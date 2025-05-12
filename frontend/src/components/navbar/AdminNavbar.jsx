import { useState, useEffect } from "react";
//import logo from "../../assets/logo.svg";
import Logo from "../Logo";
import { FiX } from "react-icons/fi";
import { IoMdLogIn } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { RiMenu2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import ProfileDialog from "../common/ProfileDialog";

const navLinks = [
  { name: "About", to: "/about" },
  { name: "Request", to: "/request" },
  { name: "Report", to: "/report" },
  { name: "Login", to: "/login" },
];

import {
  FaChartBar,
  FaClipboardList,
  FaCube,
  FaUsers,
  FaMapMarkedAlt,
} from 'react-icons/fa';

const sideBarItems = [
  { id: 'dashboard', name: 'Dashboard', icon: <FaChartBar size={20} />, to: '/admin' },
  { id: 'reports', name: 'Incident Reports', icon: <FaClipboardList size={20} />, to: '/admin/reports' },
  { id: 'resources', name: 'Resource Requests', icon: <FaCube size={20} />, to: '/admin/resources' },
  { id: 'users', name: 'User Management', icon: <FaUsers size={20} />, to: '/admin/users' },
  { id: 'map', name: 'Map Overview', icon: <FaMapMarkedAlt size={20} />, to: '/admin/map' }
];

const styleMap = {
  Login: "py-3 px-8 text-black hover:bg-violet-50 border border-gray-200  rounded-md",
};


export default function AdminNavbar({ isSidebarOpen, toggleSidebar }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { user, isLoggedIn } = useAuth()

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

      {/* Menu Panel */}
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
          <nav>
            {items.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-violet-100 text-violet-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <header className="w-full flex justify-between h-20 items-center shadow-sm z-10 px-16 bg-white">
      {/* Logo */}
      <Logo></Logo>

      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            {/* Desktop Sidebar Toggle */}
            <div className="lg:flex items-center space-x-4">

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
                aria-expanded={isSidebarOpen}
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
            {/* Desktop Navigation */}
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
              <span className="border border-gray-200 py-2 px-5 block rounded-sm">
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