import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../layout/AdminSidebar';
import DashboardStats from './DashboardStats';
import RecentReports from './RecentReports';
import ResourceRequests from './ResourceRequests';
import UserManagement from './UserManagement';
//import MapOverview from './MapOverview';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentUser } = useAuth();

  // const renderTabContent = () => {
  //   switch (activeTab) {
  //     case 'dashboard':
  //       return (
  //         <>
  //           <DashboardStats />
  //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
  //             <RecentReports />
  //             <ResourceRequests />
  //           </div>
  //           {/* <MapOverview className="mt-6" /> */}
  //         </>
  //       );
  //     case 'reports':
  //       return <RecentReports fullView />;
  //     case 'resources':
  //       return <ResourceRequests fullView />;
  //     case 'users':
  //       return <UserManagement />;
  //     default:
  //       return <DashboardStats />;
  //   }
  // };

  return (

    <div className="flex-1 overflow-auto mt-4">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto mb-2 py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === 'dashboard' ? 'Dashboard Overview' :
              activeTab === 'reports' ? 'Incident Reports' :
                activeTab === 'resources' ? 'Resource Requests' :
                  'User Management'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Logged in as <span className="font-medium">{currentUser?.name || 'Admin'}</span>
            </div>
            <img
              className="h-8 w-8 rounded-full"
              src={currentUser?.photoURL || '/default-avatar.png'}
              alt="User profile"
            />
          </div>
        </div>
      </header>

      <div>
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentReports />
          <ResourceRequests />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;