import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './PayOrder.css';

function PayOrder() {
  return (
    <div>
      <Header />
      <div className="payorder-container">
        <h1>Chính Sách Đặt Hàng & Thanh Toán</h1>

        <section>
          <h2>1. Đặt Hàng</h2>
          <ul>
            <li>Đơn hàng được xử lý trong khung giờ hoạt động từ 8:00 - 20:00 hàng ngày.</li>
            <li>HustFood chỉ nhận đơn qua website chính thức hoặc ứng dụng di động.</li>
            <li>Vui lòng kiểm tra kỹ thông tin (món ăn, địa chỉ giao, số điện thoại) trước khi xác nhận.</li>
          </ul>
        </section>

        <section>
          <h2>2. Phương Thức Thanh Toán</h2>
          <ul>
            <li>Chấp nhận thanh toán qua Momo, ZaloPay và chuyển khoản ngân hàng.</li>
            <li>Thanh toán tiền mặt chỉ áp dụng cho khu vực trong trường Đại học Bách Khoa Hà Nội.</li>
            <li>Hóa đơn thanh toán sẽ được gửi qua email hoặc tài khoản HustFood của bạn.</li>
          </ul>
        </section>

        <section>
          <h2>3. Điều Chỉnh & Hủy Đơn</h2>
          <ul>
            <li>Bạn có thể chỉnh sửa hoặc hủy đơn trong vòng 5 phút sau khi đặt.</li>
            <li>Sau thời gian trên, hệ thống sẽ chuyển đơn sang trạng thái "Đang chuẩn bị" và không thể hủy.</li>
          </ul>
        </section>

        <section>
          <h2>4. Hoàn Tiền</h2>
          <ul>
            <li>Chúng tôi sẽ hoàn tiền 100% nếu đơn hàng bị lỗi do HustFood.</li>
            <li>Thời gian hoàn tiền: 3 - 5 ngày làm việc tùy theo phương thức thanh toán.</li>
          </ul>
        </section>

        <section>
          <h2>5. Liên Hệ Hỗ Trợ</h2>
          <p>Mọi thắc mắc về đơn hàng và thanh toán, vui lòng liên hệ qua mục "Trợ giúp" trên website hoặc gọi hotline: 1900 123 456.</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default PayOrder;