// OrderManagement.js
import React, { useState, useEffect } from 'react';
import { getOrders, createOrder, updateOrder } from '../../services/orderService';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import Header from '../../components/Header/Header';
import OrderTable from '../../components/OrderTable/OrderTable';
import OrderFormModal from '../../components/OrderFormModal/OrderFormModel'; 
import OrderDetailModal from '../../components/OrderDetailModel/OrderDetailModel'; 
import '../../assets/ordersmana.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setShowFormModal(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setShowFormModal(true);
  };

  const handleViewDetail = async (order) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/details/${order.order_id}`);
      setOrderDetails(res.data);
      setSelectedOrder(order);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };

  const handleSaveOrder = async (formData) => {
    try {
      if (selectedOrder) {
        await updateOrder(selectedOrder.order_id, formData);
      } else {
        await createOrder(formData);
      }
      setShowFormModal(false);
      fetchOrders();
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
    }
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="main-content">
        <Header />
        <section className="orders">
          <h2>Danh sách đơn hàng</h2>
          <button id="addOrderBtn" onClick={handleAddOrder}>Thêm đơn hàng</button>
        </section>
        <OrderTable 
          orders={orders} 
          onEdit={handleEditOrder}
          onView={handleViewDetail}
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
