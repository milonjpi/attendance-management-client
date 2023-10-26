import { api } from '../apiSlice';

const SUBMENU_URL = '/subMenu-permission';

export const subMenuApi = api.injectEndpoints({
  endpoints: (build) => ({
    addSubMenu: build.mutation({
      query: (data) => ({
        url: `${SUBMENU_URL}/add`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['user'],
    }),
    removeSubMenu: build.mutation({
      query: (id) => ({
        url: `${SUBMENU_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useAddSubMenuMutation, useRemoveSubMenuMutation } = subMenuApi;
