import axios from 'axios';

export const logoutUser = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/logout`);
      return response;
    } catch (error) {
      throw error;
    }
  };

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      return response;
    } catch (error) {
      throw error;
    }
  };

export const registerUser = async (full_name, phone, email, password) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/singup`, { full_name, phone, email, password });
      return response;
    } catch (error) {
      throw error;
    }
  };