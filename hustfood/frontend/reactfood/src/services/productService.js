import axios from 'axios';

export const getProducts = async () => {
    try{
        const response = await axios.get('https://api.example.com/products'); // Replace with your API endpoint
        return response.data; // Assuming the API returns a JSON array of products
    }
    catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export const getBillboardImages = async () => {
    try {
        const response = await axios.get('https://api.example.com/billboards');
        return response.data;
    } catch (error) {
        console.error('Error fetching billboard images:', error);
        throw error;
    }
}