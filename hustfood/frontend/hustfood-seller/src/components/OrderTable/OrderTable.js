import React from 'react';
import './OrderTable.css';
const OrderTable = ({ orders = [], onEdit, onView }) => {
  return (
    <div className="table-responsive-yeah">
      <table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên khách hàng</th>
            {/* <th>Sản phẩm</th>
            <th>Tổng tiền</th> */}
            <th>Trạng thái</th>
            {/* <th>Thanh toán</th> */}
            <th>Giá đơn hàng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.map((order, index) => (
            <tr key={index}>
              <td>{order.order_id}</td>
              {/* <td>{order.user_id}</td> */}
              <td>{order.full_name}</td>
              <td>{order.status}</td>
              <td>{order.total_price}</td>
              {/* <td>{order.status}</td>
              <td>{order.payment}</td>
              <td>{order.notes}</td> */}
              <td>
                <button onClick={() => onEdit(order)}>Sửa</button>
                <button onClick={() => onView(order)}>Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
