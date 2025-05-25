import React from "react";

const IngredientsTable = ({ ingredients, onEdit }) => {
  return (
    <table className="ingredients-table">
      <thead>
        <tr>
          <th>Mã nguyên liệu</th>
          <th>Tên nguyên liệu</th>
          {/* <th>Đơn vị</th> */}
          <th>Số lượng</th>
          <th>Đơn giá (kg,l/VNĐ)</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((ingredient) => (
          <tr key={ingredient.ingredientId}>
            <td>{ingredient.ingredientId}</td>
            <td>{ingredient.name}</td>
            {/* <td>{ingredient.unit}</td> */}
            <td>{ingredient.quantity}</td>
            <td>{ingredient.price != null ? ingredient.price.toLocaleString() + "đ" : "0đ"}</td>
            <td>
              <button onClick={() => onEdit(ingredient)} className="edit-btn">
                Sửa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IngredientsTable;
