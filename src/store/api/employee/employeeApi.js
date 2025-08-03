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
    createEmployeeUser: build.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}/user`,
        method: 'POST',
        data: data,
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

    getSingleEmployee: build.query({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['employee'],
    }),

    getSingleUserEmployee: build.query({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}/user`,
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

    updateAdditionalLocation: build.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}/${data?.id}/additional-location`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['employee'],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useCreateEmployeeUserMutation,
  useGetEmployeesQuery,
  useGetSingleEmployeeQuery,
  useGetSingleUserEmployeeQuery,
  useUpdateEmployeeMutation,
  useUpdateAdditionalLocationMutation,
} = employeeApi;
