import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';
import '../../styles/base.css';
import noCartImage from '../../assets/images/img/no_cart.png'; // Adjust the path as needed
import logo from '../../assets/images/img/logo.png';
import avt from '../../assets/images/img/avt.jpg';
import { getSocialMediaLinks } from '../../services/mediaService';
import { removeCartItem } from '../../services/cartService';
import { getAllCartItems } from '../../services/cartService'; 
import { updateAllCartItem } from '../../services/cartService';
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


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [needUpdate, setNeedUpdate] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      setError(null);
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const items = await getAllCartItems(token);
        if (items.status === 200) {
          setCartItems(items.data);
        }
      } catch (error) {
          const errorData = error.response?.data;
            setError({
                response: {
                    data: {
                        message: errorData?.message || 'Có lỗi xảy ra, vui lòng thử lại'
                    }
                }
            });
      }
    };
    const token = localStorage.getItem('token');
    token ? fetchCartItems() : setCartItems([]);
  }, [isAuthenticated, isCartOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {

    const updateCart = async () => {
        console.log('Updating cart...');
        await handleUpdateAllCartItems();
        setNeedUpdate(false);
    };
    updateCart();
  }, [needUpdate, cartItems]);

  // chuyển đổi giữa người mua và người bán
  const handleSwitchToSeller = () => {
    navigate('/management');
  };

  // đi đến các trang mạng xã hội
  const handleSocialClick = (platform) => {
    const socialMediaLinks = getSocialMediaLinks();
    const url = socialMediaLinks[platform]; 
      window.open(url, '_blank');
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
  const handleUserMenuClick = async () => {
        navigate('/profile');
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
    setError(null);
    try {
      const token = localStorage.getItem('token');
      await removeCartItem(token, itemId);
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      setError(error);
    }
  };

  // Add new handler for quantity updates
  const handleUpdateQuantity = (itemId, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.productId === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
    setNeedUpdate(true);
  };

  // update all cart items
  const handleUpdateAllCartItems = async () => {
    setError(null);
    try {
      if (!cartItems.length) return;
      const data = cartItems.map((item) => ({product_id: item.productId, quantity: item.quantity}));
      const token = localStorage.getItem('token');
      await updateAllCartItem(token, data);

    } catch (error) {
        const errorData = error.response?.data;
        setError({
            response: {
                data: {
                    message: errorData?.message || 'Có lỗi xảy ra, vui lòng thử lại'
                }
            }
        });
        throw error;
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
                <div className="user__check">
                  <li
                    className="header__navbar-item header__navbar-user"
                    onClick={() => handleUserMenuClick()}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={avt}
                      alt=""
                      className="header__navbar-user-img"
                    />
                    <span className="header__navbar-user-name">NGƯỜI DÙNG</span>
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
                  onClick={() => {
                    setIsCartOpen(!isCartOpen);
                  }}
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
                        <li className="header__cart-item">
                          <img
                            src={item.urlImg}
                            alt=""
                            className="header__cart-img"
                          />
                          <div className="header__cart-item-info">
                            <div className="header__cart-item-head">
                              <h5 className="header__cart-item-name">{item.name}</h5>
                              <div className="header__cart-item-quantity">
                                <button 
                                  className="header__cart-item-quantity-btn"
                                  onClick={() => handleUpdateQuantity(item.productId, -1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="header__cart-item-qnt">{item.quantity}</span>
                                <button 
                                  className="header__cart-item-quantity-btn"
                                  onClick={() => {
                                    console.log('Button clicked'); // Thêm log để kiểm tra
                                    handleUpdateQuantity(item.productId, 1);
                                  }}
                                >
                                  +
                                </button>
                              </div>
                              <span className="header__cart-item-price">{item.price}</span>
                            </div>
                            <div className="header__cart-item-body">
                              <button
                                className="header__cart-item-remove"
                                onClick={() => handleCartItemRemove(item.productId)}
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
        {error && (
          <div className="error-message">
            <p>{error.response.data.message}</p>
          </div>
        )}
      </header>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        modeInit={mode}
        onChangeMode={(newMode) => setMode(newMode)}
        onLoginSuccess={() => {
          setIsAuthenticated(true);
        }}
      />
    </>
  );
};

export default Header;