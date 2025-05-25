import React, { useState, useEffect } from "react";

const IngredientsFormModal = ({ show, onClose, ingredient, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    unit: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    if (ingredient) {
      setForm(ingredient);
    } else {
      setForm({
        name: "",
        unit: "",
        quantity: 0,
        price: 0,
      });
    }
  }, [ingredient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{ingredient ? "Cập nhật nguyên liệu" : "Thêm nguyên liệu mới"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tên nguyên liệu"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="unit"
            placeholder="Đơn vị (ví dụ: kg, lít)"
            value={form.unit}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Số lượng"
            value={form.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Giá (VNĐ)"
            value={form.price}
            onChange={handleChange}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="save-btn">Lưu</button>
            <button onClick={onClose} className="cancel-btn">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IngredientsFormModal;
