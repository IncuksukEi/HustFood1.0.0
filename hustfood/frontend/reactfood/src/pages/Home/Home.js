import React from 'react';
import Header from '../../components/Header/Header'; 
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
          <div className="grid__column-2">
            <nav className="category">
              <h3 className="category__heading">
                <i className="category__heading-icon fa-solid fa-list"></i>
                Danh mục
              </h3>
              <ul className="category-list">
                <li className="category-item category-item--active">
                  <a href="#" className="category-item__link">Bim Bim</a>
                </li>
                <li className="category-item">
                  <a href="#" className="category-item__link">Nước ngọt</a>
                </li>
                <li className="category-item">
                  <a href="#" className="category-item__link">Bánh kẹo</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="grid__column-10">
            <div className="home-filter">
              <span className="home-filter__label">Sắp xếp theo</span>
              <button className="home-filter__btn btn">Phổ biến</button>
              <button className="home-filter__btn btn btn--primary">Mới nhất</button>
              {/* cái nào khi ấn chọn thì thêm btn--primary */}
              <button className="home-filter__btn btn">Bán chạy</button>
              <div className="select-input">
                <span className="select-input__label">Giá</span>
                <i className="select-input__icon fa-solid fa-angle-down"></i>
                {/* List options */}
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
                  <div className="home-filter__page-control">
                    <a href="#" className="home-filter__page-btn home-filter__page-btn--disabled">
                      <i className="home-filter__page-icon fa-solid fa-angle-left"></i>
                    </a>
                    <a href="#" className="home-filter__page-btn">
                      <i className="home-filter__page-icon fa-solid fa-angle-right"></i>
                    </a>
                  </div>
                </span>
              </div>
            </div>
            <div className="home-product">
              <ProductList />
          /*code ở đây thiếu*/
            </div>
            <ul className="pagination home-product__pagination">
              <li className="pagination-item">
                <a href="#" className="pagination-item__link">
                  <i className="pagination-item__icon fa-solid fa-angle-left"></i>
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
                  <i className="pagination-item__icon fa-solid fa-angle-right"></i>
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