import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Chăm sóc khách hàng</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <a href="" className="footer-item__link">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li className="footer-item">
                <a href="" className="footer-item__link">Hust'food mail</a>
              </li>
              <li className="footer-item">
                <a href="" className="footer-item__link">
                  Hướng dẫn mua hàng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;