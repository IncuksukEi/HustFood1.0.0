import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductItem.css";
import { addCartItem } from "../../services/cartService";

const ProductItem = ({ productId, name, price, urlImg, description, queryToBack, onCartChange }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleImageClick = () => {
    navigate(`/product?product_id=${productId}&q=${queryToBack}`);
  }

  const handleAddToCart = async () => {
    setError(null);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    const cartItem = {
      product_id: productId,
      quantity: 1
    };
    try {
      const response = await addCartItem(token, cartItem);
      if (response.status === 200) {
        if (onCartChange) {
          onCartChange();
        }
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="grid__column-2-4">
      <div className="home-product-item">
        <div
          key={productId}
          className="home-product-item__img"
          style={{ backgroundImage: `url(${urlImg})` }}
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
        {error && (
          <div className="error-message">
            <p>{error.response.data.message}</p>
          </div>
        )}
        <button className="home-product-item__add-btn" onClick={handleAddToCart}>
          Thêm
        </button>
      </div>
    </div>
  );
};

export default ProductItem;