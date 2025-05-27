// src/pages/Analytics/Analytics.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import UserChart from "../../components/Chart/UserChart";
import SalesChart from "../../components/Chart/SalesChart";
import "../../assets/analytics.css";
import axiosInstance from "../../services/axiosInstance";   // <── dùng instance có interceptor

function Analytics() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  const navigate = useNavigate();      // để chuyển hướng khi token hết hạn

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Nếu chưa đăng nhập → về trang login
        if (!localStorage.getItem("token")) {
          return navigate("/login");
        }

        // Gọi 3 API song song, axiosInstance tự gắn header Authorization
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          axiosInstance.get("/analytics/unique-customers"),
          axiosInstance.get("/analytics/total-orders"),
          axiosInstance.get("/analytics/total-quantity"),
        ]);

        setTotalUsers(usersRes.data.customerCount || 0);
        setTotalOrders(ordersRes.data.orderCount || 0);
        setTotalProductsSold(parseInt(productsRes.data.totalQuantitySold) || 0);
      } catch (error) {
        // Nếu 401 → xoá token & về login
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        console.error("❌ Lỗi lấy dữ liệu thống kê:", error);
      }
    };

    fetchAnalytics();
  }, [navigate]);

  return (
    <>
      <input type="checkbox" id="navbar-toggle" style={{ display: "none" }} />
      <label htmlFor="navbar-toggle" className="body-label"></label>

      <Navbar />
      <div className="main-content">
        <Header />
        <main>
          <div className="cards">
            <Card
              iconClass="la-users"
              number={totalUsers}
              label="Tổng số khách hàng"
              className="users"
            />
            <Card
              iconClass="la-envelope"
              number={totalOrders}
              label="Tổng số đơn hàng"
              className="orders1"
            />
            <Card
              iconClass="la-shopping-cart"
              number={totalProductsSold}
              label="Tổng số sản phẩm"
              className="prod"
            />
          </div>

          <div className="chart-grid">
            <UserChart />
            <SalesChart />
          </div>
        </main>
      </div>

      <label htmlFor="navbar-toggle" className="body-label"></label>
    </>
  );
}

export default Analytics;
