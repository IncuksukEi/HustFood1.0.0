import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './History.css';
import { getAllOrders } from '../../services/orderSevice';

const fakeData = [
    {
        order_id: 1,
        order_date: '2023-10-01',
        total_price: 55000,
        products: [
            {
                name: 'Bánh mì',
                description: 'Bánh mì thịt',
                url_img: 'banh-mi.jpg',
                quantity: 2,
                price: 40000,
            },
            {
                name: 'Cà phê',
                description: 'Cà phê đen',
                url_img: 'cafe.jpg',
                quantity: 1,
                price: 15000,
            }
        ],
    },
    {
        order_id: 2,
        order_date: '2023-10-02',
        total_price: 100000,
        products: [
            {
                name: 'Phở bò',
                description: 'Phở bò tái',
                url_img: 'pho-bo.jpg',
                quantity: 2,
                price: 100000,
            }
        ],
    }
];

const History = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders();
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        /*fetchOrders();*/
        setOrders(fakeData);
    }, []);

    return (
        <div className="app-container">
            <Header />
            <div className="history-page">
                <ProfileSidebar />
                <div className="history-content">
                    <div className="history-container">
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div className="order-card" key={order.order_id}>
                                    <div className="order-header">
                                        <h2>Đơn hàng #{order.order_id}</h2>
                                    </div>
                                    <div className="order-info">
                                        <span className="order-date">Ngày đặt: {order.order_date}</span>
                                    </div>
                                    <div className="order-items">
                                        <div className="item-header">
                                            <span className="col name">Tên sản phẩm</span>
                                            <span className="col quantity">Số lượng</span>
                                            <span className="col price">Thành tiền</span>
                                        </div>
                                        {order.products.map((product, index) => (
                                            <div className="item-details" key={index}>
                                                <span className="col name">{product.name}</span>
                                                <span className="col quantity">{product.quantity}</span>
                                                <span className="col price">{product.price.toLocaleString('vi-VN')}đ</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-total">
                                        <span>Tổng cộng:</span>
                                        <span className="total-amount">{order.total_price.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default History;
