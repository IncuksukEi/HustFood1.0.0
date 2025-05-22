// ProductManagement.js
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import ProductTableNew from '../../components/ProductTableNew/ProductTableNew';
import ProductFormModal from '../../components/ProductFormModal/ProductFormModal';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProductById,
} from '../../services/prodmanaService';
import axios from 'axios';
import '../../assets/prodmana.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // ✅ Load danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Lỗi khi tải danh sách sản phẩm:', err);
    }
  };

  // ✅ Load danh mục sản phẩm
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Lỗi khi tải danh mục sản phẩm:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ Xử lý thêm / cập nhật sản phẩm
  const handleSubmit = async (product) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.product_id, product);
      } else {
        await createProduct(product);
      }
      fetchProducts();
      setShowModal(false);
    } catch (err) {
      console.error('Lỗi khi lưu sản phẩm:', err);
    }
  };

  // ✅ Xử lý xóa sản phẩm
  const handleDelete = async (productId) => {
  try {
    console.log("Đang xóa sản phẩm có id:", productId);
    await deleteProductById(Number(productId));
    // toast.success("Xóa thành công");
    fetchProducts();
  } catch (error) {
    // if (error.response?.data?.error) {
    //   toast.error(error.response.data.error); // Thông báo lỗi rõ ràng từ backend
    // } else {
    //   toast.error("Lỗi khi xóa sản phẩm.");
    // }
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};



  const handleAddClick = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  return (
    <div className="product-management">
      <Navbar />
      <div className="main-content">
        <Header />
        <div className="product-management-container">
          <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
          <button className="add-button" onClick={handleAddClick}>
            Thêm sản phẩm
          </button>

          <ProductTableNew
            products={products}
            categories={categories}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />

          <ProductFormModal
            show={showModal}
            onClose={() => setShowModal(false)}
            editingProduct={editingProduct}
            categories={categories}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
