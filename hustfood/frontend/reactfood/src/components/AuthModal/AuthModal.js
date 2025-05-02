import React, { useState } from 'react';
import './AuthModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__body">
        <div className="auth-form">
          <div className="auth-form__container">
            <div className="auth-form__header">
              <h3 className="auth-form__heading">
                {isLoginForm ? 'Đăng nhập' : 'Đăng ký'}
              </h3>
              <span 
                className="auth-form__switch-btn"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? 'Đăng ký' : 'Đăng nhập'}
              </span>
            </div>

            <div className="auth-form__form">
              <div className="auth-form__group">
                <input 
                  type="text" 
                  className="auth-form__input" 
                  placeholder="Email/Số điện thoại/Tên đăng nhập"
                />
              </div>
              <div className="auth-form__group">
                <input 
                  type="password" 
                  className="auth-form__input" 
                  placeholder="Mật khẩu"
                />
              </div>
              {!isLoginForm && (
                <div className="auth-form__group">
                  <input 
                    type="password" 
                    className="auth-form__input" 
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
              )}
            </div>

            {isLoginForm ? (
              <div className="auth-form__aside">
                <div className="auth-form__help">
                  <a href="#" className="auth-form__help-link auth-form__help-forgot">
                    Quên mật khẩu
                  </a>
                  <span className="auth-form__help-separate"></span>
                  <a href="#" className="auth-form__help-link">
                    Cần trợ giúp?
                  </a>
                </div>
              </div>
            ) : (
              <div className="auth-form__aside">
                <p className="auth-form__policy-text">
                  Bằng việc đăng ký, bạn đã đồng ý với chúng tôi về
                  <a href="#" className="auth-form__text-link"> Điều khoản dịch vụ </a>&
                  <a href="#" className="auth-form__text-link"> Chính sách bảo mật</a>
                </p>
              </div>
            )}

            <div className="auth-form__controls">
              <button className="btn auth-form__controls-back" onClick={onClose}>
                TRỞ LẠI
              </button>
              <button className="btn btn--primary">
                {isLoginForm ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
              </button>
            </div>
          </div>

          <div className="auth-form__socials">
            <a href="#" className="btn btn--size-s btn--with-icon auth-form__socials--facebook">
              <FontAwesomeIcon icon={faFacebook} className="auth-form__socials-icon"/>
              <span className="auth-form__socials-title">
                Kết nối với Facebook
              </span>
            </a>
            <a href="#" className="btn btn--size-s btn--with-icon auth-form__socials--google">
              <FontAwesomeIcon icon={faGoogle} className="auth-form__socials-icon"/>
              <span className="auth-form__socials-title">
                Kết nối với Google
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
