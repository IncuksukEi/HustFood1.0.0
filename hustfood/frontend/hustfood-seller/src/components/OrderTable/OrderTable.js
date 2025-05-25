// components/OrderTable.js
import './OrderTable.css';

const OrderTable = ({ orders = [], onEdit, onView }) => {
  return (
    <div className="table-responsive-yeah">
      <table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên khách hàng</th>
            <th>Trạng thái</th>
            <th>Giá đơn hàng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.fullName}</td>
              <td>{order.status}</td>
              <td>{Number(order.price).toLocaleString()}đ</td>
              <td>
                <button onClick={() => onEdit(order)} color = 'GREEN'>Sửa</button>
                <button onClick={() => onView(order)} color = 'GREEN'>Chi tiết</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
