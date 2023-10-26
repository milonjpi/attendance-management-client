import { api } from '../../api/apiSlice';

const engineCCApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEngineCC: build.query({
      query: (token) => ({
        url: '/engineCC',
        headers: { authorization: token },
      }),
      providesTags: ['engineCC'],
    }),
  }),
});

export const { useGetEngineCCQuery } = engineCCApi;
