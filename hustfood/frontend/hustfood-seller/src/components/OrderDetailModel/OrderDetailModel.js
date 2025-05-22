
//OrderDetailModel.js
import React from "react";
import "./OrderDetailModel.css";

const OrderDetailModal = ({ order, details, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="order-modal-overlay">
      <div className="order-modal">
        <h2>Chi tiết đơn hàng #{order.order_id}</h2>
        <table className="order-modal-table">
          <thead>
            <tr>
              <th>Mã SP</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item) => (
              <tr key={item.product_id}>
                <td>{item.product_id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()}đ</td>
                <td>{(item.price * item.quantity).toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="order-modal-close-button" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
