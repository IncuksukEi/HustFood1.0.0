import './ProductForm.css';

const ProductForm = ({ product, onChange, categories }) => {
  return (
    <div className="pf-product-form">
      <div className="pf-form-group">
        <label>Tên sản phẩm:</label>
        <input type="text" name="name" value={product.name} onChange={onChange} className="pf-form-input" />
      </div>

      <div className="pf-form-group">
        <label>Mô tả:</label>
        <textarea name="description" value={product.description} onChange={onChange} className="pf-form-input" />
      </div>

      <div className="pf-form-group">
        <label>Giá:</label>
        <input type="number" name="price" value={product.price} onChange={onChange} className="pf-form-input" />
      </div>

      <div className="pf-form-group">
        <label>Kho:</label>
        <input type="number" name="stock" value={product.stock} onChange={onChange} className="pf-form-input" />
      </div>

      <div className="pf-form-group">
        <label>Danh mục:</label>
        <select name="categoryId" value={product.categoryId} onChange={onChange} className="pf-form-input">
          <option value="">-- Chọn danh mục --</option>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.cateName}
              </option>
            ))}
        </select>
      </div>

      <div className="pf-form-group">
        <label>Combo:</label>
        <select name="category_id_combo" value={product.category_id_combo} onChange={onChange} className="pf-form-input">
          <option value="">-- Chọn combo --</option>
          <option value={3}>Combo 1 người</option>
          <option value={4}>Combo nhóm</option>
        </select>
      </div>

      <div className="pf-form-group">
        <label>Ưu đãi:</label>
        <select
          name="category_id_uu_dai"
          value={product.category_id_uu_dai === null ? "" : product.category_id_uu_dai}
          onChange={onChange}
          className="pf-form-input"
        >
          <option value="">Không</option>
          <option value="1">Có</option>
        </select>
      </div>

      <div className="pf-form-group">
        <label>Ảnh:</label>
        <input type="text" name="urlImg" value={product.urlImg} onChange={onChange} className="pf-form-input" />
      </div>
    </div>
  );
};

export default ProductForm;