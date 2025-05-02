import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import '../../styles/base.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faBell,
  faCircleQuestion,
  faMagnifyingGlass,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import noCartImage from '../../assets/images/img/no_cart.png'; // Adjust the path as needed
import logo from '../../assets/images/img/logo.png';
import avt from '../../assets/images/img/avt.jpg';
import {
  logoutUser,
  performSearch,
  removeCartItem,
  getSocialMediaLinks,
  fetchLatestProducts,
} from '../../services/headerService';
import AuthModal from '../AuthModal/AuthModal';

const Header = () => {
  const location = useLocation();
  // State for dropdowns
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Refs for click-outside detection
  const notifyRef = useRef(null);
  const userMenuRef = useRef(null);
  const cartRef = useRef(null);

  // Fetch notifications and cart items on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const cartData = await fetchLatestProducts();
        setNotifications(cartData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        setIsNotifyOpen(false);
      }
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
  /////////////////////////////////

  const navigate = useNavigate();

  // chuyển đổi giữa người mua và người bán
  const handleSwitchToSeller = () => {
    navigate('/management');
  };

  // đi đến các trang mạng xã hội
  const handleSocialClick = (platform) => {
    const socialMediaLinks = getSocialMediaLinks(); // Lấy các liên kết mạng xã hội từ headerService.js
    const url = socialMediaLinks[platform]; // Lấy URL tương ứng với nền tảng (Facebook hoặc Instagram)
  
    if (url) {
      window.open(url, '_blank'); // Mở liên kết trong một tab mới
    } else {
      console.error(`No URL found for platform: ${platform}`);
    }
  };

  // xử lý khi nhấp vào thông báo
  const handleNotifyClick = async (itemId) => {
    try {
      if (itemId === 'all') {
        navigate('/notifications'); // Chuyển hướng đến trang thông báo
        // đánh dấu tất cả thông báo là đã xem
        setNotifications((prev) =>
          prev.map((item) => ({ ...item, viewed: true })) // Cập nhật trạng thái thông báo
        );
      } else {
        navigate(`/product/${itemId}`);
        setNotifications((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, viewed: true } : item
          )
        );
      }
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  // xử lý khi nhấp vào trợ giúp
  const handleHelpClick = () => {
    navigate('/help'); // Chuyển hướng đến trang trợ giúp
  };

  // xử lý khi nhấp vào đăng ký
  const handleRegisterClick = () => {
    setShowAuthModal(true);
  };

  // xử lý khi nhấp vào đăng nhập
  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  // xử lý khi nhấp vào tài khoản người dùng
  const handleUserMenuClick = async (action) => {
    try {
      if (action === 'profile') {
        navigate('/profile'); // Chuyển hướng đến trang hồ sơ người dùng
      } else if (action === 'orders') {
        navigate('/cart'); // Chuyển hướng đến trang đơn hàng
      } else if (action === 'logout') {
        await logoutUser();
      }
    } catch (error) {
      console.error('Error handling user menu action:', error);
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

  // xử lý khi nhấp vào sản phẩm trong giỏ hàng
  const handleCartItemRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  // xử lý khi nhấp vào giỏ hàng
  const handleViewCart = () => {
    navigate('/cart'); // Chuyển hướng đến trang giỏ hàng
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
                    <FontAwesomeIcon icon={faCheck} />
                  </li>
                  <li className="header__navbar-option-item" onClick={handleSwitchToSeller}>
                      <span>Kênh người bán</span>
                      <FontAwesomeIcon icon={faCheck} />
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
              <li
                className="header__navbar-item header__navbar-item--has-notify"
                ref={notifyRef}
                onClick={() => setIsNotifyOpen(!isNotifyOpen)}
                role="button"
                aria-expanded={isNotifyOpen}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsNotifyOpen(!isNotifyOpen)}
              >
                <div className="header__navbar-item-link">
                  <FontAwesomeIcon icon={faBell} className="header__navbar-icon" />
                  THÔNG BÁO
                </div>
                {isNotifyOpen && (
                  <div className="header__notify">
                    <header className="header__notify-header">
                      <h3>Thông báo mới nhận</h3>
                    </header>
                    <ul className="header__notify-list">
                      {notifications.map((item) => (
                        <li
                          key={item.id}
                          className={`header__notify-item ${item.viewed ? 'header__notify-item--viewed' : ''}`}
                        >
                          <button className="header__notify-link" onClick={() => handleNotifyClick(item.id)}>
                            <img src={item.img} alt="" className="header__notify-img" />
                            <div className="header__notify-info">
                              <span className="header__notify-name">{item.name}</span>
                              <span className="header__notify-descriotion">{item.description}</span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <footer className="header__notify-footer">
                      <div className="header__notify-footer-btn" onClick={() => handleNotifyClick('all')}>
                        Xem tất cả
                      </div>
                    </footer>
                  </div>
                )}
              </li>
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
                        <li className="header__navbar-user-item">
                          <div onClick={() => handleUserMenuClick('orders')}>Đơn mua</div>
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
                    HUST FOOD
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
                <div className="header__search-history">
                  <h3 className="header__search-history-heading">Lịch sử tìm kiếm</h3>
                  <ul className="header__search-history-list">
                    <li className="header__search-history-item">
                      <div onClick={() => handleSearch('Project ăn liền')}>Project ăn liền</div>
                    </li>
                    <li className="header__search-history-item">
                      <div onClick={() => handleSearch('Project free')}>Project free</div>
                    </li>
                  </ul>
                </div>
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
                        <li key={item.id} className="header__cart-item">
                          <img
                            src="https://down-vn.img.susercontent.com/file/92ed62261c9121f7808e0b1915cf7c99.webp"
                            alt=""
                            className="header__cart-img"
                          />
                          <div className="header__cart-item-info">
                            <div className="header__cart-item-head">
                              <h5 className="header__cart-item-name">{item.name}</h5>
                              <span className="header__cart-item-price-wrap">
                                <span className="header__cart-item-price">{item.price}</span>
                                <span className="header__cart-item-multiply">x</span>
                                <span className="header__cart-item-qnt">{item.quantity}</span>
                              </span>
                            </div>
                            <div className="header__cart-item-body">
                              <div className="header__cart-item-description">Phân loại: {item.category}</div>
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
      />
    </>
  );
};

export default Header;