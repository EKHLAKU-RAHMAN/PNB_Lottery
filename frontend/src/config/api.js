const API_BASE_URL = import.meta.env.VITE_API_URL;
const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL environment variable is required');
}

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  environment: NODE_ENV,
};

export const API_BASE = API_BASE_URL;
export default API_CONFIG;
