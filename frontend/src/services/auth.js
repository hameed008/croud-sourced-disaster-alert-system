import api from './api';

export const fetchVolunteers = () => api.get('auth/getVolunteers')
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const forgotPassword = (email) => api.post('/auth/forgot-password', email);
export const resetPassword = (token, password) => api.post(`/auth/reset-password/${token}`, password);
export const registerUser = (userData) => api.post('/auth/register', userData, {
  headers: {
    'Content-Type': 'multipart/form-data', // This is crucial
  },
});
export const verifyOTP = (otp) => api.post('/auth/verify-otp', otp);
export const resendOTP = (userEmail) => api.post('/auth/resend-otp', userEmail)
export const getProfile = () => api.get('/auth/me');
export const updateUser = (id, userData) => api.post(`/auth/update-user/${id}`, userData)
//export const logoutUser = (userData) => api.post('/auth/logout');