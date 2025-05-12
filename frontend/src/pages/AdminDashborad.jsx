import React from "react";
import { Link } from "react-router-dom";
// import { Users, FileText, AlertTriangle, ShieldCheck } from "lucide-react";
import {
  FaUsers as Users,
  FaFileAlt as FileText,
  FaExclamationTriangle as AlertTriangle,
  FaShieldAlt as ShieldCheck
} from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <Link
          to="/admin/users"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-t-4 border-blue-500"
        >
          <div className="flex items-center space-x-4">
            <Users className="text-blue-500" size={32} />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">User Management</h2>
              <p className="text-sm text-gray-500">View and manage all users</p>
            </div>
          </div>
        </Link>

        {/* Report Monitoring */}
        <Link
          to="/admin/reports"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-t-4 border-red-500"
        >
          <div className="flex items-center space-x-4">
            <FileText className="text-red-500" size={32} />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Reports</h2>
              <p className="text-sm text-gray-500">View submitted incidents</p>
            </div>
          </div>
        </Link>

        {/* Emergency Alerts */}
        <Link
          to="/admin/alerts"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-t-4 border-yellow-500"
        >
          <div className="flex items-center space-x-4">
            <AlertTriangle className="text-yellow-500" size={32} />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Alerts</h2>
              <p className="text-sm text-gray-500">Manage emergency notifications</p>
            </div>
          </div>
        </Link>

        {/* Admin Settings */}
        <Link
          to="/admin/settings"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-t-4 border-green-500"
        >
          <div className="flex items-center space-x-4">
            <ShieldCheck className="text-green-500" size={32} />
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Settings</h2>
              <p className="text-sm text-gray-500">Control system preferences</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
