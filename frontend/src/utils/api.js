import axios from 'axios';
import { API_CONFIG } from '../config/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (API_CONFIG.environment === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (API_CONFIG.environment === 'development') {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin';
    }
    
    // Log errors in development
    if (API_CONFIG.environment === 'development') {
      console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data,
      });
    }
    
    return Promise.reject(error);
  }
);

// Export API methods for common operations
export const apiClient = {
  // GET request
  get: (url, config) => api.get(url, config),
  
  // POST request
  post: (url, data, config) => api.post(url, data, config),
  
  // PUT request
  put: (url, data, config) => api.put(url, data, config),
  
  // DELETE request
  delete: (url, config) => api.delete(url, config),
  
  // PATCH request
  patch: (url, data, config) => api.patch(url, data, config),
};

// Export the axios instance for direct usage
export default api;
