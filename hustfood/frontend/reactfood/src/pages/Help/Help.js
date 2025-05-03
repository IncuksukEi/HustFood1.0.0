import React from 'react';
import { Link } from 'react-router-dom';
import './Help.css';

const Help = () => {
  return (
    <div className="help-page">
      <Link to="/" className="back-button">
        <i className="fas fa-arrow-left"></i>
        <span>Trang chủ</span>
      </Link>
      
      <div className="help-banner">
        <h1>Trung tâm trợ giúp</h1>
        <p>Chúng tôi có thể giúp gì cho bạn?</p>
      </div>

      <div className="help-search">
        <input type="text" placeholder="Tìm kiếm câu hỏi..." />
      </div>

      <div className="help-sections">
        <div className="help-section">
          <h2>Câu hỏi thường gặp</h2>
          <div className="faq-list">
            <div className="faq-group">
              <div className="faq-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="faq-content">
                <h3>Làm thế nào để đặt hàng?</h3>
                <div className="faq-steps">
                  <p>1. Chọn món ăn bạn muốn từ thực đơn</p>
                  <p>2. Thêm món ăn vào giỏ hàng</p>
                  <p>3. Điền thông tin giao hàng</p>
                  <p>4. Tiến hành thanh toán</p>
                  <p>5. Đợi món ăn được giao đến địa chỉ của bạn</p>
                </div>
              </div>
            </div>

            <div className="faq-group">
              <div className="faq-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <div className="faq-content">
                <h3>Phương thức thanh toán?</h3>
                <div className="payment-methods">
                  <div className="payment-method">
                    <i className="fas fa-money-bill"></i>
                    <span>Tiền mặt</span>
                  </div>
                  <div className="payment-method">
                    <i className="fas fa-credit-card"></i>
                    <span>Thẻ ngân hàng</span>
                  </div>
                  <div className="payment-method">
                    <i className="fas fa-mobile-alt"></i>
                    <span>Ví điện tử</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="faq-group">
              <div className="faq-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="faq-content">
                <h3>Thời gian giao hàng?</h3>
                <div className="delivery-info">
                  <p className="delivery-time">20-30 phút</p>
                  <p className="delivery-note">*Thời gian có thể thay đổi tùy theo khu vực</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="help-section">
          <h2>Liên hệ với chúng tôi</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h4>Hotline</h4>
              <p>1900 xxxx</p>
            </div>
            <div className="contact-item">
              <h4>Email</h4>
              <p>support@hustfood.com</p>
            </div>
            <div className="contact-item">
              <h4>Địa chỉ</h4>
              <p>Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
