import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './History.css';
import { getAllOrders } from '../../services/orderSevice';
import { updateOrderStatus } from '../../services/orderSevice';

const History = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [isOrderEmpty, setIsOrderEmpty] = useState(false);

    useEffect(() => {
        setError(null);
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await getAllOrders(token);
                if (response.data.length === 0) {
                    setIsOrderEmpty(true);
                    return;
                }
                    setOrders(response.data);
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
        fetchOrders();
    }, []);

    const handleUpdateOrderStatus = async (orderId, currentStatus) => {
        try {
            // Xác định status mới dựa trên status hiện tại
            const newStatus = currentStatus === 'PENDING' ? 'CANCELLED' : 
                            currentStatus === 'SHIPPED' ? 'RECEIVED' : currentStatus;
            
            const token = localStorage.getItem('token');
            console.log(token);
            console.log(orderId);
            console.log(newStatus);

            const response = await updateOrderStatus(token, orderId, { status: newStatus });
            
            if (response.status === 200) {
                const updatedOrders = orders.map((order) => {
                    if (order.orderId === orderId) {
                        return { ...order, status: newStatus };
                    }
                    return order;
                });
                setOrders(updatedOrders);
            }
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

    const handleMappingStatus = (status) => {
        switch (status) {
            case 'CONFIRMED':
                return 'Đã xác nhận';
            case 'CANCELLED':
                return 'Đã hủy';
            case 'SHIPPED':
                return 'Đang giao hàng';
            case 'RECEIVED':
                return 'Đã nhận hàng';
            default:
                return 'Chờ xác nhận';
        }
    };

    return (
        <div className="app-container">
            <Header />
            {error && (
                <div className="error-message">
                    <p>{error.response.data.message}</p>
                </div>
            )}
            <div className="history-page">
                <ProfileSidebar />
                
                {isOrderEmpty && (
                    <div className="empty-order-message">
                        <p>Không có đơn hàng nào</p>
                    </div>
                )}
                <div className="history-content">
                    <div className="history-container">
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div className="order-card" key={order.orderId}>
                                    <div className="order-header">
                                        <h2 className="order-id">ID : 00{order.orderId}</h2>
                                        <h2 className={`${
                                            order.status === 'CONFIRMED' ? 'order-status-confirmed' :
                                            order.status === 'CANCELLED' ? 'order-status-cancelled' :
                                            order.status === 'RECEIVED' ? 'order-status-received' :
                                            order.status === 'SHIPPED' ? 'order-status-shipped' : 'order-status'
                                        }`}>{handleMappingStatus(order.status)}</h2>
                                    </div>
                                    <div className="order-date">{order.orderTime}</div>
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
                                        <div className="order-actions">
                                            {order.status === 'PENDING' && (
                                                <button className="cancel-button" onClick={() => handleUpdateOrderStatus(order.orderId, order.status)}>Huỷ</button>
                                            )}
                                            {order.status === 'SHIPPED' && (
                                                <button className="confirm-button" onClick={() => handleUpdateOrderStatus(order.orderId, order.status)}>Xác nhận</button>
                                            )}
                                        </div>
                                        <div className="total-info">
                                            <span>Tổng cộng:</span>
                                            <span className="total-amount">{order.totalPrice.toLocaleString('vi-VN')}đ</span>
                                        </div>
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
