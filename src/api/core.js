import axios from 'axios';

const BASE_URL = 'https://omoji-server-vo2dfmd2vq-du.a.run.app/api/v1';

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
