import { api } from '../apiSlice';

const BILL_URL = '/bill';

export const billApi = api.injectEndpoints({
  endpoints: (build) => ({
    createBill: build.mutation({
      query: (data) => ({
        url: `${BILL_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['bill'],
    }),
    getBills: build.query({
      query: () => ({
        url: `${BILL_URL}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return {
          bills: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['bill'],
    }),
    getSingleBill: build.query({
      query: (id) => ({
        url: `${BILL_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['bill'],
    }),
    updateBill: build.mutation({
      query: (data) => ({
        url: `${BILL_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['bill'],
    }),

    approveBill: build.mutation({
      query: (id) => ({
        url: `${BILL_URL}/${id}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: ['bill'],
    }),

    rejectBill: build.mutation({
      query: (id) => ({
        url: `${BILL_URL}/${id}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: ['bill'],
    }),

    deleteBill: build.mutation({
      query: (id) => ({
        url: `${BILL_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bill'],
    }),
  }),
});

export const {
  useCreateBillMutation,
  useGetBillsQuery,
  useGetSingleBillQuery,
  useUpdateBillMutation,
  useApproveBillMutation,
  useRejectBillMutation,
  useDeleteBillMutation,
} = billApi;
