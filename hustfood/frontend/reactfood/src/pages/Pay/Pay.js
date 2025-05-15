import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Pay.css';
import { addOrder } from '../../services/orderSevice';
import { getAllCartItems } from '../../services/cartService';
import { getUser } from '../../services/userService';

const Pay = () => {
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState({
        deliveryAddress: '',
        paymentMethod: 'cod'
    });

    const [cartItems, setCartItems] = useState([]);
    const [mess, setMess] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const cartItems = await getAllCartItems(token);
                setCartItems(cartItems.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchCartItems();
    }, []);

    const handleGetDefaultAddress = async () => {
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const user = await getUser(token);
            setPaymentData({
                ...paymentData,
                deliveryAddress: user.data.address
            });
        } catch (error) {
            setError(error);
        }
    }

    const handlePay = async (e) => {
        setError(null);
        setMess(null);
        e.preventDefault();
        if (!paymentData.deliveryAddress) {
            setMess('Vui lòng nhập địa chỉ nhận hàng');
            return;
        }
        if (cartItems.length === 0) {
            setMess('Giỏ hàng trống');
            return;
        }
        const token = localStorage.getItem('token');
        try {
            const orderData = {
                address: paymentData.deliveryAddress,
                items: cartItems.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    description: item.description,
                    urlImg: item.urlImg,
                    price: item.price,
                    quantity: item.quantity
                }))
            };
            const response = await addOrder(token, orderData);
            if (response.status === 200) {
               setMess('Đặt hàng thành công');
               navigate('/history');
            }
        } catch (error) {
            setMess('Đặt hàng thất bại: ');
            setError(error);
        }
    }

    const handleChange = (e) => {
        setPaymentData({
            ...paymentData,
            [e.target.name]: e.target.value
        });
    };


    if (error) {
        return (
            <div className="error-message">
                <p>{error.response.data.message}</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="checkout_main">
                <div className="checkout_container">
                    <div className="checkout_content">
                        <h2>Thanh toán</h2>
                        <for className="checkout_form">
                            <div className="checkout_form-group">
                                <div className="checkout_form-group-label">
                                    <label>Địa chỉ nhận hàng</label>
                                    <label className="default_address" onClick={handleGetDefaultAddress}>Dùng địa chỉ mặc định</label>
                                </div>
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
                            <div className='check_mess'>
                                {mess && <p className={`check_mess-text ${!error ? "checkout_mess-ok" : ""}`}>{mess}</p>}
                            </div>
                            <button type="submit" className="checkout_submit-btn" onClick={handlePay}>
                                Xác nhận đặt hàng
                            </button>
                        </for>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Pay;