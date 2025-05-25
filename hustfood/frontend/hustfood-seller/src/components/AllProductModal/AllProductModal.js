// components/AllProductsModal.js
import React from 'react';
import './AllProductModal.css';

export default function AllProductModal({ products, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box large">
        <h2>Danh sách sản phẩm</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Giá</th>
              <th>Loại</th>
              <th>Đăng</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.type}</td>
                <td>{p.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}
