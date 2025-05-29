// import React, { useRef, useEffect, useState } from "react";
//import Sidebar from '../../components/Sidebar/Sidebar';
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Cards from "../../components/Cards/Cards";
import ActionsCard from "../../components/ActionsCard/ActionCard";
import ProductTable from "../../components/ProductTable/ProductTable";
import "../../assets/dashboard.css";
// import { exportData } from '../../services/dashboardService';
export default function DashboardPage() {
  return (
    <>
      <input type="checkbox" id="navbar-toggle" style={{ display: "none" }} />
      <label htmlFor="navbar-toggle" className="body-label"></label>
      <Navbar />
      <div className="main-content">
        <Header />
        <main>
          <div className="page-header">
            <div>
              <h1>Thống kê tài chính</h1>
              <small>
                Theo dõi các số liệu chính. Kiểm tra và xem thông tin chi tiết
              </small>
            </div>
            <div className="header-actions">
              {/* <button onClick={exportData}>
                <span className="las la-file-export"></span> Export
              </button> */}
              {/* <button>
                <span className="las la-tools"></span> Settings
              </button> */}
            </div>
          </div>
          <Cards />
          <div className="jobs-grid">
            <ActionsCard />
            <ProductTable />
          </div>
        </main>
      </div>
    </>
  );
}
