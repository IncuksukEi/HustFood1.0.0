import './IngredientsTable.css';

const IngredientsTable = ({ ingredients, onEdit, onDelete }) => {
  return (
    <table className="ingredients-table">
      <thead>
        <tr>
          <th>Tên nguyên liệu</th>
          <th>Loại</th>
          <th>Món ăn</th>
          <th>SL/KL</th>
          <th>Đơn vị</th>
          <th>Đơn giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(ingredients) ? (
          ingredients.map((ingredient) => (
            <tr key={ingredient.ingredientId}>
              <td>{ingredient.name}</td>
              <td>{ingredient.type}</td>
              <td>{ingredient.productName}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.unit}</td>
              <td>{ingredient.price.toLocaleString()}đ</td>
              <td>
                <button onClick={() => onEdit(ingredient)}>Sửa</button>
                <button onClick={() => onDelete(ingredient.ingredientId)}>Xóa</button>
              </td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="7">Không có dữ liệu nguyên liệu</td></tr>
        )}
      </tbody>
    </table>
  );
};

export default IngredientsTable;
