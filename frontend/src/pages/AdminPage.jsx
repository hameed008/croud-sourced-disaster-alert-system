import Layout from '../components/layout/Layout';
import AdminDashboard from '../components/admin/AdminDashboard';
import DashboardStats from '../components/admin/DashboardStats';
import RecentReports from '../components/admin/RecentReports';
import ResourceRequests from '../components/admin/ResourceRequests';
import UserManagement from '../components/admin/UserManagement';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../components/common/NotFoundPage';

const AdminPage = () => {
  // console.log('rendered')
  return (
    <Layout role="admin">
      <Routes>
        {/* <Route path="/admin/" element={<AdminDashboard />} /> */}
        <Route index element={<AdminDashboard />} /> {/* 👈 Fix this */}
        <Route path="dashboard-stats" element={<DashboardStats />} />
        <Route path="reports" element={<RecentReports />} />
        <Route path="resources" element={<ResourceRequests />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* Add other routes for the admin */}
      </Routes>
    </Layout>
  );
};

export default AdminPage;
