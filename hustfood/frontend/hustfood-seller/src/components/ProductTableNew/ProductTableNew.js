import React from "react";
import './ProductTableNew.css';

const ProductTableNew = ({ products, categories, onEdit, onDelete }) => {
  // Hàm render bảng cho từng nhóm sản phẩm
  const renderTable = (filteredProducts, title, keyPrefix) => (
    <div>
      <h2 className="text-xl font-semibold mt-6 mb-2">{title}</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Ưu đãi</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => {
            const categoryName =
              categories.find((cat) => cat.categoryId === product.categoryId)?.cateName || "Không rõ";

            return (
              <tr key={`${keyPrefix}-${product.productId}`}>
                <td>{product.name}</td>
                <td>{product.category_id_uu_dai ? "Y" : ""}</td>
                <td>{product.price.toLocaleString()}₫</td>
                <td>{categoryName}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => onEdit(product)}>Sửa</button>
                  <button onClick={() => onDelete(product.productId)}>Xóa</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // Tách sản phẩm theo loại combo
  const combo1Nguoi = products.filter((p) => p.category_id_combo === 3);
  const comboNhom = products.filter((p) => p.category_id_combo === 4);

  return (
    <div className="product-tables">
      {renderTable(combo1Nguoi, "Combo 1 người", "combo1")}
      {renderTable(comboNhom, "Combo nhóm", "comboGroup")}
    </div>
  );
};

export default ProductTableNew;
