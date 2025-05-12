import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './General.css';

function General() {
  return (
    <div>
      <Header />
      <div className="general-container">
        <h1>Quy Định Chung</h1>

        <section>
          <h2>1. Tài Khoản & Thông Tin</h2>
          <ul>
            <li>Người dùng cần cung cấp thông tin chính xác khi đăng ký tài khoản.</li>
            <li>Mỗi sinh viên chỉ được sử dụng một tài khoản cá nhân để đặt món.</li>
          </ul>
        </section>

        <section>
          <h2>2. Đặt Món & Thanh Toán</h2>
          <ul>
            <li>Mọi đơn hàng cần được xác nhận trước khi giao.</li>
            <li>Thanh toán có thể thực hiện online hoặc khi nhận hàng, tùy theo lựa chọn của bạn.</li>
          </ul>
        </section>

        <section>
          <h2>3. Hủy Đơn & Hoàn Tiền</h2>
          <ul>
            <li>Đơn hàng chỉ được hủy nếu chưa chuyển sang trạng thái "Đang chuẩn bị".</li>
            <li>HustFood sẽ hoàn tiền trong vòng 3 ngày làm việc đối với các giao dịch hợp lệ.</li>
          </ul>
        </section>

        <section>
          <h2>4. Quyền & Nghĩa Vụ</h2>
          <ul>
            <li>HustFood có quyền từ chối phục vụ nếu phát hiện hành vi gian lận hoặc vi phạm quy định.</li>
            <li>Người dùng có trách nhiệm kiểm tra kỹ đơn hàng trước khi xác nhận thanh toán.</li>
          </ul>
        </section>

        <section>
          <h2>5. Bảo Mật & Dữ Liệu</h2>
          <ul>
            <li>Chúng tôi cam kết bảo mật thông tin cá nhân của bạn và không chia sẻ với bên thứ ba khi chưa được phép.</li>
            <li>Người dùng cần tự bảo vệ tài khoản bằng cách không chia sẻ mật khẩu với người khác.</li>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default General;