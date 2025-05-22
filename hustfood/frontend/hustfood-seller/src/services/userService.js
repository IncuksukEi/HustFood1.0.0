// userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const getUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    return [];
  }
};
