import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Đảm bảo đúng base path khi deploy hoặc dùng proxy

// Tạo Axios instance có sẵn Authorization header
const createAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Giả sử token được lưu sau khi đăng nhập
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ========== ORDERS ==========
export const getOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders`, createAuthHeaders());
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, orderData, createAuthHeaders());
  return response.data;
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const response = await axios.patch(
    `${API_BASE_URL}/orders/${orderId}/status`,
    { status: newStatus },
    createAuthHeaders()
  );
  return response.data;
};

// ========== ORDER DETAILS ==========
export const getAllOrderDetails = async () => {
  const response = await axios.get(`${API_BASE_URL}/orderdetails`, createAuthHeaders());
  return response.data;
};

export const getOrderDetailsByOrderId = async (orderId) => {
  const response = await axios.get(`${API_BASE_URL}/orderdetails/order/${orderId}`, createAuthHeaders());
  return response.data;
};

export const getOrderDetailsByProductId = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/orderdetails/product/${productId}`, createAuthHeaders());
  return response.data;
};

export const createOrderDetail = async (orderDetailData) => {
  const response = await axios.post(`${API_BASE_URL}/orderdetails`, orderDetailData, createAuthHeaders());
  return response.data;
};

export const deleteOrderDetail = async (orderDetailId) => {
  const response = await axios.delete(`${API_BASE_URL}/orderdetails/${orderDetailId}`, createAuthHeaders());
  return response.data;
};
export const getOrdersbyManagement = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders/management`, createAuthHeaders());
  return response.data;
};