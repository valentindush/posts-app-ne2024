import axios from 'axios';

const API_URL = process.env.BASE_URL??"https://jsonplaceholder.typicode.com"

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
