import { api } from '../../api/apiSlice';

const designationApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDesignations: build.query({
      query: (token) => ({
        url: '/designation',
        headers: { authorization: token },
      }),
      providesTags: ['designation'],
    }),
  }),
});

export const { useGetDesignationsQuery } = designationApi;
