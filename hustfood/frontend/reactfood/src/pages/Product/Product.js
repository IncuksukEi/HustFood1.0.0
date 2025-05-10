import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Product.css';
import {getProductById} from '../../services/productService';
import productsData from '../../data/productsData';
import { addCartItem } from '../../services/cartService';

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');


    useEffect(() => {
        const productIdParam = searchParams.get('product_id');
        const handleProductId = async () => {
            if (productIdParam) {
                const productFound = await getProductById(productIdParam);
                setProduct(productFound);
            }
        }
        /*handleProductId();*/
        setProduct(productsData[productIdParam - 1]);
    }, []);

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const data = {
                product_id: product.id,
                quantity: quantity
            };
            try {
                await addCartItem(token, data);
            } catch (error) {
                console.error('Error adding product to cart:', error);
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
                        <img src={product.url_img} alt={product.name} className="product-image" />
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