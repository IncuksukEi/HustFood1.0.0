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
    const [confirmDialog, setConfirmDialog] = useState({
        show: false,
        orderId: null,
        status: null
    });

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
        const newStatus = currentStatus === 'PENDING' ? 'CANCELLED' : 
                         currentStatus === 'SHIPPED' ? 'RECEIVED' : currentStatus;
        
        setConfirmDialog({
            show: true,
            orderId: orderId,
            status: newStatus
        });
    };

    const confirmStatusUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await updateOrderStatus(token, confirmDialog.orderId, { status: confirmDialog.status });
            
            if (response.status === 200) {
                const updatedOrders = orders.map((order) => {
                    if (order.orderId === confirmDialog.orderId) {
                        return { ...order, status: confirmDialog.status };
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
        setConfirmDialog({ show: false, orderId: null, status: null });
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
            {confirmDialog.show && (
                <div className="confirm-dialog-overlay">
                    <div className="confirm-dialog">
                        <p>Bạn có chắc chắn muốn {confirmDialog.status === 'CANCELLED' ? 'huỷ' : 'xác nhận'} đơn hàng này?</p>
                        <div className="confirm-dialog-buttons">
                            <button className="confirm-yes" onClick={confirmStatusUpdate}>Đồng ý</button>
                            <button className="confirm-no" onClick={() => setConfirmDialog({ show: false, orderId: null, status: null })}>Quay lại</button>
                        </div>
                    </div>
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
