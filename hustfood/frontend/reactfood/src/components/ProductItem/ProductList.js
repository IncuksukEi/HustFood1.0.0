import React, {useState, useEffect} from "react";
import ProductItem from "./ProductItem";
//import products from "../data/products";
import "./ProductList.css"; // Import your CSS file for styling
import {getProducts} from "../../services/productService"; // Import the product service

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid__row">
      {products.map((product, index) => (
        <ProductItem key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;