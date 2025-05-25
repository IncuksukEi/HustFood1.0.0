// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const UserChart = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/analytics/monthly-customers")
//       .then((res) => {
//         const transformedData = res.data.map((item) => ({
//           month: `T${item.month}`,
//           customerCount: item.customerCount,
//         }));
//         setData(transformedData);
//       })
//       .catch((err) => {
//         console.error("❌ Lỗi tải dữ liệu lượt khách:", err);
//       });
//   }, []);

//   return (
//     <div className="chart-container">
//       <h3>Lượt khách theo tháng</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="customerCount" stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default UserChart;

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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/analytics/monthly-customers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const transformedData = res.data.map((item) => ({
          month: `${item.month}`,
          customerCount: item.customerCount,
        }));

        setData(transformedData);
      } catch (err) {
        console.error("Error loading customer data:", err);
      }
    };

    fetchData();
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
          <Line type="monotone" dataKey="customerCount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;

