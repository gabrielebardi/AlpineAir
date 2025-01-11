import axios from 'axios';
import { handleApiError, showErrorNotification } from './error';

const API_BASE_URL = process.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(handleApiError(error))
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const appError = handleApiError(error);
    
    if (appError.code === 'UNAUTHORIZED') {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    // Show error notification for non-validation errors
    if (appError.code !== 'VALIDATION_ERROR') {
      showErrorNotification(appError);
    }

    return Promise.reject(appError);
  }
);

// Helper function to wrap API calls with error handling
export async function apiCall<T>(
  promise: Promise<{ data: T }>
): Promise<T> {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

// Export the error handling functions for use in components
export { handleApiError, showErrorNotification } from './error'; 