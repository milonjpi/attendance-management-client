import { api } from '../../api/apiSlice';

const brandApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: (token) => ({ url: '/brand', headers: { authorization: token } }),
      providesTags: ['brand'],
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
