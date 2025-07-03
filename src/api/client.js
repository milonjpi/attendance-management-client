import axios from 'axios';
export const BASE_ADDRESS = 'http://192.168.0.244:5000';
export const BASE_URL = 'http://192.168.0.244:5000/api/v1';

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
