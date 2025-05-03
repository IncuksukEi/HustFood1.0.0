import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Product.css';

const Product = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="product-page">
            <Header />
            <div className="product-content">
                <div className="product-container">
                    <div className="product-left">
                        <img src="/images/combo-ga.png" alt="Combo Gà Rán 1" className="product-image" />
                    </div>
                    <div className="product-right">
                        <div className="product-header">
                            <h1>COMBO GÀ RÁN 1</h1>
                        </div>
                        <div className="product-description">
                            1 Miếng Gà Rán + 1 Khoai Tây Chiên (Vừa)/ 1 Khoai Tây Nghiền (Vừa) + 1 Bắp Cải Trộn (Vừa) + 1 Pepsi (Tiêu chuẩn) + 2 Gói tương (cát/ớt)
                        </div>
                        <div className="product-actions">
                            <div className="quantity-control">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button className="add-to-cart">Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;