import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = ({ products, queryToBack, onCartChange}) => {
  return (
    <div className="grid__row">
      {products.map((product, index) => (
        <ProductItem 
        key={index} 
        {...product} 
        queryToBack={queryToBack}
        onCartChange={onCartChange}
        />
      ))}
    </div>
  );
};

export default ProductList;