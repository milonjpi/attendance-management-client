import { api } from '../../api/apiSlice';

const modelApi = api.injectEndpoints({
  endpoints: (build) => ({
    getModels: build.query({
      query: (token) => ({
        url: '/model',
        headers: { authorization: token },
      }),
      providesTags: ['model'],
    }),
  }),
});

export const { useGetModelsQuery } = modelApi;
