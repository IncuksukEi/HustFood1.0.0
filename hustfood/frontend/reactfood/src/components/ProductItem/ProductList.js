import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = ({ products, queryToBack}) => {
  return (
    <div className="grid__row">
      {products.map((product, index) => (
        <ProductItem key={index} {...product} queryToBack={queryToBack}/>
      ))}
    </div>
  );
};

export default ProductList;