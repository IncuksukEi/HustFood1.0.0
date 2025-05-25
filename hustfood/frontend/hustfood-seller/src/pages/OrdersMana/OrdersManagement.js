import React, { useState, useEffect } from "react";
import {
  getOrdersbyManagement,
  createOrder,
  updateOrderStatus,
  getOrderDetailsByOrderId,
} from "../../services/ordermanaService";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import OrderTable from "../../components/OrderTable/OrderTable";
import OrderFormModal from "../../components/OrderFormModal/OrderFormModel";
import OrderDetailModal from "../../components/OrderDetailModel/OrderDetailModel";
import "../../assets/ordersmana.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrdersbyManagement();
      setOrders(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setShowFormModal(true);
  };

  const handleViewDetail = async (order) => {
    try {
      const details = await getOrderDetailsByOrderId(order.orderId);
      setSelectedOrder(order);
      setOrderDetails(details);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };

  const handleSaveOrder = async (formData) => {
    try {
      await createOrder(formData);
      setShowFormModal(false);
      fetchOrders();
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
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
          onView={handleViewDetail}
          onEdit={(order) => {
            setSelectedOrder(order);
            setShowFormModal(true);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>

      <OrderFormModal
        show={showFormModal}
        onClose={() => setShowFormModal(false)}
        order={selectedOrder}
        onSave={handleSaveOrder}
      />

      <OrderDetailModal
        show={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        order={selectedOrder}
        details={orderDetails}
      />
    </div>
  );
};

export default OrderManagement;
