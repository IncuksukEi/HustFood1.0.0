import axios from 'axios';

export const logoutUser = async () => {
    try {
      const response = await axios.post(`https://auth/logout`);
      return response.data; // Return the logout status
    } catch (error) {
      throw error;
    }
  };

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`https://auth/login`, { email, password });
      return response.data; // Return the login status
    } catch (error) {
      throw error;
    }
  };

export const registerUser = async (name, phone, email, password) => {
    try {
      const response = await axios.post(`https://auth/register`, { name, phone, email, password });
      return response.data; // Return the registration status
    } catch (error) {
      throw error;
    }
  };