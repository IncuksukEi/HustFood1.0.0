import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Pay.css";

const Pay = () => {
  return (
    <>
      <Header />
      <div className="pay-container">
        <div className="pay-content">
          <h2>Thanh toán</h2>
          <div className="form-group">
            <label>Địa chỉ nhận hàng</label>
            <input type="text" placeholder="Tên người nhận" />
            <input type="text" placeholder="Số điện thoại" />
            <input type="text" placeholder="Địa chỉ cụ thể" />
          </div>

          <div className="form-group">
            <label>Sản phẩm</label>
            <p>Gà rán 35.000đ × 2 = <b>70.000đ</b></p>
          </div>

          <div className="form-group">
            <label>Phương thức thanh toán</label>
            <select>
              <option>Thanh toán khi nhận hàng</option>
              <option>Chuyển khoản ngân hàng</option>
            </select>
          </div>

          <p>
            Khi nhấn <b>Đặt ngay</b>, bạn xác nhận đồng ý mua đồ ăn tại Hust Food.
          </p>
          <p><b>Tổng thanh toán:</b></p>
          <button className="btn-order">Đặt ngay</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pay;