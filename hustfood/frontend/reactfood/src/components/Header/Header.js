import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
import '../../styles/base.css';
import noCartImage from '../../assets/images/img/no_cart.png'; // Adjust the path as needed
import logo from '../../assets/images/img/logo.png';
import avt from '../../assets/images/img/avt.jpg';
import { getSocialMediaLinks } from '../../services/mediaService';
import { logoutUser } from '../../services/authService';
import { removeCartItem } from '../../services/cartService';
import { getCartItems } from '../../services/cartService'; // Assuming you have a function to fetch cart items
import AuthModal from '../AuthModal/AuthModal';
import {
  faCircleQuestion,
  faMagnifyingGlass,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import productsData from '../../data/productsData';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const userMenuRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems(); // Assuming you have a function to fetch cart items
        setCartItems(items);
      } catch (error) {
        setError(error.message);
      }
    };
    /*fetchCartItems();*/
    setCartItems(productsData); // Set initial cart items for demonstration
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // chuyển đổi giữa người mua và người bán
  const handleSwitchToSeller = () => {
    navigate('/management');
  };

  // đi đến các trang mạng xã hội
  const handleSocialClick = (platform) => {
    const socialMediaLinks = getSocialMediaLinks();
    const url = socialMediaLinks[platform]; 
  
    if (url) {
      window.open(url, '_blank');
    } else {
      setError(error.message);
    }
  };

  // xử lý khi nhấp vào trợ giúp
  const handleHelpClick = () => {
    navigate('/help');
  };

  // xử lý khi nhấp vào đăng ký
  const handleRegisterClick = () => {
    setMode('signup');
    setShowAuthModal(true);
  };

  // xử lý khi nhấp vào đăng nhập
  const handleLoginClick = () => {
    setMode('login');
    setShowAuthModal(true);
  };

  // xử lý khi nhấp vào tài khoản người dùng
  const handleUserMenuClick = async (action) => {
    try {
      if (action === 'profile') {
        navigate('/profile');
      } else if (action === 'logout') {
        const status = await logoutUser();
        setIsAuthenticated(status);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // xử lý tìm kiếm
  const handleSearch = (query) => {
    if (!query.trim()) return;

    const isSearchPage = location.pathname === '/search';
    
    if (isSearchPage) {
      // Nếu đang ở trang search, cập nhật URL và để HomeSearch xử lý
      const newUrl = `/search?q=${encodeURIComponent(query.trim())}`;
      window.history.pushState(null, '', newUrl);
      
      // Trigger một custom event để HomeSearch biết cần refresh
      window.dispatchEvent(new CustomEvent('searchQueryChanged', {
        detail: { query: query.trim() }
      }));
    } else {
      // Nếu đang ở trang khác, navigate bình thường
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // xử lý khi xoá sản phẩm trong giỏ hàng
  const handleCartItemRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      setError(error.message);
    }
  };

  // xử lý khi nhấp vào giỏ hàng
  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <header className="header">
        <div className="grid">
          <nav className="header__navbar">
            <ul className="header__navbar-list">
              <li className="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate">
                VÀO CÁC KÊNH TRONG CỬA HÀNG
                <ul className="header__navbar-option">
                  <li className="header__navbar-option-item header__navbar-option-item--active">
                    <span>Kênh người mua</span>
                  </li>
                  <li className="header__navbar-option-item" onClick={handleSwitchToSeller}>
                    <span>Kênh người bán</span>
                  </li>
                </ul>
              </li>
              <li className="header__navbar-item">
                <span className="header__navbar-title--nopointer">KẾT NỐI</span>
                <div className="header__nav-icon-link" onClick={() => handleSocialClick('facebook')}>
                  <FontAwesomeIcon icon={faFacebook} className="header__navbar-icon" />
                </div>
                <div className="header__nav-icon-link" onClick={() => handleSocialClick('instagram')}>
                  <FontAwesomeIcon icon={faInstagram} className="header__navbar-icon" />
                </div>
              </li>
            </ul>
            <ul className="header__navbar-list">
              <li className="header__navbar-item">
                <div className="header__navbar-item-link" onClick={handleHelpClick}>
                  <FontAwesomeIcon icon={faCircleQuestion} className="header__navbar-icon" />
                  TRỢ GIÚP
                </div>
              </li>
              {!isAuthenticated ? (
                <div className="home__check">
                  <li className="header__navbar-item header__navbar-item--strong header__navbar-item--separate">
                    <div onClick={handleRegisterClick}>Đăng ký</div>
                  </li>
                  <li className="header__navbar-item header__navbar-item--strong">
                    <div onClick={handleLoginClick}>Đăng nhập</div>
                  </li>
                </div>
              ) : (
                <div className="user__check" ref={userMenuRef}>
                  <li
                    className="header__navbar-item header__navbar-user"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    role="button"
                    aria-expanded={isUserMenuOpen}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <img
                      src={avt}
                      alt=""
                      className="header__navbar-user-img"
                    />
                    <span className="header__navbar-user-name">Người dùng</span>
                    {isUserMenuOpen && (
                      <ul className="header__navbar-user-menu">
                        <li className="header__navbar-user-item">
                          <div onClick={() => handleUserMenuClick('profile')}>Tài khoản của tôi</div>
                        </li>
                        <li className="header__navbar-user-item header__navbar-user-item--separate">
                          <div onClick={() => handleUserMenuClick('logout')}>Đăng xuất</div>
                        </li>
                      </ul>
                    )}
                  </li>
                </div>
              )}
            </ul>
          </nav>



          <div className="header-with-search">
            <div className="header__logo">
              <div className="header__logo-img">
                <span>
                  <a href="/" className="header__logo-link">
                    <img src={logo} alt="Hust's Food" id="fastfood" />
                    <span className="header__logo-text">HUST FOOD</span>
                  </a>
                </span>
              </div>
            </div>
            <div className="header__search">
              <div className="header__search-input-wrap">
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="Nhập để tìm kiếm sản phẩm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e)=> {
                    if (e.key === 'Enter') {
                      handleSearch(e.target.value);
                    }
                  }}
                />
              </div>
              <button className="header__search-btn" onClick={() => handleSearch(searchQuery)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="header__search-btn-icon" />
              </button>
            </div>
            <div className="header__cart" ref={cartRef}>
              <div className="header__cart-wrap">
                <div
                  className="header__cart-icon"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </div>
                <div className="header__cart-notice" onClick={() => setIsCartOpen(!isCartOpen)}>
                  {cartItems.length}
                </div>
                {isCartOpen && (
                  <div className="header__cart-list">
                    <img src={noCartImage} alt="" className="header__cart-no-cart-img" />
                    <span className="header__cart-list-no-cart-msg">Chưa có sản phẩm</span>
                    <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                    <ul className="header__cart-list-item">
                      {cartItems.map((item) => (
                        <li key={item.product_id} className="header__cart-item">
                          <img
                            src={item.url_img}
                            alt=""
                            className="header__cart-img"
                          />
                          <div className="header__cart-item-info">
                            <div className="header__cart-item-head">
                              <h5 className="header__cart-item-name">{item.name}</h5>
                              <span className="header__cart-item-price-wrap">
                                <span className="header__cart-item-price">{item.price}</span>
                                <span className="header__cart-item-multiply"> x </span>
                                <span className="header__cart-item-qnt">{item.quantity}</span>
                              </span>
                            </div>
                            <div className="header__cart-item-body">
                              <button
                                className="header__cart-item-remove"
                                onClick={() => handleCartItemRemove(item.id)}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button className="header__cart-view-cart btn btn--primary" onClick={handleViewCart}>
                      Xem giỏ hàng
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        modeInit={mode}
        onChangeMode={(newMode) => setMode(newMode)}
      />
    </>
  );
};

export default Header;