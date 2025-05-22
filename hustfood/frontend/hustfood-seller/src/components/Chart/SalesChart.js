import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics/revenue-per-month")
      .then((res) => {
        const transformedData = res.data.map((item) => ({
          month: `T${item.month}`,
          total_revenue: parseFloat(item.total_revenue),
        }));
        setData(transformedData);
      })
      .catch((err) => {
        console.error("Error loading revenue data:", err);
      });
  }, []);

  return (
    <div className="chart-container">
      <h3>Doanh thu theo tháng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_revenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
