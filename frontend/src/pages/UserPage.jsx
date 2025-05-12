import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import UserDashboard from '../components/user/UserDashboard';
import MyReportsContainer from '../components/user/MyReportsContainer';
import MyRequestsContainer from '../components/user/MyRequestsContainer';
import UserRequests from '../components/user/UserRequests';
import ReportForm from '../components/user/ReportForm';
import RequestForm from '../components/user/RequestForm';
import AnalyticsDashboard from '../components/user/AnalyticsDashboard';
import EditReportForm from '../components/user/EditReportForm';
import EditRequestForm from '../components/user/EditRequestForm';
import ReportsPictureContainer from '../components/user/ReportsPictureContainer';
import ReportsVideo from '../components/user/ReportsVideo';
import NotFoundPage from '../components/common/NotFoundPage';
import PrivateRoute from '../components/common/PrivateRoute';

const UserPage = () => {
  return (
    <Layout role="user">
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="user-reports" element={<PrivateRoute><MyReportsContainer /></PrivateRoute>} />
        <Route path="user-requests" element={<PrivateRoute><MyRequestsContainer /></PrivateRoute>} />
        <Route path="user-resource" element={<PrivateRoute allowedRoles={["user"]}><UserRequests /></PrivateRoute>} />
        <Route path="report-disaster" element={<PrivateRoute allowedRoles={["user"]}><ReportForm /></PrivateRoute>} />
        <Route path="request-resource" element={<PrivateRoute allowedRoles={["user"]}><RequestForm /></PrivateRoute>} />
        <Route path="analytics" element={<PrivateRoute allowedRoles={["user"]}><AnalyticsDashboard /></PrivateRoute>} />
        <Route path="edit-report/:id" element={<PrivateRoute allowedRoles={["user"]}><EditReportForm /></PrivateRoute>} />
        <Route path="edit-request/:id" element={<PrivateRoute allowedRoles={["user"]}><EditRequestForm /></PrivateRoute>} />

        <Route path="report-picture" element={< ReportsPictureContainer />} />
        <Route path="report-video" element={<ReportsVideo />} />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Layout>
  );
};

export default UserPage;

