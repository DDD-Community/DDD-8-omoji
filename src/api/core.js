import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LOGIN_TOKEN_KEY} from '../../App';

const BASE_URL = 'https://omoji-server-vo2dfmd2vq-du.a.run.app/api/v1';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  config => {
    // const token = EncryptedStorage.getItem(LOGIN_TOKEN_KEY);
    // console.log(config, token, !!token);
    // if (!!token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
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
