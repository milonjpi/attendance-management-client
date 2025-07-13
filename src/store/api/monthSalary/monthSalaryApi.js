import { api } from '../apiSlice';

const MONTH_SALARY_URL = '/month-salary';

export const monthSalaryApi = api.injectEndpoints({
  endpoints: (build) => ({
    createMonthSalary: build.mutation({
      query: (data) => ({
        url: `${MONTH_SALARY_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['monthSalary'],
    }),
    getMonthSalaries: build.query({
      query: (params) => ({
        url: `${MONTH_SALARY_URL}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        return {
          monthSalaries: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['monthSalary'],
    }),
    getSingleMonthSalary: build.query({
      query: (id) => ({
        url: `${MONTH_SALARY_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['monthSalary'],
    }),
    updateMonthSalary: build.mutation({
      query: (data) => ({
        url: `${MONTH_SALARY_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['monthSalary'],
    }),

    deleteMonthSalary: build.mutation({
      query: (id) => ({
        url: `${MONTH_SALARY_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['monthSalary'],
    }),
  }),
});

export const {
  useCreateMonthSalaryMutation,
  useGetMonthSalariesQuery,
  useGetSingleMonthSalaryQuery,
  useUpdateMonthSalaryMutation,
  useDeleteMonthSalaryMutation,
} = monthSalaryApi;
