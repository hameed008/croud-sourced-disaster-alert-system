// src/services/reports.js

import api from './api';

export const fetchReports = () => api.get('/reports');
export const createReport = (reportData) => api.post('/reports', reportData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const updateReport = (id, updatedData) => api.put(`/reports/${id}`, updatedData);
export const deleteReport = (id) => api.delete(`/reports/${id}`);