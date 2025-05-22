// OrderFormModal.js
import React, { useState, useEffect } from 'react';
import './OrderFormModel.css';
import { getUsers } from '../../services/userService'; // Bạn cần tạo file này

const OrderFormModal = ({ show, onClose, order, onSave }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user_id: order?.user_id || '',
    status: order?.status || 'PENDING',
    total_price: order?.total_price || '',
  });
  const [isNewUser, setIsNewUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleUserChange = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setIsNewUser(true);
      setFormData((prev) => ({ ...prev, user_id: '' }));
    } else {
      setIsNewUser(false);
      setFormData((prev) => ({ ...prev, user_id: value }));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNewUser && newUserName.trim()) {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name: newUserName })
        });

        const newUser = await response.json();
        formData.user_id = newUser.user_id; // Gán ID mới tạo

      } catch (err) {
        alert('❌ Lỗi khi thêm khách hàng mới');
        return;
      }
    }

  onSave(formData);
};


  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{order ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng mới'}</h2>
        <form className="order-form" onSubmit={handleSubmit}>
          <label>Khách hàng:</label>
            <select name="user_id" value={formData.user_id} onChange={handleUserChange}>
              <option value="">-- Chọn khách hàng --</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.full_name}
                </option>
              ))}
              {/* <option value="new">* Thêm khách hàng mới * (COMING SOON)</option> */}
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
          </select>

          <label>Giá đơn hàng:</label>
          <input
            type="number"
            name="total_price"
            value={formData.total_price}
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
