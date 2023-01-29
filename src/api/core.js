import axios from 'axios';

const BASE_URL = 'https://omoji-server-vo2dfmd2vq-du.a.run.app/api/v1';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  config => {
    const token = 'token';
    config.headers['Authorization'] = `${token}`;
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
