import { BASE_URL } from 'api/client';
import { authKey } from 'constants/storageKey';
import { instance as axiosInstance } from 'helper/axios/axiosInstance';
import { decodedToken } from 'utils/jwt';
import { getFromLocalStorage, setToLocalStorage } from 'utils/local-storage';

export const storeUserInfo = ({ accessToken }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return '';
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${BASE_URL}/auth/refresh-token`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};
