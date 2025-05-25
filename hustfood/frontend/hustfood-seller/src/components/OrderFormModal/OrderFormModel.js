// OrderFormModal.js
import { useState, useEffect } from 'react';
import './OrderFormModel.css';
import { getUsers } from '../../services/userService';

const OrderFormModal = ({ show, onClose, order, onSave }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: order?.userId || '',
    status: order?.status || 'PENDING',
    totalPrice: order?.totalPrice || '',
  });
  const [isNewUser, setIsNewUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    if (show) fetchUsers();
  }, [show]);

  useEffect(() => {
    if (order) {
      setFormData({
        userId: order.userId || '',
        status: order.status || 'PENDING',
        totalPrice: order.totalPrice || '',
      });
      setIsNewUser(false);
      setNewUserName('');
    }
  }, [order]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách người dùng:', err);
    }
  };

  const handleUserChange = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setIsNewUser(true);
      setFormData((prev) => ({ ...prev, userId: '' }));
    } else {
      setIsNewUser(false);
      setFormData((prev) => ({ ...prev, userId: value }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalForm = { ...formData };

    if (isNewUser && newUserName.trim()) {
      try {
        const response = await fetch('http://localhost:8080/api/user/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName: newUserName }),
        });
        if (!response.ok) throw new Error('Tạo người dùng thất bại');
        const newUser = await response.json();
        finalForm.userId = newUser.userId;
      } catch (err) {
        alert('❌ Lỗi khi thêm khách hàng mới');
        return;
      }
    }

    onSave(finalForm);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{order ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng mới'}</h2>
        <form className="order-form" onSubmit={handleSubmit}>
          <label>Khách hàng:</label>
          <select name="userId" value={formData.userId} onChange={handleUserChange} required>
            <option value="">-- Chọn khách hàng --</option>
            {users.map((u) => (
              <option key={u.userId} value={u.userId}>
                {u.fullName}
              </option>
            ))}
            <option value="new">* Thêm khách hàng mới *</option>
          </select>

          {isNewUser && (
            <>
              <label>Tên khách hàng mới:</label>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                required
              />
            </>
          )}

          <label>Trạng thái:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="RECEIVED">RECEIVED</option>
          </select>

          <label>Giá đơn hàng:</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="submit" className="btn-save">Lưu</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormModal;
