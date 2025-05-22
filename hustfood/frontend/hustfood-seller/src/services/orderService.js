
//orderService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

// Lấy danh sách đơn hàng
export const getOrders = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    return [];
  }
};

// Thêm đơn hàng
export const createOrder = async (orderData) => {
  try {
    const res = await axios.post(API_URL, orderData);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi thêm đơn hàng:", error);
    throw error;
  }
};

// Cập nhật đơn hàng
export const updateOrder = async (id, orderData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, orderData);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error);
    throw error;
  }
};

// Xóa đơn hàng
export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi xóa đơn hàng:", error);
    throw error;
  }
};
