import { api } from '../apiSlice';

const ITEM_TYPE_URL = '/item-type';

export const itemTypeApi = api.injectEndpoints({
  endpoints: (build) => ({
    createItemType: build.mutation({
      query: (data) => ({
        url: `${ITEM_TYPE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['itemType'],
    }),
    getItemTypes: build.query({
      query: () => ({
        url: `${ITEM_TYPE_URL}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return {
          itemTypes: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['itemType'],
    }),
    getSingleItemType: build.query({
      query: (id) => ({
        url: `${ITEM_TYPE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['itemType'],
    }),
    updateItemType: build.mutation({
      query: (data) => ({
        url: `${ITEM_TYPE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['itemType'],
    }),

    deleteItemType: build.mutation({
      query: (id) => ({
        url: `${ITEM_TYPE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['itemType'],
    }),
  }),
});

export const {
  useCreateItemTypeMutation,
  useGetItemTypesQuery,
  useGetSingleItemTypeQuery,
  useUpdateItemTypeMutation,
  useDeleteItemTypeMutation,
} = itemTypeApi;
