import { api } from '../apiSlice';

const BULK_URL = '/bulk';

export const bulkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createBulk: build.mutation({
      query: () => ({
        url: `${BULK_URL}/create`,
        method: 'POST',
      }),
      invalidatesTags: ['bulk'],
    }),
  }),
});

export const { useCreateBulkMutation } = bulkApi;
