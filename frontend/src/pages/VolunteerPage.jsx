import React from 'react'
import { Routes, Route } from 'react-router-dom';
import VolunteerDashboard from '../components/volunteer/VolunteerDashboard'
//import VolunteerDashboard from './VolunteerDashboard'
import Layout from '../components/layout/Layout'
import NotFoundPage from '../components/common/NotFoundPage';

const VolunteerPage = () => {
  return (
    <Layout role="volunteer">
      <Routes>
        <Route path="/" element={<VolunteerDashboard />} />
        {/* <Route path="user-reports" element={<PrivateRoute><MyReportsContainer /></PrivateRoute>} /> */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Layout>
  )
}

export default VolunteerPage
