import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import './HomeSearch.css';
import "../../styles/base.css";
import ProductList from '../../components/ProductItem/ProductList';
import productsData from "../../data/productsData";

function HomeSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tối ưu hóa hàm fetchSearchResults với useCallback
  const fetchSearchResults = useCallback(async (query) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Replace this with your actual API call
      const response = await fetch(`/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setSearchResults(data);
      
    } catch (error) {
      setError('Error fetching search results: ' + error.message);
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  

  // Effect để xử lý tìm kiếm từ URL
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      fetchSearchResults(query);
    }
    setSearchResults(productsData);
  }, [searchParams, fetchSearchResults]);

  // Effect để lắng nghe sự kiện tìm kiếm mới
  useEffect(() => {
    const handleSearchChange = (event) => {
      const { query } = event.detail;
      if (query) {
        // Cập nhật URL mà không reload trang
        setSearchParams({ q: query });
      }
    };

    window.addEventListener('searchQueryChanged', handleSearchChange);
    return () => {
      window.removeEventListener('searchQueryChanged', handleSearchChange);
    };
  }, [setSearchParams]);

  return (
    <>
      <Header />
      <div className="app__container">
        <div className="grid">
          <div className="grid__row app__content">
            <Sidebar />
            <div className="grid__column-10">
              {/* Filter Section */}
              <div className="home-filter">
                <div className="home-filter__left">
                  <span className="home-filter__label">Sắp xếp theo</span>
                  <button className="home-filter__btn btn">Phổ biến</button>
                  <button className="home-filter__btn btn btn--primary">Mới nhất</button>
                  <button className="home-filter__btn btn">Bán chạy</button>
  
                  {/* Price Filter Dropdown */}
                  <div className="select-input">
                    <span className="select-input__label">Giá</span>
                    <FontAwesomeIcon icon={faAngleDown} className="select-input__icon" />
                    <ul className="select-input__list">
                      <li className="select-input__item">
                        <div className="select-input__link">Thấp đến cao</div>
                      </li>
                      <li className="select-input__item">
                        <div className="select-input__link">Cao đến thấp</div>
                      </li>
                    </ul>
                  </div>
                </div>
  
                {/* Pagination Controls */}
                <div className="home-filter__page">
                  <span className="home-filter__page-num">
                    <span className="home-filter__page-current">1</span>
                    <span className="home-filter__page-separator">/</span>
                    <span className="home-filter__page-total">14</span>
                  </span>
                  <div className="home-filter__page-control">
                    <div 
                      className="home-filter__page-btn home-filter__page-btn--disabled"
                      disabled
                    >
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                    <div className="home-filter__page-btn">
                      <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Search Results Section */}
              <div className="home-product">
                {searchResults.length === 0 ? (
                  <div className="home-product__empty">
                    <p>Không tìm thấy sản phẩm phù hợp</p>
                  </div>
                ) : (
                  <ProductList products={searchResults} />
                )}
              </div>
  
              {/* Main Pagination */}
              <div className="pagination-container">
                <ul className="pagination home-product__pagination">
                  <li className="pagination-item">
                    <div className="pagination-item__link">
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                  </li>
                  
                  <li className="pagination-item pagination-item--active">
                    <div className="pagination-item__link">1</div>
                  </li>
                  <li className="pagination-item">
                    <div className="pagination-item__link">2</div>
                  </li>
                  <li className="pagination-item">
                    <div className="pagination-item__link">3</div>
                  </li>
                  
                  <li className="pagination-item pagination-item--dots">
                    <span className="pagination-item__link">...</span>
                  </li>
                  
                  <li className="pagination-item">
                    <div className="pagination-item__link">14</div>
                  </li>
                  
                  <li className="pagination-item">
                    <div className="pagination-item__link">
                      <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeSearch;
