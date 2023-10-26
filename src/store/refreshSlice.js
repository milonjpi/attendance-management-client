import { createSlice } from '@reduxjs/toolkit';

export const refreshSlice = createSlice({
    name: 'refresh',
    initialState: false,
    reducers: {
        setRefresh: (state) => !state
    }
});

export const { setRefresh } = refreshSlice.actions;
export const selectRefresh = (state) => state.refresh;

export default refreshSlice.reducer;
