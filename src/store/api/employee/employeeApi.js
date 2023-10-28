import { api } from '../apiSlice';

const EMPLOYEE_URL = '/employee';

export const employeeApi = api.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}/create`,
        method: 'POST',
        data: data,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: ['employee'],
    }),
    getEmployees: build.query({
      query: (arg) => ({
        url: `${EMPLOYEE_URL}`,
        method: 'GET',
        params: arg,
      }),
      transformResponse: (response) => {
        return {
          employees: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['employee'],
    }),
    getSingleActiveEmployee: build.query({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}/active`,
        method: 'GET',
      }),
      providesTags: ['employee'],
    }),
    getSingleInactiveEmployee: build.query({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}/inactive`,
        method: 'GET',
      }),
      providesTags: ['employee'],
    }),
    updateEmployee: build.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
        contentType: 'multipart/form-data',
      }),
      invalidatesTags: ['employee'],
    }),
    inactiveEmployee: build.mutation({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}/inactive`,
        method: 'PATCH',
      }),
      invalidatesTags: ['employee'],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetEmployeesQuery,
  useGetSingleActiveEmployeeQuery,
  useGetSingleInactiveEmployeeQuery,
  useUpdateEmployeeMutation,
  useInactiveEmployeeMutation,
} = employeeApi;
