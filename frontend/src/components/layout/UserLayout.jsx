import React, { useState } from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import Footer from './Footer';



const UserLayout = ({ children, role }) => {
  const { isLoggedIn } = useAuth();
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();

  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-violet-50 to-blue-100">
      {/* Header */}
      <div className='w-full fixed top-0 left-0 z-50'>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          role={role}
        />
      </div>

      {/* Main Content Area - flex-1 makes it grow to push footer down */}
      <div className="flex flex-1 pt-16 min-h-[calc(100vh-4rem)] "> {/* pt-16 for navbar height */}
        {/* Sidebar */}
        {isLoggedIn && (
          <div
            className={`
              hidden lg:block absolute top-20 left-0 bottom-16 shadow-lg z-40 bg-white
              transform transition-transform duration-300 ease-in-out 
              ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
            `}
          >
            <Sidebar role={role} />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`
            flex-1 h-full px-2 lg:px-10 transition-all duration-300 ease-in-out 
            ${isLoggedIn && isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}
        
          `}
        >
          <div className="flex-1 py-4">{children}</div>
        </main>
      </div>

      {/* Footer - static at bottom */}
      <footer className="w-full border-t border-gray-200 mt-20 h-16">
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayout;
