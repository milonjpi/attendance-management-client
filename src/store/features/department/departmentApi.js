import { api } from '../../api/apiSlice';

const departmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query({
      query: (token) => ({
        url: '/department',
        headers: { authorization: token },
      }),
      providesTags: ['department'],
    }),
  }),
});

export const { useGetDepartmentsQuery } = departmentApi;
