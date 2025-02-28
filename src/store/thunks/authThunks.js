import { loginStart, loginSuccess, loginFailure, logout } from '../slices/userSlice';
import authApi from '../../api/authapi';

// Thunk for email login
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await authApi.login(credentials);
    
    // Store token in localStorage
    localStorage.setItem('token', response.token);
    
    // Dispatch success with user data
    dispatch(loginSuccess({
      token: response.token,
      name: response.name,
      email: response.email,
      avatar: response.avatar || null,
    }));
    
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message || 'Login failed'));
    throw error;
  }
};

// Thunk for Google OAuth login
export const loginWithGoogle = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    const result = await authApi.googleAuth();

    console.log(result);
    
    // Store token in localStorage
    localStorage.setItem('token', result.token);
    
    // Dispatch success with user data
    dispatch(loginSuccess({
      token: result.token,
      name: result.name,
      email: result.email,
      avatar: result.avatar || null,
    }));
    
    return result;
  } catch (error) {
    dispatch(loginFailure(error.message || 'Google authentication failed'));
    throw error;
  }
};

// Thunk for registration
export const registerUser = (userData, verificationCode) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await authApi.register({
      ...userData,
      verificationCode,
    });
    
    // Store token in localStorage
    localStorage.setItem('token', response.token);
    
    // Dispatch success with user data
    dispatch(loginSuccess({
      token: response.token,
      name: response.name,
      email: response.email,
      avatar: response.avatar || null,
    }));
    
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message || 'Registration failed'));
    throw error;
  }
};

// Thunk for loading user profile from token
export const loadUserProfile = () => async (dispatch, getState) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return;
  }
  
  dispatch(loginStart());
  try {
    const response = await authApi.getProfile(token);
    
    dispatch(loginSuccess({
      token,
      name: response.user.name,
      email: response.user.email,
      avatar: response.user.avatar || null,
    }));
    
    return response;
  } catch (error) {
    // If token is invalid, clear it
    localStorage.removeItem('token');
    dispatch(logout());
    throw error;
  }
};

// Thunk for logging out
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};
