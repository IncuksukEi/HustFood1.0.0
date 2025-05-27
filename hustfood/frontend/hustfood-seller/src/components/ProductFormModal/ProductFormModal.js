import React, { useState, useEffect } from "react"; 
import ProductForm from "../ProductForm/ProductForm";
import './ProductFormModal.css';

const ProductFormModal = ({ show, onClose, onSubmit, editingProduct, categories }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    category_id_combo: "",
    category_id_uu_dai: "",
    urlImg: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct({
        ...editingProduct,
        category_id_uu_dai:
          editingProduct.category_id_uu_dai === null ? "" : editingProduct.category_id_uu_dai.toString(),
      });
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        category_id_combo: "",
        category_id_uu_dai: "",
        urlImg: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  if (!show) return null;

  return (
    <div className="pfm-modal-overlay">
      <div className="pfm-modal-box">
        <h2 className="pfm-title">{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}</h2>
        <form onSubmit={handleSubmit} className="pfm-form">
          <ProductForm
            product={product}
            onChange={handleChange}
            categories={categories}
          />
          <div className="pfm-actions">
            <button type="submit" className="pfm-btn pfm-btn-green">Lưu</button>
            <button type="button" onClick={onClose} className="pfm-btn pfm-btn-blue">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;