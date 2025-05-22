import React from 'react';
import '../../assets/base.css';
import { Link } from 'react-router-dom';

const Navbar = ({ active }) => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <div className="brand-flex">
          <button className="las la-home"><a href="http://localhost:3000" className="buyer-button">
          <span className="las la-exchange-alt"></span>
        </a></button>
          <div className="brand-icons">
            {/* <span className="las la-bell"></span>
            <span className="las la-user-circle"></span> */}
          </div>
        </div>
      </div>

      {/* Nút chuyển về Kênh người mua */}
      {/* <div className="buyer-switch">
        <a href="http://localhost:3000" className="buyer-button">
          <span className="las la-exchange-alt"></span> Về kênh người mua
        </a>
      </div> */}

      <div className="navbar-main">
        <div className="navbar-user">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8-muodu8iTJoRpbs99GK1tSyrAQ66qBZa0A&s"
            alt=""
            width="40px"
          />
          <div>
            <h3>HUST FOOD</h3>
            <span>Trang quản lý</span>
          </div>
        </div>
        <div className="navbar-menu">
          <div className="menu-head"><span>Bảng điều khiển</span></div>
          <ul>
            <li>
              <Link to="/dashboard" className={active === 'dashboard' ? 'active' : ''}>
                <span className="las la-balance-scale"></span> Thống kê tài chính
              </Link>
            </li>
            <li>
              <Link to="/analytics" className={active === 'analytics' ? 'active' : ''}>
                <span className="las la-chart-pie"></span> Phân tích
              </Link>
            </li>
          </ul>
          <div className="menu-head"><span>Phần quản lý</span></div>
          <ul>
            <li>
              <Link to="/prodmana">
                <span className="las la-shopping-cart"></span> Quản lý sản phẩm
              </Link>
            </li>
            <li>
              <Link to="/ordersmana">
                <span className="las la-envelope"></span> Quản lý đơn hàng
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
