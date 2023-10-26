import client from 'api/client';
import { useDispatch } from 'react-redux';
import { setAuth } from 'store/authSlice';

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await client.get('/auth/refresh-token', {
        withCredentials: true,
      });
      dispatch(setAuth(response.data?.data));
      return response.data?.data?.accessToken;
    } catch (error) {
      dispatch(setAuth({}));
    }
  };
  return refresh;
};

export default useRefreshToken;
