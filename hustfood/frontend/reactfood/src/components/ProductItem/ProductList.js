import React, {useState, useEffect} from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";
import {getProducts} from "../../services/productService";

const ProductList = ({ products: searchResults }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // If search results are provided, use them
    if (searchResults) {
      setProducts(searchResults);
      return;
    }

    // Otherwise fetch all products
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchResults]);

  // Show message if no products found
  if (products.length === 0) {
    return <div className="no-results">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="grid__row">
      {products.map((product, index) => (
        <ProductItem key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;