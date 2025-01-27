import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800', // Replace with your API base URL
  withCredentials: true, // Include cookies in cross-origin requests
});
  
// Add a request interceptor to automatically include the bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the access token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header with the bearer token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default axiosInstance;