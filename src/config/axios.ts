import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.backend.com/',
});

export default api;
