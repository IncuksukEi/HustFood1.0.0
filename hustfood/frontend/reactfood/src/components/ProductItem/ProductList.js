import React, {useState, useEffect} from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";
import {getProducts} from "../../services/productService";
import { Link } from 'react-router-dom';

const ProductList = ({ products: searchResults, queryToBack}) => {
  const [products, setProducts] = useState([]); // Initialize with productsData

  useEffect(() => {
    // Update products if search results are provided
    if (searchResults) {
      setProducts(searchResults);
    }
  }, [searchResults]);

  // Show message if no products found
  if (products.length === 0) {
    return <div className="no-results">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="grid__row">
      {products.map((product, index) => (
        <ProductItem key={index} {...product} queryToBack={queryToBack}/>
      ))}
    </div>
  );
};

export default ProductList;