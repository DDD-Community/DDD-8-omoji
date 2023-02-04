import axios from './core';

export const requestGetNaverLogin = async token => {
  return axios.post('/auth/naver', null, {
    headers: {
      socialToken: `Bearer ${token}`,
    },
  });
};

export const requestPostLogout = async () => {
  return axios.post('/auth/logout');
};
