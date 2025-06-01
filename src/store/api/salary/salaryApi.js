import { api } from '../apiSlice';

const SALARY_URL = '/salary';

export const salaryApi = api.injectEndpoints({
  endpoints: (build) => ({
    createSalary: build.mutation({
      query: (data) => ({
        url: `${SALARY_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['salary'],
    }),
    getSalaries: build.query({
      query: (arg) => ({
        url: `${SALARY_URL}`,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          salaries: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['salary'],
    }),
    getSingleSalary: build.query({
      query: (id) => ({
        url: `${SALARY_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['salary'],
    }),
    updateSalary: build.mutation({
      query: (data) => ({
        url: `${SALARY_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['salary'],
    }),
    deleteSalary: build.mutation({
      query: (id) => ({
        url: `${SALARY_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['salary'],
    }),
  }),
});

export const {
  useCreateSalaryMutation,
  useGetSalariesQuery,
  useGetSingleSalaryQuery,
  useUpdateSalaryMutation,
  useDeleteSalaryMutation,
} = salaryApi;
