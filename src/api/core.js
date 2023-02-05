import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {LOGIN_TOKEN_KEY} from '../../App';
import Config from 'react-native-config';

const BASE_URL = Config.BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  async config => {
    const token = await EncryptedStorage.getItem(LOGIN_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
