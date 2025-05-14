import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response);
    return Promise.reject(
      error.response?.data?.message || error.message || 'Something went wrong'
    );
  }
);

export default api;