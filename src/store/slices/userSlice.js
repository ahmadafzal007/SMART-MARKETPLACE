import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: {
    name: null,
    email: null,
    avatar: null,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        avatar: action.payload.avatar || null,
      };
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  updateUserProfile, 
  logout 
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectToken = (state) => state.user.token;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
