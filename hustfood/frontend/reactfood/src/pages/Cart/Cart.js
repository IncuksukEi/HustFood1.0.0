import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';
import { getAllCartItems } from '../../services/cartService';
import { updateAllCartItem } from '../../services/cartService';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const cartItems = await getAllCartItems(token);
        setItems(cartItems.data);
      } catch (error) {
          const errorData = error.response?.data;
            setError({
                response: {
                    data: {
                        message: errorData?.message || 'Có lỗi xảy ra, vui lòng thử lại'
                    }
                }
            });
      }
    };
    fetchCartItems();
  }, [])

  useEffect(() => {
      if (needUpdate) {
        const updateCart = async () => {
            await handleUpdateAllCartItems();
            setNeedUpdate(false);
        };
        updateCart();
      }
    }, [needUpdate]);

  const updateQuantity = (id, change) => {
    setItems(items.map(item => {
      if (item.productId === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
    setNeedUpdate(true);
  };

  const handleUpdateAllCartItems = async () => {
      try {
        const data = items.map((item) => ({product_id: item.productId, quantity: item.quantity}));
        const token = localStorage.getItem('token');
        await updateAllCartItem(token, data);
      } catch (error) {
        const errorData = error.response?.data;
        setError({
            response: {
                data: {
                    message: errorData?.message || 'Có lỗi xảy ra khi cập nhật giỏ hàng'
                }
            }
        });
      }
    };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

  const handleCheckout = () => {
    handleUpdateAllCartItems();
    navigate('/pay'); // Redirect to payment page
  }

  const handlePromoCode = () => {
    setError({
      response: {
        data: {
          message: 'Tính năng mã giảm giá sẽ sớm ra mắt'
        }
      }
    });
  };

  return (
    <>
    <Header />
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-header">
            <h2 className='cart-h2'>Giỏ hàng của bạn</h2>
          </div>
          
          {items.map(item => (
            <div className="cart-item">
              <div className="item-image">
                <img src={item.urlImg} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.productId, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
              </div>
              <div className="item-price">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}

          <button className="continue-shopping" onClick={() => {navigate('/')}}>← Trở về trang chủ</button>
        </div>

        <div className="order-summary">
          <h2 className='cart-h2'>Tóm tắt đơn hàng</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>SỐ LƯỢNG: {items.length}</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
            <div className="shipping">
              <select defaultValue="standard">
                <option value="standard">Giao hàng tiêu chuẩn</option>
                <option value="express">Giao hàng hoả tốc</option>
              </select>
            </div>
            <div className="promo-code">
              <input type="text" placeholder="Điền mã của bạn" />
              <button onClick={handlePromoCode}>Áp dụng</button>
            </div>
            <div className="total-cost">
              <span>Tổng</span>
              <span>{formatCurrency(calculateTotal() + 5000)}</span>
            </div>
            {error && (
              <div className="error-message">
                <p>{error.response.data.message}</p>
              </div>
            )}
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
