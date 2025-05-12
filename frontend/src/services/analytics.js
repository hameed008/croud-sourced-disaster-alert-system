import api from './api';

export const fetchOverviewStats = () => api.get('/stats/overview');

export const createReport = () => api.post('/reports/by-type');

export const updateReport = (id) => api.put(`/reports/${id}`);
export const deleteReport = (id) => api.delete(`/reports/${id}`);
