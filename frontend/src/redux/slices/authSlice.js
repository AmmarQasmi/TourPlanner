import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  isLoggedIn: false,
  userEmail: null,
  userRole: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userId, email, role } = action.payload;
      state.isLoggedIn = true;
      state.userId = userId;
      state.userEmail = email;
      state.userRole = role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.userEmail = null;
      state.userRole = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer; 