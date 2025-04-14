import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="grid">
        <nav className="header__navbar">
          <ul className="header__navbar-list">
            <li className="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate">
              Vào các kênh trong cửa hàng
              <ul className="header__navbar-option">
                <li className="header__navbar-option-item header__navbar-option-item--active">
                  <span>Kênh người mua</span>
                  <i className="fa-solid fa-check"></i>
                </li>
                <a href="index1.html">
                  <li className="header__navbar-option-item">
                    <span>Kênh người bán</span>
                    <i className="fa-solid fa-check"></i>
                  </li>
                </a>
              </ul>
            </li>
            <li className="header__navbar-item">
              <span className="header__navbar-title--nopointer">Kết nối</span>
              <a href="" className="header__nav-icon-link">
                <i className="header__navbar-icon fa-brands fa-facebook"></i>
              </a>
              <a href="" className="header__nav-icon-link">
                <i className="header__navbar-icon fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;