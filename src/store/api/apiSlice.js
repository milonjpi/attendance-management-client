import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'api/client';
import { axiosBaseQuery } from 'helper/axios/axiosBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [
    'designation',
    'department',
    'location',
    'employee',
    'attendance',
    'user',
    'device',
    'leave',
  ],
  endpoints: () => ({}),
});
