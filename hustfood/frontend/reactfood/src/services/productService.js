import axios from 'axios';

export const getProducts = async () => {
    try{
        // list all products
        // product_id
        // name
        // description
        // price
        // image_url
        // category_id
        // rating
        // sold_quantity
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
        // list 5
        // url_img
        // name
        const response = await axios.get('https://api.example.com/billboards'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching billboard images:', error);
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

// lấy danh sách 10 sản phẩm mới nhất để hiển thị trong thông báo
export const fetchLatestProducts = async () => {
    try {
      const response = await axios.get(`https://latest-products`);
      return response.data; // Return the list of latest products
    } catch (error) {
      throw error;
    }
};