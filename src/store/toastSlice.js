import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  variant: 'success',
  message: 'Successful',
  errorMessages: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.open = action.payload.open;
      state.variant = action.payload.variant;
      state.message = action.payload.message;
      if (
        action.payload.errorMessages &&
        action.payload.message === 'Validation Error'
      ) {
        state.errorMessages = action.payload.errorMessages;
      } else {
        state.errorMessages = null;
      }
    },
  },
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer;
