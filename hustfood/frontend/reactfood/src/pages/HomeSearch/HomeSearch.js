import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const queryToBack = searchParams.get('q') || '';

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
              
              {/* Search Results Section */}
              <div className="home-product">
                {searchResults.length === 0 ? (
                  <div className="home-product__empty">
                    <p>Không tìm thấy sản phẩm phù hợp</p>
                  </div>
                ) : (
                  <ProductList products={searchResults} queryToBack={queryToBack}/>
                )}
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
