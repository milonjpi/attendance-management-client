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
    'area',
    'location',
    'employee',
    'salary',
    'transfer',
    'attendance',
    'user',
    'device',
    'leave',
    'itemType',
    'vehicleType',
    'conveyance',
    'item',
    'shop',
    'uom',
    'bill',
    'monthSalary',
    'monthSalaryDetail',
  ],
  endpoints: () => ({}),
});
