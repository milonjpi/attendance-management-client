import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setAuth: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
