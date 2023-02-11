import axios from 'axios';
import {BASE_URL_BACKEND} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: BASE_URL_BACKEND,
    // baseURL: 'https://fw12-backend-ungs.vercel.app',
    headers,
  });
  return instance;
};

export default http;
