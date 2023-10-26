import { api } from '../apiSlice';

const USER_URL = '/user';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['user'],
    }),
    getUsers: build.query({
      query: () => ({
        url: `${USER_URL}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getSingleUser: build.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['user'],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
