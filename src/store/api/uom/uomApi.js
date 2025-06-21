import { api } from '../apiSlice';

const UOM_URL = '/uom';

export const uomApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUom: build.mutation({
      query: (data) => ({
        url: `${UOM_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['uom'],
    }),
    getUom: build.query({
      query: (params) => ({
        url: `${UOM_URL}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        return {
          uom: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['uom'],
    }),
    getSingleUom: build.query({
      query: (id) => ({
        url: `${UOM_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['uom'],
    }),
    updateUom: build.mutation({
      query: (data) => ({
        url: `${UOM_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['uom'],
    }),

    deleteUom: build.mutation({
      query: (id) => ({
        url: `${UOM_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['uom'],
    }),
  }),
});

export const {
  useCreateUomMutation,
  useGetUomQuery,
  useGetSingleUomQuery,
  useUpdateUomMutation,
  useDeleteUomMutation,
} = uomApi;
