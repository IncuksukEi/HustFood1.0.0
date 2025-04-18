import axios from 'axios';

// Base URL for API requests
const BASE_URL = 'http://abc';

///////////////////////////
// Fetch social media links
export const getSocialMediaLinks = () => {
  return {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  };
};

// lấy danh sách sản phẩm mới nhất để hiển thị trong thông báo
export const fetchLatestProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/latest-products`);
    return response.data; // Return the list of latest products
  } catch (error) {
    throw error;
  }
};

// Register user (placeholder for modal handling)
export const openRegisterModal = () => {
  console.log('Open register modal');
};

// Login user (placeholder for modal handling)
export const openLoginModal = () => {
  console.log('Open login modal');
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/logout`);
    return response.data; // Return the logout status
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Perform search
export const performSearch = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query },
    });
    return response.data; // Return the search results
  } catch (error) {
    console.error('Error performing search:', error);
    throw error;
  }
};

// Remove an item from the cart
export const removeCartItem = async (itemId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/${itemId}`);
    return response.data; // Return the updated cart
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};