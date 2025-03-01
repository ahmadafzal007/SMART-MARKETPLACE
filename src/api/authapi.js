import axios from 'axios';

// Base URL for the auth API (update REACT_APP_API_BASE_URL in your .env file)
// For example: REACT_APP_API_BASE_URL=http://localhost:5000/api/auth
const API_BASE_URL =
  (typeof process !== 'undefined' && process.env.REACT_APP_API_BASE_URL)
    ? process.env.REACT_APP_API_BASE_URL
    : 'http://localhost:5002/api/auth';

/**
 * Registers a new user.
 * 
 * @param {Object} data - Registration data including name, email, password, and optionally verificationCode.
 * @returns {Promise<Object>} - Response data from the server.
 */
export const register = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
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
    const response = await axios.post(`${API_BASE_URL}/login`, data);
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
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const response = await axios.put(`${API_BASE_URL}/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  // Open the Google auth flow in a popup window.
  window.open(
    `${API_BASE_URL}/google`,
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
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Function to call the reset password endpoint
export const resetPassword = async (email, verificationCode, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, {
      email,
      verificationCode,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Optionally export as a single object for easier imports
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
