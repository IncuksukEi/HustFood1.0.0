import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [isLoginMode, setIsLoginMode] = useState(initialMode === 'login');

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal__overlay" onClick={onClose}></div>
            <div className="modal__body">
                <div className="auth-form">
                    <div className="auth-form__container">
                        <h3 className="auth-form__heading">
                            {isLoginMode ? 'LOGIN' : 'SIGN UP'}
                        </h3>
                        
                        {!isLoginMode && (
                            <>
                                <div className="auth-form__group">
                                    <input type="text" className="auth-form__input" placeholder="Họ của bạn *" />
                                </div>
                                <div className="auth-form__group">
                                    <input type="text" className="auth-form__input" placeholder="Tên của bạn *" />
                                </div>
                                <div className="auth-form__group">
                                    <input type="tel" className="auth-form__input" placeholder="Số điện thoại *" />
                                </div>
                            </>
                        )}

                        <div className="auth-form__group">
                            <input type="email" className="auth-form__input" placeholder="Địa chỉ email của bạn *" />
                        </div>
                        <div className="auth-form__group">
                            <input type="password" className="auth-form__input" placeholder="Mật khẩu *" />
                        </div>

                        {!isLoginMode && (
                            <div className="auth-form__policy">
                                <input type="checkbox" id="policy" />
                                <label htmlFor="policy">
                                    Tôi đã đọc và đồng ý với các Chính sách Hoạt động và Chính sách Bảo mật Thông tin của HustFood.
                                </label>
                            </div>
                        )}

                        <button className="auth-form__submit">
                            {isLoginMode ? 'Đăng nhập' : 'Tạo tài khoản'}
                        </button>

                        <p className="auth-form__separator">Hoặc tiếp tục với</p>
                        
                        
                        <button className="social-button facebook">
                            <i className="fab fa-facebook-f"></i>
                            Đăng nhập bằng Facebook
                        </button>
                        <button className="social-button google">
                            <i className="fab fa-google"></i>
                            Đăng nhập bằng Google
                        </button>
                        <div className="auth-form__switch">
                            {isLoginMode ? (
                                <>
                                    <span>Bạn chưa có tài khoản? </span>
                                    <button onClick={() => setIsLoginMode(false)}>Đăng ký</button>
                                </>
                            ) : (
                                <>
                                    <span>Bạn đã có tài khoản? </span>
                                    <button onClick={() => setIsLoginMode(true)}>Đăng nhập</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
