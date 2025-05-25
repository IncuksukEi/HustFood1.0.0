import axios from "axios";

const API_BASE = "http://localhost:8080/api/ingredients";

// Lấy token từ localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getIngredients = async () => {
  const response = await axios.get(API_BASE, getAuthHeaders());
  return response.data;
};

export const createIngredient = async (ingredientData) => {
  const response = await axios.post(API_BASE, ingredientData, getAuthHeaders());
  return response.data;
};

export const updateIngredient = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE}/${id}`, updatedData, getAuthHeaders());
  return response.data;
};
