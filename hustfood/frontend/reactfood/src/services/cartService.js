import axios from 'axios';

export const getAllCartItems = async (token) => {
    try {
        const response = await axios.get('http://localhost:8080/api/cart', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
}

export const removeCartItem = async (token, productId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/cart/${productId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
};

export const updateAllCartItem = async (token, data) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/cart/update`, data,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const addCartItem = async (token, data) => {
    try {
        const response = await axios.post('http://localhost:8080/api/cart/add', data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}