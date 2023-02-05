import axios from './core';

export const requestGetNaverLogin = async accessToken => {
  return axios.post(
    '/auth/naver',
    {},
    {
      headers: {
        socialToken: `Bearer ${accessToken}`,
      },
    },
  );
};

export const requestRefresh = async (accessToken, refreshToken) => {
  return axios.post(
    '/auth/refresh',
    {},
    {
      headers: {
        Access: `Bearer ${accessToken}`,
        Refresh: `Bearer ${refreshToken}`,
      },
    },
  );
};

export const requestPostLogout = async () => {
  return axios.post('/auth/logout');
};
