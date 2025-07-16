import { api } from '../apiSlice';

const MONTH_SALARY_DETAIL_URL = '/month-salary-detail';

export const monthSalaryDetailApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMonthSalaryDetails: build.query({
      query: (params) => ({
        url: `${MONTH_SALARY_DETAIL_URL}`,
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        return {
          monthSalaryDetails: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['monthSalaryDetail'],
    }),

    receiveSalary: build.mutation({
      query: (id) => ({
        url: `${MONTH_SALARY_DETAIL_URL}/${id}/receive`,
        method: 'PATCH',
      }),
      invalidatesTags: ['monthSalaryDetail'],
    }),
  }),
});

export const { useGetMonthSalaryDetailsQuery, useReceiveSalaryMutation } =
  monthSalaryDetailApi;
