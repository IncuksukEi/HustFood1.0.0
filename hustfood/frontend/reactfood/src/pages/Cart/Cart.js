import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';
import productsData from '../../data/productsData';
import { getCartItems } from '../../services/cartService';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems();
        setItems(cartItems);
      } catch (error) {
        setError(error);
      }
    };
    /*fetchCartItems();*/
    setItems(productsData); // Mock data for testing
  }, [])

  const updateQuantity = (id, change) => {
    setItems(items.map(item => {
      if (item.product_id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    navigate('/pay'); // Redirect to payment page
  }

  return (
    <>
    <Header />
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-header">
            <h2>Giỏ hàng của bạn</h2>
          </div>
          
          {items.map(item => (
            <div key={item.product_id} className="cart-item">
              <div className="item-image">
                <img src={item.url_img} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.product_id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product_id, 1)}>+</button>
              </div>
              <div className="item-price">
                {(item.price * item.quantity).toFixed(3)}đ
              </div>
            </div>
          ))}

          <button className="continue-shopping" onClick={() => {navigate('/')}}>← Trở về trang chủ</button>
        </div>

        <div className="order-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>SỐ LƯỢNG: {items.length}</span>
              <span>{calculateTotal().toFixed(3)}đ</span>
            </div>
            <div className="shipping">
              <select defaultValue="standard">
                <option value="standard">Giao hàng tiêu chuẩn</option>
                <option value="express">Giao hàng hoả tốc</option>
              </select>
            </div>
            <div className="promo-code">
              <input type="text" placeholder="Điền mã của bạn" />
              <button>Áp dụng</button>
            </div>
            <div className="total-cost">
              <span>Tổng</span>
              <span>{(calculateTotal() + 5.00).toFixed(3)}đ</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>THANH TOÁN</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Cart;
