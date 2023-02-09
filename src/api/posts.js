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
  return axios.get('/posts/my');
};

export const requestGetEvaluate = async () => {
  return axios.get('/evaluate');
};

export const requestPostEvaluate = async (postId, evaluateEnum) => {
  return axios.post('/evaluate', {postId, evaluateEnum});
};
