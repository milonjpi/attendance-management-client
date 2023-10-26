import { api } from '../apiSlice';

const SECTION_URL = '/section-permission';

export const sectionApi = api.injectEndpoints({
  endpoints: (build) => ({
    addSection: build.mutation({
      query: (data) => ({
        url: `${SECTION_URL}/add`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['user'],
    }),
    removeSection: build.mutation({
      query: (id) => ({
        url: `${SECTION_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useAddSectionMutation, useRemoveSectionMutation } = sectionApi;
