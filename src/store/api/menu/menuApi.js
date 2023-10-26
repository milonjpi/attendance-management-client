import { api } from '../apiSlice';

const MENU_URL = '/menu-permission';

export const menuApi = api.injectEndpoints({
  endpoints: (build) => ({
    addMenu: build.mutation({
      query: (data) => ({
        url: `${MENU_URL}/add`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['user'],
    }),
    removeMenu: build.mutation({
      query: (id) => ({
        url: `${MENU_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useAddMenuMutation, useRemoveMenuMutation } = menuApi;
