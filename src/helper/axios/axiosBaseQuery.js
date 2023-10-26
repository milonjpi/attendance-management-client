import { instance as axiosInstance } from './axiosInstance';

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          'Content-Type': contentType || 'application/json',
        },
        withCredentials: true,
      });
      return result;
    } catch (axiosError) {
      return {
        error: {
          data: axiosError.response.data,
          status: axiosError.response.status,
        },
      };
    }
  };
