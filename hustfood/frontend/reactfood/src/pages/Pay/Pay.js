import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Pay.css';

const Pay = () => {
    const [paymentData, setPaymentData] = useState({
        deliveryAddress: '',
        paymentMethod: 'cod'
    });

    const handleChange = (e) => {
        setPaymentData({
            ...paymentData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Payment Data:', paymentData);
    };

    return (
        <>
            <Header />
            <div className="checkout_main">
                <div className="checkout_container">
                    <div className="checkout_content">
                        <h2>Thanh toán</h2>
                        <form onSubmit={handleSubmit} className="checkout_form">
                            <div className="checkout_form-group">
                                <label>Địa chỉ nhận hàng</label>
                                <textarea
                                    name="deliveryAddress"
                                    value={paymentData.deliveryAddress}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nhập địa chỉ nhận hàng chi tiết"
                                    className="checkout_address"
                                />
                            </div>
                            <div className="checkout_form-group">
                                <label>Phương thức thanh toán</label>
                                <div className="checkout_payment-methods">
                                    <div className="checkout_payment-option">
                                        <input
                                            type="radio"
                                            id="cod"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentData.paymentMethod === 'cod'}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="cod">Thanh toán khi nhận hàng</label>
                                    </div>
                                    <div className="checkout_payment-option">
                                        <input
                                            type="radio"
                                            id="bank"
                                            name="paymentMethod"
                                            value="bank"
                                            checked={paymentData.paymentMethod === 'bank'}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="bank">Thanh toán qua ngân hàng</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="checkout_submit-btn">
                                Xác nhận đặt hàng
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Pay;