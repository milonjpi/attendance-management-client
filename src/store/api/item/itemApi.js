import { api } from '../apiSlice';

const ITEM_URL = '/item';

export const itemApi = api.injectEndpoints({
  endpoints: (build) => ({
    createItem: build.mutation({
      query: (data) => ({
        url: `${ITEM_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['item'],
    }),
    getItems: build.query({
      query: (params) => ({
        url: `${ITEM_URL}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        return {
          items: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['item'],
    }),
    getSingleItem: build.query({
      query: (id) => ({
        url: `${ITEM_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['item'],
    }),
    updateItem: build.mutation({
      query: (data) => ({
        url: `${ITEM_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['item'],
    }),

    deleteItem: build.mutation({
      query: (id) => ({
        url: `${ITEM_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['item'],
    }),
  }),
});

export const {
  useCreateItemMutation,
  useGetItemsQuery,
  useGetSingleItemQuery,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi;
