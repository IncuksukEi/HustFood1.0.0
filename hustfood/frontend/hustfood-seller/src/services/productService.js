import axios from 'axios';

// Trả về danh sách sản phẩm theo từ khóa tìm kiếm
export const getProducts = async (query = "") => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/search?q=${query}`);
        return response.data; // Chỉ lấy mảng data
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// Trả về chi tiết sản phẩm theo ID
export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        return response.data; // Chỉ lấy object data
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};
