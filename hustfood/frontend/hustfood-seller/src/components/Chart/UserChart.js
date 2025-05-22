import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics/customers-per-month")
      .then((res) => {
        const transformedData = res.data.map((item) => ({
          month: `T${item.month}`,
          total_customers: item.total_customers,
        }));
        setData(transformedData);
      })
      .catch((err) => {
        console.error("Error loading customer data:", err);
      });
  }, []);

  return (
    <div className="chart-container">
      <h3>Lượt khách theo tháng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total_customers" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;
