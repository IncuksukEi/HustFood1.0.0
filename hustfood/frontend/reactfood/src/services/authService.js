import axios from 'axios';

export const logoutUser = async () => {
    try {
      const response = await axios.post(`https://auth/logout`);
      return response.status;
    } catch (error) {
      throw error;
    }
  };

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`https://auth/login`, { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      throw error;
    }
  };

export const registerUser = async (full_name, phone, email, password) => {
    try {
      const response = await axios.post(`https://auth/register`, { full_name, phone, email, password });
      return response.status;
    } catch (error) {
      throw error;
    }
  };