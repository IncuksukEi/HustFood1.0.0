import { useNavigate } from "react-router-dom";
import "./ProductItem.css";
import { addCartItem } from "../../services/cartService";

const ProductItem = ({ product_id, name, price, url_img, description, queryToBack }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/product?product_id=${product_id}&q=${queryToBack}`);
  }

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    const cartItem = {
      product_id,
      quantity: 1
    };
    try {
      const response = await addCartItem(cartItem, token);
      if (response === 200) {
        alert("Thêm sản phẩm vào giỏ hàng thành công!");
      } else {
        alert("Thêm sản phẩm vào giỏ hàng thất bại.");
      }
    } catch (error) {
      alert("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
    }
  }

  return (
    <div className="grid__column-2-4">
      <div className="home-product-item">
        <div
          key={product_id}
          className="home-product-item__img"
          style={{ backgroundImage: `url(${url_img})` }}
          onClick={() => handleImageClick()}
        ></div>
        <h4 className="home-product-item__name">{name}</h4>
        <div className="home-product-item__price">
          <span className="home-product-item__price-current">{price}đ</span>
        </div>
        <div className="home-product-item__description">
          <span className="home-product-item__description-text">
            {description}
          </span>
        </div>
        <button className="home-product-item__add-btn" onClick={handleAddToCart}>
          Thêm
        </button>
      </div>
    </div>
  );
};

export default ProductItem;