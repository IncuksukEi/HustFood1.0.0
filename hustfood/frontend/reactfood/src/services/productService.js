import axios from 'axios';

export const getProducts = async (query) => {
    try{
        const response = await axios.get(`https://api.example.com/search?q=${query}`);
        return response.data;
    }
    catch (error) {
        throw error; 
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`https://api.example.com/products/${productId}`);
        return response.data;
    }
    catch (error){
        throw error;
    }
}