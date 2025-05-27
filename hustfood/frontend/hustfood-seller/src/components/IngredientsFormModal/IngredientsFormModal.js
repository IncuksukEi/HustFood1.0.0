import React, { useState, useEffect } from "react";
import { getProducts } from "../../services/productService"; // cần có hàm này
import "./IngredientsFormModal.css";

const IngredientsFormModal = ({ isOpen, onClose, onSubmit, ingredient, isEditMode }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productId: null,
    name: "",
    quantity: "",
    unit: "",
    type: "",
    price: ""
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
  if (ingredient) {
    const matchedProduct = products.find(p => p.productId === ingredient.productId);
    setFormData({
      ...ingredient,
      productName: matchedProduct ? matchedProduct.name : ""
    });
  } else {
    setFormData({
      productName: "",
      productId: null,
      name: "",
      quantity: "",
      unit: "",
      type: "",
      price: ""
    });
  }
}, [ingredient, products]); // 👈 thêm cả `products` ở dependency

  useEffect(() => {
  getProducts().then(data => {
    console.log("Fetched products:", data); // phải là array
    setProducts(data);
  });
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };

    if (name === "productName") {
      const found = products.find(p => p.name === value);
      updated.productId = found ? found.productId : null;
    }

    setFormData(updated);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const payload = isEditMode
    ? {
        ...ingredient, // giữ toàn bộ dữ liệu cũ
        quantity: formData.quantity,
        price: formData.price
      }
    : formData;

  onSubmit(payload);
};

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditMode ? "Sửa nguyên liệu" : "Thêm nguyên liệu"}</h2>
        <form onSubmit={handleSubmit}>
          {!isEditMode && (
            <>
              <label>Món ăn (productName)</label>
              <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />

              <label>Tên nguyên liệu</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />

              <label>Loại</label>
              <input type="text" name="type" value={formData.type} onChange={handleChange} required />

              <label>Đơn vị</label>
              <input type="text" name="unit" value={formData.unit} onChange={handleChange} required />
            </>
          )}

          <label>SL/KL</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

          <label>Đơn giá</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <button type="submit">Lưu</button>
          <button type="button" onClick={onClose}>Hủy</button>
        </form>
      </div>
    </div>
  );
};

export default IngredientsFormModal;
