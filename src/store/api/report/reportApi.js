import { api } from '../apiSlice';

const REPORT_URL = '/report';

export const reportApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllReport: build.query({
      query: (arg) => ({
        url: `${REPORT_URL}`,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          employees: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['employee', 'attendance'],
    }),
    getSalaryReport: build.query({
      query: (arg) => ({
        url: `${REPORT_URL}/salary`,
        method: 'GET',
        params: arg,
      }),
      providesTags: ['employee', 'attendance', 'leave'],
    }),
    // expense summary
    getExpenseSummary: build.query({
      query: (arg) => ({
        url: `${REPORT_URL}/expense-summary`,
        method: 'GET',
        params: arg,
      }),
      providesTags: ['bill', 'conveyance', 'salary', 'employee'],
    }),
    // expense summary year
    getExpenseSummaryYear: build.query({
      query: (arg) => ({
        url: `${REPORT_URL}/expense-summary-year`,
        method: 'GET',
        params: arg,
      }),
      providesTags: ['bill', 'conveyance', 'salary', 'employee'],
    }),
    // expense summary month
    getExpenseSummaryMonth: build.query({
      query: (arg) => ({
        url: `${REPORT_URL}/expense-summary-month`,
        method: 'GET',
        params: arg,
      }),
      providesTags: ['bill', 'conveyance', 'salary', 'employee'],
    }),
  }),
});

export const {
  useGetAllReportQuery,
  useGetSalaryReportQuery,
  useGetExpenseSummaryQuery,
  useGetExpenseSummaryYearQuery,
  useGetExpenseSummaryMonthQuery,
} = reportApi;
