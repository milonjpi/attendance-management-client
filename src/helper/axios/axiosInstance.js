import axios from 'axios';
import { authKey } from 'constants/storageKey';
import { getNewAccessToken } from 'services/auth.service';
import { getFromLocalStorage, setToLocalStorage } from 'utils/local-storage';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // const responseObject = {
    //   data: response?.data?.data,
    //   meta: response?.data?.meta,
    // };
    return response;
  },
  async function (error) {
    const config = error.config;
    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.data?.accessToken;
      config.headers['Authorization'] = accessToken;
      setToLocalStorage(authKey, accessToken);
      return instance(config);
    } else {
      // const responseObject = {
      //   statusCode: error?.response?.data?.statusCode || 500,
      //   message: error?.response?.data?.message || 'Something went wrong',
      //   errorMessages: error?.response?.data?.errorMessages,
      // };
      return Promise.reject(error);
    }
  }
);

export { instance };
