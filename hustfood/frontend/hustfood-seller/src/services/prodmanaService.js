
// services/prodmanaService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/products';

export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await axios.post(API_URL, productData);
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_URL}/${id}`, productData);
  return res.data;
};

export const deleteProductById = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
