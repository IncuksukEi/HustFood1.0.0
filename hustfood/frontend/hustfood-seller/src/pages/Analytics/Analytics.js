import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import UserChart from '../../components/Chart/UserChart';
import SalesChart from '../../components/Chart/SalesChart';
import '../../assets/analytics.css';
import axios from 'axios';
import '../../services/analyticService';
function Analytics() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/analytics/total-customers'),
          axios.get('http://localhost:5000/api/analytics/total-orders'),
          axios.get('http://localhost:5000/api/analytics/total-products-sold'),
        ]);
        setTotalUsers(usersRes.data.total_customers || 0);
        setTotalOrders(ordersRes.data.total_orders || 0);
        setTotalProductsSold(parseInt(productsRes.data.total_products_sold) || 0);
      } catch (error) {
        console.error('❌ Lỗi lấy dữ liệu thống kê:', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <>
      <input type="checkbox" id="navbar-toggle" />
      <Navbar />
      <div className="main-content">
        <Header />
        <main>
          <div className="cards">
            <Card iconClass="la-users" number={totalUsers} label="Tổng số khách hàng" className="users" />
            <Card iconClass="la-envelope" number={totalOrders} label="Tổng số đơn hàng" className="orders" />
            <Card iconClass="la-shopping-cart" number={totalProductsSold} label="Tổng số sản phẩm" className="prod" />
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
