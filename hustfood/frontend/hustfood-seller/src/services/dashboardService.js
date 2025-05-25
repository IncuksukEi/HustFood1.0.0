import axios from 'axios';

const API_URL = 'http://localhost:8080/api/dashboard';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTotalRevenue = () => {
  return axios.get(`${API_URL}/total-revenue`, getAuthHeader());
};

export const getCancelledOrders = () => {
  return axios.get(`${API_URL}/cancelled-orders`, getAuthHeader());
};

export const getComboRevenue = () => {
  return axios.get(`${API_URL}/combo-revenue`, getAuthHeader());
};

export const getProductSales = () => {
  return axios.get(`${API_URL}/product-sales`, getAuthHeader());
};

// ✅ Hàm mới: Lấy tỷ lệ đơn hàng bị hủy
export const getCancelledOrderRate = () => {
  return axios.get(`${API_URL}/cancelled-rate`, getAuthHeader());
};
