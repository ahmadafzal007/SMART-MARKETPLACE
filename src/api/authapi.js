import axios from 'axios';
import { AUTH_BASE_URL, getAuthHeaders } from './index';

/**
 * Registers a new user.
 * 
 * @param {Object} data - Registration data including name, email, password, and optionally verificationCode.
 * @returns {Promise<Object>} - Response data from the server.
 */
export const register = async (data) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Logs in an existing user.
 * 
 * @param {Object} data - Login credentials (email and password).
 * @returns {Promise<Object>} - Response data including JWT token and user details.
 */
export const login = async (data) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Fetches the profile of the currently authenticated user.
 * 
 * @param {string} token - JWT token for authorization.
 * @returns {Promise<Object>} - The user profile data.
 */
export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${AUTH_BASE_URL}/profile`, {
      headers: getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Updates the user's profile.
 * 
 * @param {string} token - JWT token for authorization.
 * @param {Object} data - Data fields to update (except password).
 * @returns {Promise<Object>} - The updated user profile.
 */
export const updateProfile = async (token, data) => {
  try {
    const response = await axios.put(`${AUTH_BASE_URL}/profile`, data, {
      headers: getAuthHeaders(token),
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// New function to trigger Google OAuth login/signup flow
const googleAuth = () => {
  const width = 500,
    height = 600;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  
  window.open(
    `${AUTH_BASE_URL}/google`,
    'GoogleAuth',
    `width=${width},height=${height},top=${top},left=${left}`
  );

  return new Promise((resolve, reject) => {
    const listener = (event) => {
      if (event.data && event.data.token) {
        window.removeEventListener('message', listener);
        resolve(event.data);
      }
    };
    window.addEventListener('message', listener);
  });
};

// Function to call the forgot password endpoint
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Function to call the reset password endpoint
export const resetPassword = async (email, verificationCode, newPassword) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/reset-password`, {
      email,
      verificationCode,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Export as a single object for easier imports
const authApi = {
  register,
  login,
  getProfile,
  updateProfile,
  googleAuth,
  forgotPassword,
  resetPassword,
};

export default authApi;
