import { api } from '../apiSlice';

const CONVEYANCE_URL = '/conveyance';

export const conveyanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    createConveyance: build.mutation({
      query: (data) => ({
        url: `${CONVEYANCE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['conveyance'],
    }),
    getConveyances: build.query({
      query: (params) => ({
        url: `${CONVEYANCE_URL}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        return {
          conveyances: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['conveyance'],
    }),
    getConveyanceLocations: build.query({
      query: () => ({
        url: `${CONVEYANCE_URL}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return {
          locations: response?.locations,
        };
      },
      providesTags: ['conveyance'],
    }),
    getSingleConveyance: build.query({
      query: (id) => ({
        url: `${CONVEYANCE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['conveyance'],
    }),
    updateConveyance: build.mutation({
      query: (data) => ({
        url: `${CONVEYANCE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['conveyance'],
    }),

    approveConveyance: build.mutation({
      query: (id) => ({
        url: `${CONVEYANCE_URL}/${id}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: ['conveyance'],
    }),

    rejectConveyance: build.mutation({
      query: (id) => ({
        url: `${CONVEYANCE_URL}/${id}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: ['conveyance'],
    }),

    deleteConveyance: build.mutation({
      query: (id) => ({
        url: `${CONVEYANCE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['conveyance'],
    }),
  }),
});

export const {
  useCreateConveyanceMutation,
  useGetConveyancesQuery,
  useGetConveyanceLocationsQuery,
  useGetSingleConveyanceQuery,
  useUpdateConveyanceMutation,
  useApproveConveyanceMutation,
  useRejectConveyanceMutation,
  useDeleteConveyanceMutation,
} = conveyanceApi;
