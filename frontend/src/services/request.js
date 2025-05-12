import api from './api';

export const fetchRequest = () => api.get('/requests');
export const createRequest = (requestData) => api.post('/requests', requestData);
export const updateRequest = (id, updatedData) => api.put(`/requests/${id}`, updatedData);
export const deleteRequest = (id) => api.delete(`/requests/${id}`);