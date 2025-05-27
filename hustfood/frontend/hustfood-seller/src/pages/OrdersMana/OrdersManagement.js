// src/pages/OrderManagement/OrderManagement.js
import React, { useState, useEffect } from "react";
import {
  fetchOrders,
  fetchOrderById,
  deleteOrder
} from "../../services/ordermanaService";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import OrderTable from "../../components/OrderTable/OrderTable";
import OrderFormModal from "../../components/OrderFormModal/OrderFormModel";
import OrderDetailModal from "../../components/OrderDetailModel/OrderDetailModel";
import "../../assets/ordersmana.css";
import { Navigate } from "react-router-dom";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const loadOrders = async () => {
    try {
      const res = await fetchOrders();
      setOrders(res.data);
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setIsEdit(false);
    setShowFormModal(true);
  };

  const handleEdit = async (order) => {
    try {
      const res = await fetchOrderById(order.orderId);
      setSelectedOrder(res.data);
      setIsEdit(true);
      setShowFormModal(true);
    } catch (err) {
      console.error("Không lấy được dữ liệu đơn hàng:", err);
    }
  };

  const handleViewDetails = async (order) => {
    try {
      const res = await fetchOrderById(order.orderId);
      setSelectedOrder(res.data);
      setShowDetailModal(true);
    } catch (err) {
      console.error("Không thể hiển thị chi tiết đơn hàng:", err);
    }
  };

  const handleFormClose = () => {
    setShowFormModal(false);
  };

  const handleDetailClose = () => {
    setShowDetailModal(false);
  };

  const handleFormSubmit = () => {
    loadOrders(); // reload list sau khi thêm/sửa
  };
   const handleDeleteOrder = async (orderId) => {
      try {
        await deleteOrder(orderId);
        loadOrders(); // Refresh lại danh sách
      } catch (error) {
        console.error("Lỗi khi xoá đơn hàng:", error);
      }
    };
  return (
    <div className="admin-page">
      <input type="checkbox" id="navbar-toggle" style={{ display: "none" }} />
      <label htmlFor="navbar-toggle" className="body-label"></label>
      <Navbar />
      <div className="main-content">
        <Header />
        <section className="orders">
          <h2>Danh sách đơn hàng</h2>
          <button id="addOrderBtn" onClick={handleAddOrder}>
            Thêm đơn hàng
          </button>
        </section>
        <OrderTable
          orders={orders}
          onEdit={handleEdit}
          onViewDetails={handleViewDetails}
          onDelete={handleDeleteOrder}
        />
      </div>

      <OrderFormModal
        isOpen={showFormModal}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        selectedOrder={selectedOrder}
        isEdit={isEdit}
      />

      <OrderDetailModal
        isOpen={showDetailModal}
        onClose={handleDetailClose}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderManagement;
