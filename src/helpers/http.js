import axios from 'axios';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: 'http://192.168.1.6:8888',
    headers,
  });
  return instance;
};

export default http;
