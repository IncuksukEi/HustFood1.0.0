import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'; // Import các icon cần dùng
import Header from '../../components/Header/Header'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import './Home.css';
import "../../styles/base.css";
import ProductList from '../../components/ProductItem/ProductList';

function Home() {
  return (
  <><Header />
    <div className="app__container">
      <div className="grid">
        <div className="grid__row app__content">
          <Sidebar />
          <div className="grid__column-10">
            <div className="home-filter">
              <span className="home-filter__label">Sắp xếp theo</span>
              <button className="home-filter__btn btn">Phổ biến</button>
              <button className="home-filter__btn btn btn--primary">Mới nhất</button>
              <button className="home-filter__btn btn">Bán chạy</button>
              <div className="select-input">
                <span className="select-input__label">Giá</span>
                <FontAwesomeIcon icon={faAngleDown} className="select-input__icon" /> {/* Sử dụng icon từ react-fontawesome */}
                <ul className="select-input__list">
                  <li className="select-input__item">
                    <a href="#" className="select-input__link">Giá: Thấp đến cao</a>
                  </li>
                  <li className="select-input__item">
                    <a href="#" className="select-input__link">Giá: Cao đến thấp</a>
                  </li>
                </ul>
              </div>
              <div className="home-filter__page">
                <span className="home-filter__page-num">
                  <span className="home-filter__page-current">1</span> / <span className="home-filter__page-all">14</span>
                </span>
                <div className="home-filter__page-control">
                  <a href="#" className="home-filter__page-btn home-filter__page-btn--disabled">
                    <FontAwesomeIcon icon={faAngleLeft} className="home-filter__page-icon" /> {/* Sử dụng icon từ react-fontawesome */}
                  </a>
                  <a href="#" className="home-filter__page-btn">
                    <FontAwesomeIcon icon={faAngleRight} className="home-filter__page-icon" /> {/* Sử dụng icon từ react-fontawesome */}
                  </a>
                </div>
              </div>
            </div>
            <div className="home-product">
              <ProductList />
              {/* code ở đây thiếu */}
            </div>
            <ul className="pagination home-product__pagination">
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">
                  <FontAwesomeIcon icon={faAngleLeft} className="pagination-item__icon" /> {/* Sử dụng icon từ react-fontawesome */}
                </a>
              </li>
              <li className="pagination-item pagination-item--active">
                <a href="#" className="pagination-item__link">1</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">2</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">3</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">...</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">14</a>
              </li>
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">
                  <FontAwesomeIcon icon={faAngleRight} className="pagination-item__icon" /> {/* Sử dụng icon từ react-fontawesome */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer /></>
  );
}

export default Home;
