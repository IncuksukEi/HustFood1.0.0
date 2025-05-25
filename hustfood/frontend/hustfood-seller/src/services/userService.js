import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/user';

// Lấy toàn bộ user
export const getUsers = async () => {
  try {
    const res = await axios.get(API_BASE_URL);
    return res.data.map(user => ({
      user_id: user.user_id,
      full_name: user.full_name
    }));
  } catch (err) {
    console.error('Lỗi khi lấy danh sách người dùng:', err);
    return [];
  }
};

// Thêm user mới
export const addUser = async (userData) => {
  try {
    const res = await axios.post(API_BASE_URL, userData);
    return res.data;
  } catch (err) {
    console.error('Lỗi khi thêm user mới:', err);
    throw err;
  }
};
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Đổi mật khẩu
export const resetPassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset-password`, {
      oldPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error.response?.data || error.message);
    throw error;
  }
};

// Tìm user theo email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/email`, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    console.error('User not found by email:', error);
    throw error;
  }
};

// Tìm user theo số điện thoại
export const getUserByPhone = async (phone) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/phone`, {
      params: { phone }
    });
    return response.data;
  } catch (error) {
    console.error('User not found by phone:', error);
    throw error;
  }
};

// Tìm user theo ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('User not found by ID:', error);
    throw error;
  }
};
