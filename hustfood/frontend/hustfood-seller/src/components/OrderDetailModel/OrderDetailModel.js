//KHONG CAN THAY DOI
//OrderDetailModel.js
// import React from "react";
import "./OrderDetailModel.css";

const OrderDetailModal = ({ order, details, show, onClose }) => {
  if (!show || !order) return null;

  return (
    <div className="order-modal-overlay-1">
      <div className="order-modal-1">
        <h2>Chi tiết đơn hàng #{order.orderId}</h2>
        <table className="order-modal-table-1">
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
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()}đ</td>
                <td>{(item.price * item.quantity).toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="order-modal-close-button-1" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
