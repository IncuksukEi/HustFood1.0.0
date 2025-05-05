import React, { useState } from 'react';
import './Cart.css';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Fifa 19',
      platform: 'PS4',
      price: 44.00,
      quantity: 1
    },
    {
      id: 2,
      name: 'Glacier White 500GB',
      platform: 'PS4',
      price: 249.99,
      quantity: 1
    },
    {
      id: 3,
      name: 'Platinum Headset',
      platform: 'PS4',
      price: 119.99,
      quantity: 1
    }
  ]);

  const updateQuantity = (id, change) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <>
    <Header />
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <span>{items.length} Items</span>
          </div>
          
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={`/images/product${item.id}.jpg`} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>{item.platform}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <div className="item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <button className="continue-shopping">← Continue Shopping</button>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>ITEMS {items.length}</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="shipping">
              <select defaultValue="standard">
                <option value="standard">Standard Delivery - $5.00</option>
                <option value="express">Express Delivery - $10.00</option>
              </select>
            </div>
            <div className="promo-code">
              <input type="text" placeholder="Enter your code" />
              <button>APPLY</button>
            </div>
            <div className="total-cost">
              <span>TOTAL COST</span>
              <span>${(calculateTotal() + 5.00).toFixed(2)}</span>
            </div>
            <button className="checkout-button">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Cart;
