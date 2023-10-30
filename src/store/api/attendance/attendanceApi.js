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
  useGetAttendanceQuery,
  useDeleteAttendanceMutation,
} = attendanceApi;
