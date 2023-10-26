import { api } from '../apiSlice';

const AUTH_URL = '/auth';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        data: loginData,
      }),
      invalidatesTags: ['user'],
    }),
    logout: build.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
