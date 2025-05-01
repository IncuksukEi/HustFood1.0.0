import React from "react";
import "./ProductItem.css"; // Import your CSS file for styling

const ProductItem = ({ imageUrl, name, oldPrice, currentPrice, sold, brand, origin, discount }) => {
  return (
    <div className="grid__column-2-4">
      <a className="home-product-item" href="product.html">
        <div
          className="home-product-item__img"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <h4 className="home-product-item__name">{name}</h4>
        <div className="home-product-item__price">
          <span className="home-product-item__price-old">{oldPrice}</span>
          <span className="home-product-item__price-current">{currentPrice}</span>
        </div>
        <div className="home-product-item__action">
          <span className="home-product-item__like home-product-item__like--liked">
            <i className="home-product-item__like-icon-empty fa-regular fa-heart"></i>
            <i className="home-product-item__like-icon-fill fa-solid fa-heart"></i>
          </span>
          <div className="home-product-item__rating">
            <i className="home-product-item__star--gold fa-solid fa-star"></i>
            <i className="home-product-item__star--gold fa-solid fa-star"></i>
            <i className="home-product-item__star--gold fa-solid fa-star"></i>
            <i className="home-product-item__star--gold fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <span className="home-product-item__sold">{sold} đã bán</span>
        </div>
        <div className="home-product-item__origin">
          <span className="home-product-item__brand">{brand}</span>
          <span className="home-product-item__origin-name">{origin}</span>
        </div>
        <div className="home-product-item__favourite">
          <i className="fa-solid fa-check"></i>
          <span>Yêu thích</span>
        </div>
        <div className="home-product-item__sale-off">
          <span className="home-product-item__sale-off-percent">{discount}</span>
          <span className="home-product-item__sale-off-label">GIẢM</span>
        </div>
      </a>
    </div>
  );
};

export default ProductItem;