import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import ProductTableNew from "../../components/ProductTableNew/ProductTableNew";
import ProductFormModal from "../../components/ProductFormModal/ProductFormModal";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProductById,
} from "../../services/prodmanaService";
import axios from "axios";
import "../../assets/prodmana.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách sản phẩm:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh mục sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleSubmit = async (product) => {
  try {
    const parsedProduct = {
      name: product.name,
      description: product.description || "",
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      categoryId: product.categoryId === "" ? null : parseInt(product.categoryId),
      category_id_combo: product.category_id_combo === "" ? null : parseInt(product.category_id_combo),
      category_id_uu_dai:
        product.category_id_uu_dai === "" || product.category_id_uu_dai === null
          ? null
          : parseInt(product.category_id_uu_dai),
      urlImg: product.urlImg || "",
    };

    if (editingProduct) {
      await updateProduct(editingProduct.productId, parsedProduct);
    } else {
      console.log("Parsed product gửi lên:", parsedProduct);
      await createProduct(parsedProduct);
    }

    fetchProducts();
    setShowModal(false);
  } catch (err) {
    console.error("Lỗi khi lưu sản phẩm:", err);
  }
};


  const handleDelete = async (productId) => {
  try {
    const res = await deleteProductById(Number(productId));
    alert(res.message || "Xóa thành công!");
    fetchProducts();
  } catch (error) {
    alert(error.response?.data?.error || "Lỗi khi xóa sản phẩm");
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
      <input type="checkbox" id="navbar-toggle" style={{ display: "none" }} />
      <label htmlFor="navbar-toggle" className="body-label"></label>
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