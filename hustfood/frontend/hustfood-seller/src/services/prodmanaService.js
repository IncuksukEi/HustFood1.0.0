// services/prodmanaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/products';

// Hàm phụ trợ lấy token từ localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token'); // Hoặc 'adminToken' tùy cách lưu
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllProducts = async () => {
  const res = await axios.get(API_URL, getAuthHeader());
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await axios.post(API_URL, productData, getAuthHeader());
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_URL}/${id}`, productData, getAuthHeader());
  return res.data;
};

export const deleteProductById = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return res.data;
};
