const OrderTable = ({ orders, onEdit, onViewDetails, onDelete }) => {
  return (
    <div className="order-table-wrapper">
      <table className="order-table">
        <thead>
          <tr>
            <th>Tên khách hàng</th>
            <th>Trạng thái</th>
            <th>Giá</th>
            <th>Ngày</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.fullName}</td>
              <td>{order.status}</td>
              <td>{order.totalPrice.toLocaleString("vi-VN")}₫</td>
              <td>{order.orderTime}</td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(order)}>Sửa</button>
                <button className="btn-view" onClick={() => onViewDetails(order)}>Chi tiết</button>
                <button className="btn-delete" onClick={() => {
                  if (window.confirm("Bạn có chắc chắn muốn xoá đơn hàng này?")) {
                    onDelete(order.orderId);
                  }
                }}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrderTable;