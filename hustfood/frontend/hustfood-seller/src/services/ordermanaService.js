// src/services/ordermanaService.js
import axios from "axios";

const API_BASE = "http://localhost:8080/api"; // cập nhật nếu cần

const getAuthHeader = () => {
  const token = localStorage.getItem("token"); // token lưu tại localStorage
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchOrders = () =>
  axios.get(`${API_BASE}/adorders`, getAuthHeader());

export const fetchOrderById = (orderId) =>
  axios.get(`${API_BASE}/adorders/${orderId}`, getAuthHeader());

export const fetchOrderDetails = (orderId) =>
  axios.get(`${API_BASE}/adorders/details/${orderId}`, getAuthHeader());

export const fetchTotalPrice = (orderId) =>
  axios.get(`${API_BASE}/adorders/totalPrices/${orderId}`, getAuthHeader());

export const fetchCountDetails = (orderId) =>
  axios.get(`${API_BASE}/adorders/count-details/${orderId}`, getAuthHeader());

export const createOrder = (orderData) =>
  axios.post(`${API_BASE}/adorders`, orderData, getAuthHeader());

export const updateOrder = (orderId, orderData) =>
  axios.put(`${API_BASE}/adorders/${orderId}`, orderData, getAuthHeader());

export const fetchUserByPhone = (phone) =>
  axios.get(`${API_BASE}/adorders/user-by-phone/${phone}`, getAuthHeader()); // Giả sử có API này

export const fetchProductByName = (name) =>
  axios.get(`${API_BASE}/adorders/product-by-name/${name}`, getAuthHeader()); // Giả sử có API này
export const deleteOrder = (orderId) =>
  axios.delete(`${API_BASE}/adorders/${orderId}`, getAuthHeader());