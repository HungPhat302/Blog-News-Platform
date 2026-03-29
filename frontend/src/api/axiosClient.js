import axios from 'axios';

const axiosClient = axios.create({
  // SỬA LẠI URL NÀY NẾU BACKEND CỦA BẠN CHẠY PORT KHÁC
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để tự động gắn Access Token vào mỗi request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;