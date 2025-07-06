import axios from 'axios';
export const BASE_ADDRESS = 'https://web.yplbd.com/payroll';
export const BASE_URL = 'https://web.yplbd.com/payroll/api/v1';

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
