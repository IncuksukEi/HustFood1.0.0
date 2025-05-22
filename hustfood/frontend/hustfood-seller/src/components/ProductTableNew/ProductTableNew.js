
import React from 'react';

const ProductTableNew = ({ products, categories, onEdit, onDelete }) => {
  const getCategoryName = (id) => {
    const category = categories.find((c) => c.category_id === id);
        return category ? category.cate_name : 'Không rõ';
  };

  const renderTable = (categoryId, title) => {
    const filtered = products.filter((p) => p.category_id_combo === categoryId);

    return (
      <div className="table-wrapper">
        <h2>{title}</h2>
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
            {filtered.map((product) => (
              <tr key={product.product_id}>
                <td>{product.name}</td>
                <td>{product.category_id_uu_dai === 1 ? "✔️" : ""}</td>
                <td>{product.price} đ</td>
                <td>{getCategoryName(product.category_id)}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => onEdit(product)}>Sửa</button>
                  {/* <button onClick={() => onDelete(product.product_id)}>Xóa</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="product-table-container">
      {renderTable(3, 'Combo 1 người')}
      {renderTable(4, 'Combo nhóm')}
    </div>
  );
};

export default ProductTableNew;
