import React from 'react';
import './NotificationItem.css';

const NotificationItem = ({ product }) => {
  return (
    <div className="notification-item">
      <div className="notification-img">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="notification-content">
        <div className="notification-name">{product.name}</div>
        <div className="notification-description">
          Sản phẩm mới đã được thêm vào cửa hàng!
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
