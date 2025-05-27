import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ingredients';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getAllIngredients = () => {
  return axios.get(API_URL, getAuthHeaders());
};

export const getIngredientById = (id) => {
  return axios.get(`${API_URL}/${id}`, getAuthHeaders());
};

export const createIngredient = (ingredientData) => {
  return axios.post(API_URL, ingredientData, getAuthHeaders());
};

export const updateIngredient = (id, ingredientData) => {
  return axios.put(`${API_URL}/${id}`, ingredientData, getAuthHeaders());
};

export const deleteIngredient = (id) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
