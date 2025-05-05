import axios from 'axios';

export const logoutUser = async () => {
    try {
      const response = await axios.post(`https://auth/logout`);
      return response.data; // Return the logout status
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

