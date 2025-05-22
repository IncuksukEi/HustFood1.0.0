import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Work.css';

function Work() {
  return (
    <div>
      <Header />
      <div className="work-container">
        <h1>Chính Sách Hoạt Động</h1>

        <section>
          <h2>1. Giờ Phục Vụ</h2>
          <ul>
            <li>HustFood phục vụ từ 8:00 đến 20:00 mỗi ngày, bao gồm cả cuối tuần.</li>
            <li>Khung giờ cao điểm: 11:00 - 13:00 và 17:00 - 19:00. Vui lòng đặt sớm để tránh chờ đợi lâu.</li>
          </ul>
        </section>

        <section>
          <h2>2. Khu Vực Giao Hàng</h2>
          <ul>
            <li>Chúng tôi hiện giao hàng nội bộ trong khuôn viên Trường Đại học Bách Khoa Hà Nội.</li>
            <li>Các khu ký túc xá, thư viện và khu học tập đều được hỗ trợ.</li>
          </ul>
        </section>

        <section>
          <h2>3. Đảm Bảo Chất Lượng</h2>
          <ul>
            <li>Thực phẩm được chế biến trong ngày, đảm bảo an toàn và vệ sinh.</li>
            <li>HustFood kiểm định định kỳ nguyên liệu đầu vào từ nhà cung cấp uy tín.</li>
          </ul>
        </section>

        <section>
          <h2>4. Phản Hồi & Khiếu Nại</h2>
          <ul>
            <li>Chúng tôi luôn tiếp nhận mọi ý kiến góp ý qua mục "Trợ giúp" hoặc hotline hỗ trợ.</li>
            <li>Mọi khiếu nại sẽ được phản hồi trong vòng 24h kể từ khi tiếp nhận.</li>
          </ul>
        </section>

        <section>
          <h2>5. Trách Nhiệm Cộng Đồng</h2>
          <ul>
            <li>HustFood cam kết giảm thiểu rác thải nhựa và ưu tiên bao bì thân thiện với môi trường.</li>
            <li>Chúng tôi thường xuyên tổ chức chương trình đồng hành cùng sinh viên có hoàn cảnh khó khăn.</li>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Work;