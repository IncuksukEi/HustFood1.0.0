// src/pages/Help.js
import React from 'react';
import './Help.css';
import Header from '../../components/Header/Header'; 
import Footer from '../../components/Footer/Footer';
const faqs = [
  {
    question: "Làm thế nào để đặt món trên Hust's Food?",
    answer: "Bạn chỉ cần chọn món, thêm vào giỏ hàng và tiến hành thanh toán theo hướng dẫn."
  },
  {
    question: "Tôi có thể hủy đơn hàng sau khi đã đặt không?",
    answer: "Có, bạn có thể hủy đơn hàng trong vòng 5 phút sau khi đặt. Sau thời gian này, đơn hàng sẽ được xử lý và không thể hủy."
  },
  {
    question: "Tôi có thể thanh toán bằng phương thức nào?",
    answer: "Chúng tôi hỗ trợ thanh toán qua tiền mặt, thẻ ATM nội địa, Visa/MasterCard và ví điện tử."
  },
  {
    question: "Tôi không nhận được email xác nhận đơn hàng?",
    answer: "Vui lòng kiểm tra thư mục Spam hoặc liên hệ bộ phận chăm sóc khách hàng để được hỗ trợ."
  },
  {
    question: "Thời gian giao hàng trung bình là bao lâu?",
    answer: "Thông thường, thời gian giao hàng từ 20 đến 30 phút tùy khu vực."
  },
  {
    question: "Tôi muốn đổi hoặc trả món ăn?",
    answer: "Nếu có vấn đề với món ăn, vui lòng chụp ảnh và liên hệ chúng tôi trong vòng 1 giờ để được hỗ trợ đổi trả."
  }
];

const Help = () => {
  return (
    <><Header/>
    <div className="help-container">
      <h1>Trung Tâm Trợ Giúp</h1>
      <p className="intro">Dưới đây là những câu hỏi thường gặp từ khách hàng:</p>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 className="faq-question">Q: {faq.question}</h3>
            <p className="faq-answer">A: {faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer /></>
  );
};

export default Help;