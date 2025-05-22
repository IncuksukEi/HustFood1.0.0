// components/ProductModal.js
import React from 'react';
import './ProductModal.css';

export default function ProductModal({ onClose, product }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Chi tiết sản phẩm</h2>
        <p><strong>Tên:</strong> {product.name}</p>
        <p><strong>Giá:</strong> {product.price}</p>
        <p><strong>Loại:</strong> {product.type}</p>
        <p><strong>Đăng:</strong> {product.time}</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}
