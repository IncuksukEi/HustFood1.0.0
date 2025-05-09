import axios from 'axios';

export const getAllCartItems = async (token) => {
    try {
        const response = await axios.get('https://cart', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removeCartItem = async (token, productId) => {
    try {
      const response = await axios.delete(`https://cart/${productId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return response.status;
    } catch (error) {
      throw error;
    }
};

export const updateAllCartItem = async (token, data) => {
    try {
        const response = await axios.put(`https://cart`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: data
        });
        return response.status;
    } catch (error) {
        throw error;
    }
}

export const addCartItem = async (token, data) => {
    try {
        const response = await axios.post('https://cart', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: data
        });
        return response.status;
    } catch (error) {
        throw error;
    }
}