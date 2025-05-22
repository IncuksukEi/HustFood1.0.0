// src/api/productAPI.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/products";

// Lấy toàn bộ sản phẩm
export const fetchProducts = () => axios.get(API_URL);

// Thêm sản phẩm mới
export const addProduct = (product) => axios.post(API_URL, product);

// Cập nhật sản phẩm
export const updateProduct = (id, updatedProduct) =>
  axios.put(`${API_URL}/${id}`, updatedProduct);

// Xoá sản phẩm
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
