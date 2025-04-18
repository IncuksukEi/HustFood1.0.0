import React from "react";
import ProductItem from "../components/ProductItem";
import products from "../data/products";

const ProductList = () => {
  return (
    <div className="grid__row">
      {products.map((product, index) => (
        <ProductItem key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;