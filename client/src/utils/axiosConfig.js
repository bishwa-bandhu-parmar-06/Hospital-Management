import axios from 'axios';

const api = axios.create({
  baseURL: (import.meta.env.VITE_BACKEND_URI || 'http://localhost:3000/api/v1'),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Network error. Please try again.';
    console.error('API Error:', errorMessage);
    return Promise.reject(errorMessage);
  }
);

export default api;