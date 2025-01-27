import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
  withCredentials: true, 
});
<<<<<<< HEAD
  
// Add a request interceptor to automatically include the bearer token
=======


>>>>>>> 30ae5839cc5a4002e549cb61642f616d15f6f1cd
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
