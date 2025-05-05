import axios from 'axios';

export const removeCartItem = async (itemId) => {
    try {
      const response = await axios.delete(`https://cart/${itemId}`);
      return response.data; // Return the updated cart
    } catch (error) {
      throw error;
    }
};

export const updateCartItem = async (itemId, data) => {
    try {
        const response = await axios.put(`https://cart/${itemId}`, data);
        return response.data; // Return the updated cart item
    } catch (error) {
        throw error;
    }
}