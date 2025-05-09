import axios from 'axios';

export const getProducts = async () => {
    try{
        const response = await axios.get('https://api.example.com/products');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching products:', error);
        throw error; 
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`https://api.example.com/products/${productId}`);
        return response.data;
    }
    catch (error){
        console.error('Error fetching product by ID:', error);
        throw error;
    }
}