import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import customizationReducer from './customizationReducer';
import refreshReducer from './refreshSlice';
import toastReducer from './toastSlice';
import authReducer from './authSlice';
import { api } from './api/apiSlice';

// ==============================|| REDUX - MAIN STORE ||============================== //
const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
  whitelist: ['auth', 'customization'],
};

// 1. create reducer
const rootReducer = combineReducers({
  customization: customizationReducer,
  refresh: refreshReducer,
  toast: toastReducer,
  auth: authReducer,
  [api.reducerPath]: api.reducer,
});

// 2. persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export default store;
