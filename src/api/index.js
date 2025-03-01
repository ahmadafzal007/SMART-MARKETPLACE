// Base URLs for different API endpoints
export const BASE_URL = 'https://3.110.40.239/';
export const API_BASE_URL = `${BASE_URL}/api`;
export const AUTH_BASE_URL = `${API_BASE_URL}/auth`;
export const PRODUCTS_BASE_URL = `${API_BASE_URL}/products`;
export const FILTERS_BASE_URL = `${API_BASE_URL}/filters`;

// Common headers configuration
export const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': token ? `Bearer ${token}` : '',
}); 