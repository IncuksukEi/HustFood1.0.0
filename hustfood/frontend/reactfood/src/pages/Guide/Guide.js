// src/pages/Guide.js
import React from 'react';
import './Guide.css';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';

const Guide = () => {
  return (
    <><Header/>
    <div className="guide-container">
      <h1>Hướng Dẫn Đặt Phần Ăn</h1>

      <section>
        <h2>1. Cách đặt phần ăn</h2>
        <p>Khách hàng có thể đặt phần ăn trên website <a href="https://www.hustfood.com.vn" target="_blank" rel="noopener noreferrer">www.hustfood.com.vn</a> bằng hai cách:</p>

        <h3>🔹 Cách 1: Đặt hàng trực tuyến trên website</h3>
        <ol>
          <li>Chọn phần ăn tại mục <strong>“Thực Đơn”</strong>.</li>
          <li>Các phần ăn đã chọn sẽ hiển thị trong mục <strong>“Phần ăn đã chọn”</strong> cùng với giá và tổng đơn hàng. Bạn có thể thêm hoặc bớt phần ăn tại đây.</li>
          <li>Nhấn <strong>“Đặt ngay”</strong> để tiếp tục.</li>
          <li>Nhập thông tin giao hàng: họ tên, địa chỉ, số điện thoại, email.</li>
          <li>Kiểm tra lại đơn tại trang <strong>“Xác nhận đơn hàng”</strong>, sau đó chọn <strong>“Đồng ý đặt hàng”</strong>.</li>
          <li>Hệ thống sẽ gửi tin nhắn xác nhận trong vòng 10 phút.</li>
        </ol>

        <h3>🔹 Cách 2: Gọi đến tổng đài 1900-1533</h3>
        <ol>
          <li>Liên hệ tổng đài viên để được hỗ trợ đặt hàng.</li>
          <li>Thông báo tên phần ăn và cung cấp thông tin giao hàng (họ tên, địa chỉ, tỉnh/thành, số điện thoại, yêu cầu thêm nếu có).</li>
          <li>Đơn hàng sẽ được giao tùy vào khoảng cách và giá trị đơn hàng:
            <ul>
              <li>Dưới 3km: Giao trong 30 phút (≥ 60.000 VNĐ).</li>
              <li>3–5km: Giao trong 45 phút (≥ 100.000 VNĐ).</li>
              <li>5–8km: Giao trong 60 phút (≥ 200.000 VNĐ).</li>
              <li>Trên 8km: <strong>Không hỗ trợ giao hàng</strong>.</li>
            </ul>
          </li>
        </ol>
      </section>

      <section>
        <h2>2. Lưu ý khi đặt hàng</h2>
        <ul>
          <li>Chỉ nhận đơn từ <strong>09:00 đến 21:00</strong> hằng ngày.</li>
          <li>Đơn hàng tối thiểu phải đạt <strong>30.000 VNĐ</strong>.</li>
        </ul>
      </section>

      <section>
        <h2>3. Xác nhận đơn hàng</h2>
        <p>Sau khi đặt hàng trực tuyến, hệ thống sẽ tự động gửi tin nhắn xác nhận đến điện thoại.</p>
        <p>Trong vòng 5 phút, nhân viên sẽ xử lý đơn và gửi tin nhắn bao gồm <strong>giá trị đơn hàng</strong> và <strong>thời gian giao dự kiến</strong>.</p>
        <p>Nếu sau 5 phút không nhận được tin nhắn, vui lòng gọi ngay đến <strong>1900-1533</strong> để được hỗ trợ.</p>
      </section>
    </div>
    <Footer /></>
  );
};

export default Guide;