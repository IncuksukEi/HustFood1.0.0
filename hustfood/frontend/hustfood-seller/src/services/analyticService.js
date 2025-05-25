import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/analytics';

export const getTotalCustomers = async () => {
  const res = await axios.get(`${BASE_URL}/unique-customers`);
  return res.data.customerCount;
};

export const getTotalOrders = async () => {
  const res = await axios.get(`${BASE_URL}/total-orders`);
  return res.data.orderCount;
};

export const getTotalProductsSold = async () => {
  const res = await axios.get(`${BASE_URL}/total-quantity`);
  return res.data.totalQuantitySold;
};

export const getRevenuePerMonth = async (year, month) => {
  const res = await axios.get(`${BASE_URL}/monthly-sales`, {
    params: { year, month },
  });
  return res.data; // trả về list<MonthlySalesDTO>
};

export const getCustomersPerMonth = async (year, month) => {
  const res = await axios.get(`${BASE_URL}/monthly-customers`, {
    params: { year, month },
  });
  return res.data; // trả về list<MonthlyCustomerDTO>
};
