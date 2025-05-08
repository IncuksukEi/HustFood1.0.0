import axios from 'axios';

export const getCartItems = async () => {
    try {
        const response = await axios.get('https://cart');
        return response.data; // Return the cart items
    } catch (error) {
        throw error;
    }
}

export const getCartItemByProductId = async (user_id, productId) => {
    try {
        const response = await axios.get(`https://cart/${productId}/user/${user_id}`);
        return response.data; // Return the cart item by ID
    } catch (error) {
        throw error;
    }
}

export const removeCartItem = async (itemId) => {
    try {
      const response = await axios.delete(`https://cart/${itemId}`);
      return response.data; // Return the updated cart
    } catch (error) {
      throw error;
    }
};

export const updateCartItem = async (cartItemId, data) => {
    try {
        const response = await axios.put(`https://cart/${cartItemId}`, data);
        return response.data; // Return the updated cart item
    } catch (error) {
        throw error;
    }
}

export const addCartItem = async (data) => {
    try {
        const response = await axios.post('https://cart', data);
        return response.data; // Return the added cart item
    } catch (error) {
        throw error;
    }
}