import { api } from '../apiSlice';

const SHOP_URL = '/shop';

export const shopApi = api.injectEndpoints({
  endpoints: (build) => ({
    createShop: build.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['shop'],
    }),
    getShops: build.query({
      query: (params) => ({
        url: `${SHOP_URL}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        return {
          shops: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['shop'],
    }),
    getSingleShop: build.query({
      query: (id) => ({
        url: `${SHOP_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['shop'],
    }),
    updateShop: build.mutation({
      query: (data) => ({
        url: `${SHOP_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['shop'],
    }),

    deleteShop: build.mutation({
      query: (id) => ({
        url: `${SHOP_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['shop'],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetShopsQuery,
  useGetSingleShopQuery,
  useUpdateShopMutation,
  useDeleteShopMutation,
} = shopApi;
