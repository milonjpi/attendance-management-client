import { api } from '../apiSlice';

const DEVICE_URL = '/device';

export const deviceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // create device user
    createDeviceUser: build.mutation({
      query: (data) => ({
        url: `${DEVICE_URL}/user/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['device'],
    }),
    // get all device users
    getDeviceUsers: build.query({
      query: () => ({
        url: `${DEVICE_URL}/user`,
        method: 'GET',
      }),
      providesTags: ['device'],
    }),
    // get single device user
    getSingleDeviceUser: build.query({
      query: (id) => ({
        url: `${DEVICE_URL}/user/${id}`,
        method: 'GET',
      }),
      providesTags: ['device'],
    }),
    // update device user
    updateDeviceUser: build.mutation({
      query: (data) => ({
        url: `${DEVICE_URL}/user/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['device'],
    }),
    // delete device user
    deleteDeviceUser: build.mutation({
      query: (id) => ({
        url: `${DEVICE_URL}/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['device'],
    }),
    // get all terminals
    getAllTerminals: build.query({
      query: () => ({
        url: `${DEVICE_URL}/terminal`,
        method: 'GET',
      }),
      providesTags: ['device'],
    }),
    // get terminals user id
    getTerminalsByUserId: build.query({
      query: (id) => ({
        url: `${DEVICE_URL}/terminal/${id}`,
        method: 'GET',
      }),
      providesTags: ['device'],
    }),
    // assign terminal to user
    assignTerminal: build.mutation({
      query: (data) => ({
        url: `${DEVICE_URL}/terminal/user`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['device'],
    }),
    // remove terminal to from
    removeTerminal: build.mutation({
      query: (data) => ({
        url: `${DEVICE_URL}/terminal/${data?.id}/remove`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['device'],
    }),
  }),
});

export const {
  useCreateDeviceUserMutation,
  useGetDeviceUsersQuery,
  useGetSingleDeviceUserQuery,
  useUpdateDeviceUserMutation,
  useDeleteDeviceUserMutation,
  useGetAllTerminalsQuery,
  useGetTerminalsByUserIdQuery,
  useAssignTerminalMutation,
  useRemoveTerminalMutation,
} = deviceApi;
