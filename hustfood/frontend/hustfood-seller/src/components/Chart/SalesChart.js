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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/analytics/monthly-sales", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const transformedData = res.data.map((item) => ({
          month: `${item.month}`,
          sales: parseFloat(item.sales/1000),
        }));

        setData(transformedData);
      } catch (err) {
        console.error("Error loading revenue data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h3>Doanh thu theo tháng (kđ)</h3>
      <ResponsiveContainer width="100%" height={300}> 
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
