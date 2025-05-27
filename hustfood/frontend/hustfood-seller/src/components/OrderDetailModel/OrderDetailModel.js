import React from "react";
import "./OrderDetailModel.css"; // Quan trọng: Đảm bảo file được import

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="order-modal-overlay-1">
      <div className="order-modal-1">
        <h1>Chi tiết đơn hàng</h1>
        <p><strong>Khách hàng:</strong> {order.fullName}</p>
        <p><strong>SĐT:</strong> {order.phone}</p>
        <p><strong>Địa chỉ:</strong> {order.orderAddress}</p>
        <p><strong>Trạng thái:</strong> {order.status}</p>
        <p><strong>Ngày đặt:</strong> {order.orderTime}</p>
        <p><strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString("vi-VN")}₫</p>

        <h4>Sản phẩm:</h4>
        <table className="order-detail-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item) => (
              <tr key={item.orderDetailId}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString("vi-VN")}₫</td>
                <td>{(item.quantity * item.price).toLocaleString("vi-VN")}₫</td>
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
