import React from 'react';

const ProdProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table width="100%">
        <thead>
          <tr>
            <th><div>Tên sản phẩm</div></th>
            <th><div>Giá bán</div></th>
            <th><div>Các chi phí khác</div></th>
            <th><div>Lợi nhuận</div></th>
            <th><div>Loại</div></th>
            <th><div>Mô tả</div></th>
            <th><div>Trạng thái</div></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td><div>{product.name}</div></td>
              <td><div>{product.price}đ</div></td>
              <td><div>{product.extraCosts || 0}đ</div></td>
              <td><div>{(product.price - (product.extraCosts || 0))}đ</div></td>
              <td><div>{product.type}</div></td>
              <td><div>{product.description}</div></td>
              <td>
                <div className="product_actions">
                  <button className="edit" onClick={() => onEdit(product)}>Chỉnh sửa</button>
                  <button className="delete" onClick={() => onDelete(product)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProdProductTable;
