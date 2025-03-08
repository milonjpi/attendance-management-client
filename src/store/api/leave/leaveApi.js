import { api } from '../apiSlice';

const LEAVE_URL = '/leave';

export const leaveApi = api.injectEndpoints({
  endpoints: (build) => ({
    createLeave: build.mutation({
      query: (data) => ({
        url: `${LEAVE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['leave'],
    }),
    getLeaves: build.query({
      query: (arg) => ({
        url: `${LEAVE_URL}`,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          leaves: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['leave'],
    }),

    getSingleLeave: build.query({
      query: (id) => ({
        url: `${LEAVE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['leave'],
    }),

    updateLeave: build.mutation({
      query: (data) => ({
        url: `${LEAVE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['leave'],
    }),
    deleteLeave: build.mutation({
      query: (id) => ({
        url: `${LEAVE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['leave'],
    }),
  }),
});

export const {
  useCreateLeaveMutation,
  useGetLeavesQuery,
  useGetSingleLeaveQuery,
  useUpdateLeaveMutation,
  useDeleteLeaveMutation,
} = leaveApi;
