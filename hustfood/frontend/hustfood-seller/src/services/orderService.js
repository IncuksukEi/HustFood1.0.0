import axios from "axios";

const BASE_URL = "http://localhost:8080/api/orders";

export const getAllOrders = async (token) => {
  try {
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addOrder = async (token, data) => {
  try {
    const res = await axios.post(BASE_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (token, orderId, data) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${orderId}/status`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
