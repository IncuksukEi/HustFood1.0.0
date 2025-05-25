// services/categoryService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/categories';

// Hàm phụ trợ lấy token
const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Hoặc 'adminToken' nếu bạn dùng tên khác
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(API_BASE_URL, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};

export default categoryService;
