import axios from 'axios';

export const getProducts = async (query) => {
    try{
        const response = await axios.get(`http://localhost:8080/api/products/search?q=${query}`);
        return response;
    }
    catch (error) {
        throw error; 
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        return response;
    }
    catch (error){
        throw error;
    }
}