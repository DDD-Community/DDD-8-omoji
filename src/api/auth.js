import axios from './core';

export const requestGetNaverLogin = async () => {
  return axios.get('/auth/login/naver');
};

export const requestPostLogout = async () => {
  return axios.post('/auth/logout');
};
