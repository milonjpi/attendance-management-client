import { api } from '../apiSlice';

const AREA_URL = '/area';

export const areaApi = api.injectEndpoints({
  endpoints: (build) => ({
    createArea: build.mutation({
      query: (data) => ({
        url: `${AREA_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['area'],
    }),
    getAreas: build.query({
      query: (arg) => ({
        url: `${AREA_URL}`,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          areas: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['area'],
    }),
    getSingleArea: build.query({
      query: (id) => ({
        url: `${AREA_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['area'],
    }),
    updateArea: build.mutation({
      query: (data) => ({
        url: `${AREA_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['area'],
    }),
    deleteArea: build.mutation({
      query: (id) => ({
        url: `${AREA_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['area'],
    }),
  }),
});

export const {
  useCreateAreaMutation,
  useGetAreasQuery,
  useGetSingleAreaQuery,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} = areaApi;
