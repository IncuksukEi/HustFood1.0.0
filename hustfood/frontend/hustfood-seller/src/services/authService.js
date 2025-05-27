import axios from 'axios';

export const logoutUser = async (token) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/admin-login`, { email, password });
      localStorage.setItem('token', response.data.token);
      return response;
    } catch (error) {
      throw error;
    }
  };

export const registerUser = async (fullName, phone, email, password) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/signup`, { fullName, phone, email, password });
      return response;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };