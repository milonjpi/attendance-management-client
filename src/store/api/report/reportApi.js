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
  }),
});

export const { useGetAllReportQuery } = reportApi;
