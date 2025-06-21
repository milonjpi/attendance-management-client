import { api } from '../apiSlice';

const TRANSFER_URL = '/transfer';

export const transferApi = api.injectEndpoints({
  endpoints: (build) => ({
    createTransfer: build.mutation({
      query: (data) => ({
        url: `${TRANSFER_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['transfer'],
    }),
    getTransfers: build.query({
      query: (params) => ({
        url: `${TRANSFER_URL}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        return {
          transfers: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['transfer'],
    }),
    getSingleTransfer: build.query({
      query: (id) => ({
        url: `${TRANSFER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['transfer'],
    }),
    updateTransfer: build.mutation({
      query: (data) => ({
        url: `${TRANSFER_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['transfer'],
    }),

    approveTransfer: build.mutation({
      query: (id) => ({
        url: `${TRANSFER_URL}/${id}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: ['transfer'],
    }),

    deleteTransfer: build.mutation({
      query: (id) => ({
        url: `${TRANSFER_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['transfer'],
    }),
  }),
});

export const {
  useCreateTransferMutation,
  useGetTransfersQuery,
  useGetSingleTransferQuery,
  useUpdateTransferMutation,
  useApproveTransferMutation,
  useDeleteTransferMutation,
} = transferApi;
