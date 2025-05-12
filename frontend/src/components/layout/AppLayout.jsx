import React, { useState } from 'react';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import { useLayout } from '../../contexts/LayoutContext';

const AppLayout = () => {
  const isLoggedIn = true;


  const { isSidebarOpen, setIsSidebarOpen } = useLayout();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 relative">
        {/* Sidebar - only on large screens */}
        {isLoggedIn && (
          <div
            className={`
              hidden lg:block fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg z-40
              transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
            `}
          >
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`
            flex-1 transition-all duration-300 ease-in-out
            ${isLoggedIn && isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}
            h-[calc(100vh-4rem)] overflow-y-auto
          `}
        >
          <div className="p-4 bg-gray-100 min-h-full">
            <Main />
            <Footer />
          </div>
        </main>
      </div>

      {/* Overlay for mobile (if needed later) */}
      {/* You can add it here if you want to support mobile sidebar too */}
    </div>
  );
};

export default AppLayout;
