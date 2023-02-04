import axios from './core';

export const requestPostPosts = async data => {
  return axios.post('/posts', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const requestGetPost = async id => {
  return axios.get(`/posts/${id}`);
};

export const requestDeletePost = async id => {
  return axios.delete(`/posts/${id}`);
};

export const requestPutPost = async (id, data) => {
  return axios.put(`/posts/${id}`, data);
};

export const requestGetMainPosts = async (start, limit) => {
  return axios.get(`/posts?start=${start}&limit=${limit}`);
};

export const requestGetMyPosts = async (start, limit) => {
  return axios.get(`/posts/profile?start=${start}&limit=${limit}`);
};

export const requestGetPosts = async () => {
  return axios.get('/evaluate', {id: 0});
};
