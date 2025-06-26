import { api } from '../apiSlice';

const ATTENDANCE_URL = '/attendance';

export const attendanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    createAttendance: build.mutation({
      query: (data) => ({
        url: `${ATTENDANCE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['attendance'],
    }),

    createGeoAttendance: build.mutation({
      query: (data) => ({
        url: `${ATTENDANCE_URL}/geo-attendance`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['attendance'],
    }),

    createGeoLeave: build.mutation({
      query: (data) => ({
        url: `${ATTENDANCE_URL}/geo-leave`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['attendance'],
    }),

    getAttendance: build.query({
      query: (arg) => ({
        url: `${ATTENDANCE_URL}`,
        method: 'GET',
        params: { sortBy: 'inTime', sortOrder: 'desc', ...arg },
      }),
      transformResponse: (response) => {
        return {
          attendances: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['attendance'],
    }),
    getSingleAttendance: build.query({
      query: (arg) => ({
        url: `${ATTENDANCE_URL}/single`,
        method: 'GET',
        params: arg,
      }),
      providesTags: ['attendance'],
    }),
    deleteAttendance: build.mutation({
      query: (id) => ({
        url: `${ATTENDANCE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['attendance'],
    }),
  }),
});

export const {
  useCreateAttendanceMutation,
  useCreateGeoAttendanceMutation,
  useCreateGeoLeaveMutation,
  useGetAttendanceQuery,
  useGetSingleAttendanceQuery,
  useDeleteAttendanceMutation,
} = attendanceApi;
