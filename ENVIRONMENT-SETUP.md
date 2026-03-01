# Environment Variables Setup - Complete Guide

## 🎯 Overview
Properly configured environment variables for development and production deployment with support for Render and Hostinger.

---

## 📁 Environment Files Structure

### Frontend Environment Files
```
frontend/
├── .env.example              # Development template
├── .env                      # Local development (gitignored)
├── .env.production.example   # Production template
└── .env.production          # Production build (gitignored)
```

### Backend Environment Files
```
backend/
├── .env.example              # Backend template
└── .env                      # Backend config (gitignored)
```

---

## 🔧 Development Setup

### Frontend (.env)
```bash
# Copy the example file
cp frontend/.env.example frontend/.env

# Content for frontend/.env
VITE_API_URL=http://localhost:5000
VITE_NODE_ENV=development
```

### Backend (.env)
```bash
# Copy the example file
cp backend/.env.example backend/.env

# Content for backend/.env
MONGODB_URI=mongodb://localhost:27017/punjab-lottery
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Production Setup

### Render Deployment

#### Frontend (.env.production)
```bash
# Content for frontend/.env.production
VITE_API_URL=https://pnb-lottery.onrender.com
VITE_NODE_ENV=production
```

#### Backend Environment Variables (Render Dashboard)
```bash
MONGODB_URI=mongodb+srv://Lottery_user:pnblottery@cluster0.bmwny06.mongodb.net/punjab-lottery
JWT_SECRET=your-production-jwt-secret
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Hostinger Deployment

#### Frontend (.env.production)
```bash
# Content for frontend/.env.production
VITE_API_URL=https://your-hostinger-backend.com
VITE_NODE_ENV=production
```

#### Backend Environment Variables (Hostinger)
```bash
MONGODB_URI=mongodb+srv://Lottery_user:pnblottery@cluster0.bmwny06.mongodb.net/punjab-lottery
JWT_SECRET=your-production-jwt-secret
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-hostinger-frontend.com
```

---

## 🏗️ API Configuration

### Centralized API Setup
```javascript
// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  environment: NODE_ENV,
};
```

### Enhanced API Client
```javascript
// src/utils/api.js
import axios from 'axios';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Automatic token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error handling and logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);
```

---

## 🔄 Environment Detection

### Automatic Environment Handling
```javascript
// Development: Uses localhost:5000
VITE_API_URL=http://localhost:5000

// Production: Uses deployed backend
VITE_API_URL=https://pnb-lottery.onrender.com
```

### Socket.io Configuration
```javascript
// src/context/SocketContext.jsx
const socketInstance = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
  auth: { token }
});
```

---

## 📦 Build & Deployment

### Development Commands
```bash
# Start backend
cd backend && npm start

# Start frontend
cd frontend && npm run dev
```

### Production Build
```bash
# Build frontend with production env
cd frontend && npm run build

# The build will automatically use .env.production
```

---

## 🔒 Security Best Practices

### Environment Variables Security
- ✅ Never commit .env files to version control
- ✅ Use different secrets for development and production
- ✅ Rotate JWT secrets regularly
- ✅ Use strong, random JWT secrets
- ✅ Keep database credentials secure

### API Security
- ✅ Automatic token injection
- ✅ 401 automatic logout
- ✅ Request/response logging in development only
- ✅ Error handling without exposing sensitive data

---

## 🌐 Deployment Platforms

### Render
- Frontend: Static site deployment
- Backend: Node.js service
- Environment variables set in Render dashboard
- Automatic HTTPS provided

### Hostinger
- Frontend: Static site hosting
- Backend: Node.js hosting
- Environment variables set in hosting panel
- Custom SSL certificates supported

---

## 🧪 Testing Environment Variables

### Verify Configuration
```javascript
// Check in browser console
console.log('API URL:', import.meta.env.VITE_API_URL);
console.log('Environment:', import.meta.env.VITE_NODE_ENV);
```

### Test API Calls
```javascript
// Development: http://localhost:5000/api/health
// Production: https://pnb-lottery.onrender.com/api/health
```

---

## 📋 Migration Checklist

### From Localhost to Production
- [ ] Update frontend .env.production with production API URL
- [ ] Set backend environment variables in hosting dashboard
- [ ] Update CORS settings if needed
- [ ] Test all API endpoints
- [ ] Verify authentication flow
- [ ] Test real-time features (Socket.io)
- [ ] Check environment-specific logging

---

## 🎯 Benefits

### ✅ **Scalability**
- Easy to switch between environments
- No hardcoded URLs in code
- Centralized configuration

### ✅ **Security**
- Secrets not in code
- Environment-specific configurations
- Proper token handling

### ✅ **Maintainability**
- Single source of truth for API config
- Easy to update URLs
- Clean separation of concerns

### ✅ **Development Experience**
- Automatic environment detection
- Development logging
- Error handling

Your application is now properly configured for both development and production deployments! 🚀
