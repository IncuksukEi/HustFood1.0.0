import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Product.css';
import {getProductById} from '../../services/productService';
import { addCartItem } from '../../services/cartService';

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');


    useEffect(() => {
        setError(null);
        const productIdParam = searchParams.get('product_id');
        const handleProductId = async () => {
            if (productIdParam) {
                try {
                    const productFound = await getProductById(productIdParam);
                
                    if (productFound.status === 200) {
                        console.log(productFound.data);
                        setProduct(productFound.data);
                    }
                } catch (error) {
                    setError(error);
                }
            }
        }
        handleProductId();
    }, []);

    const handleAddToCart = async () => {
        setError(null);
        const token = localStorage.getItem('token');
        if (token) {
            const data = {
                product_id: product.productId,
                quantity: quantity
            };
            try {
                const response = await addCartItem(token, data);
                if (response.status === 200) {
                    window.dispatchEvent(new Event('updateHeader'));
                }
            } catch (error) {
                setError(error);
            }
        } else {
            console.error('User not authenticated');
        }
    }

    if (!product) {
        return (
            <div className="product-page">
                <Header />
                <div className="product-content">
                    <div>Sản phẩm không tồn tại hoặc đang tải...</div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="product-page">
            <Header />
            <div className="product-content">
                <div className="product-container">
                    <Link to={`/Search?q=${query}`} className="back-button">
                        ←
                    </Link>
                    <div className="product-left">
                        <img src={product.urlImg} alt={product.name} className="product-image" />
                    </div>
                    <div className="product-right">
                        <div className="product-header">
                            <h1>{product.name}</h1>
                            <span className="product-price">{product.price}đ</span>
                        </div>
                        <div className="product-description">
                            {product.description}
                        </div>
                        <div className="product-actions">
                            <div className="quantity-control">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            {error && (
                                <div className="error-message">
                                    <p>{error.response.data.message}</p>
                                </div>
                            )}
                            <button className="add-to-cart" onClick={handleAddToCart}>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;