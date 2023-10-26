import { api } from '../../api/apiSlice';

const guardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGuards: build.query({
      query: (arg) => ({
        url: '/guard',
        headers: { authorization: arg?.token },
        params: arg.query,
        method: 'GET',
      }),
      providesTags: ['guard'],
    }),
  }),
});

export const { useGetGuardsQuery } = guardApi;
