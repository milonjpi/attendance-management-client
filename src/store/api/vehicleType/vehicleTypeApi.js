import { api } from '../apiSlice';

const VEHICLE_TYPE_URL = '/vehicle-type';

export const vehicleTypeApi = api.injectEndpoints({
  endpoints: (build) => ({
    createVehicleType: build.mutation({
      query: (data) => ({
        url: `${VEHICLE_TYPE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['vehicleType'],
    }),
    getVehicleTypes: build.query({
      query: (params) => ({
        url: `${VEHICLE_TYPE_URL}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        return {
          vehicleTypes: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['vehicleType'],
    }),
    getSingleVehicleType: build.query({
      query: (id) => ({
        url: `${VEHICLE_TYPE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['vehicleType'],
    }),
    updateVehicleType: build.mutation({
      query: (data) => ({
        url: `${VEHICLE_TYPE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['vehicleType'],
    }),

    deleteVehicleType: build.mutation({
      query: (id) => ({
        url: `${VEHICLE_TYPE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['vehicleType'],
    }),
  }),
});

export const {
  useCreateVehicleTypeMutation,
  useGetVehicleTypesQuery,
  useGetSingleVehicleTypeQuery,
  useUpdateVehicleTypeMutation,
  useDeleteVehicleTypeMutation,
} = vehicleTypeApi;
