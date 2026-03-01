import axios from 'axios';

// Use relative URL so Vite proxy handles it (avoids CORS in dev)
// In production, set VITE_API_URL env var and the proxy isn't needed
const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_BASE = import.meta.env.DEV 
  ? '/api' 
  : (VITE_API_URL ? `${VITE_API_URL.replace(/\/$/, '')}/api` : '/api');

if (import.meta.env.DEV) {
  console.log('Vite Proxy Enabled. API_BASE:', API_BASE);
}

const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Attach JWT token from localStorage on every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — clear session and redirect to login
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('parampare_user');
      // Don't redirect here — let each page handle it
    }
    return Promise.reject(error);
  }
);

export default apiClient;
