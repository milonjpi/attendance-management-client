import { api } from '../apiSlice';

const PROFILE_URL = '/profile';

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: `${PROFILE_URL}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
