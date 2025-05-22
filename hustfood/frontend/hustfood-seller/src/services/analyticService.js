import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/analytics';

export const getTotalCustomers = async () => {
  const res = await axios.get(`${BASE_URL}/total-customers`);
  return res.data.total_customers;
};
export const getTotalOrders = async () => {
  const res = await axios.get('http://localhost:5000/api/analytics/total-orders'); //Tra ve 0
  return res.data.total_orders;
};
export const getTotalProductsSold = async () => {
  const res = await axios.get('http://localhost:5000/api/analytics/total-products-sold'); //Tra ve null
  return res.data.total_products_sold;
};
export const getCustomersPerMonth = async () => {
  const res = await axios.get('http://localhost:5000/api/analytics/customers-per-month'); //Chua tra ve
  return res.data;
};
export const getRevenuePerMonth = async () => {
  const res = await axios.get('http://localhost:5000/api/analytics/revenue-per-month'); //Chua tra ve
  return res.data;
};
