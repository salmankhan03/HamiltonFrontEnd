import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: `https://hamiltondinnerapp.intellidt.com/api`,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token;
  if (Cookies.get('userToken')) {
    token = JSON.parse(Cookies.get('userToken'));
  }

  let company;

  if (Cookies.get('company')) {
    company = Cookies.get('company');
  }

  return {
    ...config,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, body) => instance.delete(url, body).then(responseBody),
};

export default requests;
