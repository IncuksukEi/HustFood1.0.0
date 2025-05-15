import React, { useState, useEffect, useRef } from 'react';
import './AuthModal.css';
import { loginUser } from '../../services/authService';
import { registerUser } from '../../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AuthModal = ({ isOpen, onClose, modeInit, onChangeMode, onLoginSuccess }) => { 
    const [modeA, setModeA] = useState(modeInit);
    const [isChecked, setIsChecked] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [error, setError] = useState(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {setModeA(modeInit)}, [modeInit]);
    useEffect(() => {setIsChecked(false)}, [isOpen]);
    useEffect(() => {setIsFirstTime(true)}, [isOpen]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        const email = emailRef.current.value;
        const password = passwordRef.current.value; 
        if (!email || !password) {
            setError({
                response: {
                    data: {
                        message: 'Xin vui lòng điền đầy đủ các trường thông tin!'
                    }
            }});
            return;
        } else {
            setError(null);
        }
        try {
            const response = await loginUser(email, password);
            if (response.status === 200) {
                onLoginSuccess();
                onClose();
                window.location.reload();
            }
        } catch (error) {
            setError(error);
            if (error.response.status === 401) {
                setError({
                    response: {
                        data: {
                            message: 'Email hoặc mật khẩu không đúng!'
                        }
                    }
                });
                return;
            }
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const fullName = nameRef.current.value;
        const phone = phoneRef.current.value;
        if (!email || !password || !fullName || !phone) {
            setError({
                response: {
                    data: {
                        message: 'Xin vui lòng điền đầy đủ các trường thông tin!'
                    }
            }});
            return;
        }
        if (!isChecked) {
            setIsChecked(false);
            setIsFirstTime(false);
            return;
        }
        try {
            const response = await registerUser(fullName, phone, email, password);
            if (response.status === 201) {
                onClose();
            }
        } catch (error) {
            setError(error);
            if (error.response.status === 409) {
                setError({
                    response: {
                        data: {
                            message: 'Email đã tồn tại!'
                        }
                    }
                });
                return;
            } else if (error.response.status === 422) {
                setError({
                    response: {
                        data: {
                            message: 'Số điện thoại đã tồn tại!'
                        }
                    }
                });
                return;
            }
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal__overlay" onClick={onClose}></div>
            <div className="modal__body">
                <div className="auth-form">
                    <div className="auth-form__container">
                        <h3 className="auth-form__heading">
                            {modeA === 'login' ? 'LOGIN' : 'SIGN UP'}
                        </h3>
                        
                        {modeA === 'signup' && (
                            <>
                                <div className="auth-form__group">
                                    <input type="text" className="auth-form__input" placeholder="Họ tên của bạn *" ref={nameRef}/>
                                </div>
                                <div className="auth-form__group">
                                    <input type="tel" className="auth-form__input" placeholder="Số điện thoại *" ref={phoneRef}/>
                                </div>
                            </>
                        )}

                        <div className="auth-form__group">
                            <input type="email" className="auth-form__input" placeholder="Địa chỉ email của bạn *" ref={emailRef}/>
                        </div>
                        <div className="auth-form__group password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="auth-form__input"
                                placeholder="Mật khẩu *"
                                ref={passwordRef}
                            />
                            <button
                                type="button"
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>

                        {modeA === 'signup' && (
                            <div className="auth-form__policy">
                                <input type="checkbox" id="policy" onClick={() => {setIsChecked(!isChecked); setIsFirstTime(false)}}/>
                                <label htmlFor="policy">
                                    Tôi đã đọc và đồng ý với các Chính sách Hoạt động và Chính sách Bảo mật Thông tin của HustFood.
                                </label>
                            </div>
                        )}
                        {modeA === 'signup' && !isChecked && !isFirstTime && (
                            <div className="auth-form__policy-checked">
                                <i className="fas fa-check"></i>
                                <span>Hãy tích chọn đồng ý với các chính sách của chúng tôi</span>
                            </div>
                        )}
                        {error && (
                            <div className="auth-form__error">
                                <i className="fas fa-exclamation-circle"></i>
                                <span>{error.response.data.message}</span>
                            </div>
                        )}
                        <button className="auth-form__submit" onClick={modeA === 'login' ? handleLogin : handleRegister}>
                            {modeA === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
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
                            {modeA === 'login' ? (
                                <>
                                    <span>Bạn chưa có tài khoản? </span>
                                    <button onClick={() => {setError(null); onChangeMode('signup')}}>Đăng ký</button>
                                </>
                            ) : (
                                <>
                                    <span>Bạn đã có tài khoản? </span>
                                    <button onClick={() => {setError(null); onChangeMode('login')}}>Đăng nhập</button>
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
