import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './History.css';

const mockOrders = [
    {
        date: '15/11/2023',
        orderNumber: 'DH001',
        items: [
            { name: 'Gà rán', quantity: 2, price: '75.000đ' },
            { name: 'Hamburger bò', quantity: 1, price: '45.000đ' },
            { name: 'Pepsi', quantity: 2, price: '15.000đ' }
        ],
        total: '225.000đ'
    },
    {
        date: '10/11/2023',
        orderNumber: 'DH002',
        items: [
            { name: 'Cơm gà', quantity: 1, price: '55.000đ' },
            { name: 'Khoai tây chiên', quantity: 2, price: '35.000đ' }
        ],
        total: '125.000đ'
    }
];

const History = () => {
    return (
        <>
            <Header />
            <div className="profile-page">
                <ProfileSidebar />
                <div className="history-content">
                    <h1>Đơn hàng đã đặt</h1>
                    {mockOrders.map((order, index) => (
                        <div className="order-card" key={index}>
                            <div className="order-header">
                                <h2>Đơn hàng ngày {order.date}</h2>
                                <span className="order-number">#{order.orderNumber}</span>
                            </div>
                            <div className="order-items">
                                {order.items.map((item, itemIndex) => (
                                    <div className="order-item" key={itemIndex}>
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-quantity">x{item.quantity}</span>
                                        <span className="item-price">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="order-total">
                                <span>Tổng cộng:</span>
                                <span className="total-amount">{order.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default History;
