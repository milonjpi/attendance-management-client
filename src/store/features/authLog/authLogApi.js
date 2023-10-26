import { api } from '../../api/apiSlice';

const authLogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAuthLog: build.query({
      query: (token) => ({
        url: '/authLog',
        headers: { authorization: token },
        method: 'GET',
      }),
      providesTags: ['authLog'],
    }),
    deleteAuthLog: build.mutation({
      query: (token) => ({
        url: '/authLog/delete',
        headers: { authorization: token },
        method: 'DELETE',
      }),
      invalidatesTags: ['authLog'],
    }),
  }),
});

export const { useGetAuthLogQuery, useDeleteAuthLogMutation } = authLogApi;
