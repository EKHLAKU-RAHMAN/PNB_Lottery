// API Configuration
// Handles environment-specific API URLs and provides a centralized API client

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';

// API Configuration Object
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  environment: NODE_ENV,
};

// Log API configuration in development
if (NODE_ENV === 'development') {
  console.log('🔧 API Configuration:', {
    baseURL: API_BASE_URL,
    environment: NODE_ENV,
  });
}

// Export base URL for direct usage if needed
export const API_BASE = API_BASE_URL;

// Default export
export default API_CONFIG;
