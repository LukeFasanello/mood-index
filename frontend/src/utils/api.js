import axios from 'axios';

// Use environment variable if available, otherwise use localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests automatically if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is due to token expiration or invalid token
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data?.error;
      if (errorMessage === 'Token expired' || errorMessage === 'Invalid token' || errorMessage === 'No token provided') {
        // Clear stored auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Reload page to show login screen
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default api;