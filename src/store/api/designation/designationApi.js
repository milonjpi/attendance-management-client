import { api } from '../apiSlice';

const DESIGNATION_URL = '/designation';

export const designationApi = api.injectEndpoints({
  endpoints: (build) => ({
    createDesignation: build.mutation({
      query: (data) => ({
        url: `${DESIGNATION_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['designation'],
    }),
    getDesignations: build.query({
      query: () => ({
        url: `${DESIGNATION_URL}`,
        method: 'GET',
      }),
      providesTags: ['designation'],
    }),
    updateDesignation: build.mutation({
      query: (data) => ({
        url: `${DESIGNATION_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['designation'],
    }),
    deleteDesignation: build.mutation({
      query: (id) => ({
        url: `${DESIGNATION_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['designation'],
    }),
  }),
});

export const {
  useCreateDesignationMutation,
  useGetDesignationsQuery,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
} = designationApi;
