// src/services/api.js

import axios from 'axios';
//import { useAuth } from '../contexts/AuthContext';

const url = import.meta.env.VITE_REACT_APP_API_URL
//const url = import.meta.env.VITE_REACT_APP_PRODUCTION_API_URL

const api = axios.create({
  baseURL: url, // From your .env.local
});

// Add request interceptor to include JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;