// services/axiosInstance.js
import axios from "axios";

// Tạo một instance mới của axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Gắn token vào mỗi request nếu tồn tại
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
