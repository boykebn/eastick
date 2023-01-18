import axios from 'axios';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: 'http://192.168.1.9:8888',
    // baseURL: 'https://fw12-backend-dg3ymnqvv-boykebn.vercel.app',
    headers,
  });
  return instance;
};

export default http;
