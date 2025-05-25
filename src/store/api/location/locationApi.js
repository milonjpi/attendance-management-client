import { api } from '../apiSlice';

const LOCATION_URL = '/location';

export const locationApi = api.injectEndpoints({
  endpoints: (build) => ({
    createLocation: build.mutation({
      query: (data) => ({
        url: `${LOCATION_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['location'],
    }),
    getLocations: build.query({
      query: (arg) => ({
        url: `${LOCATION_URL}`,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          locations: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['location'],
    }),
    getSingleLocation: build.query({
      query: (id) => ({
        url: `${LOCATION_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['location'],
    }),
    updateLocation: build.mutation({
      query: (data) => ({
        url: `${LOCATION_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['location'],
    }),
    deleteLocation: build.mutation({
      query: (id) => ({
        url: `${LOCATION_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['location'],
    }),
  }),
});

export const {
  useCreateLocationMutation,
  useGetLocationsQuery,
  useGetSingleLocationQuery,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
