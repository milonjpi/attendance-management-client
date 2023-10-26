import { api } from '../apiSlice';

const DEPARTMENT_URL = '/department';

export const departmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    createDepartment: build.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['department'],
    }),
    getDepartments: build.query({
      query: () => ({
        url: `${DEPARTMENT_URL}`,
        method: 'GET',
      }),
      providesTags: ['department'],
    }),
    updateDepartment: build.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['department'],
    }),
    deleteDepartment: build.mutation({
      query: (id) => ({
        url: `${DEPARTMENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['department'],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
