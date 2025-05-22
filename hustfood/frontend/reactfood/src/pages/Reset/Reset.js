import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './Reset.css';
import { updateUserPassword } from '../../services/userService';

const Reset = () => {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [showPasswords, setShowPasswords] = useState({
        password: false,
        newPassword: false,
        confirmPassword: false
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (formData.newPassword !== formData.confirmPassword) {
            setError({response:{
                data: { message: 'Mật khẩu mới không khớp. Vui lòng thử lại.' }
            }});
            return;
        }
        try {
            let token = localStorage.getItem('token');
            const { password, newPassword } = formData;
            const response = await updateUserPassword(token, password, newPassword);
            if (response.status === 200) {
                alert('Đặt lại mật khẩu thành công');
                setFormData({
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <Header />
            <div className="reset-page">
                <ProfileSidebar />
                <div className="reset-content">
                    <div className="reset-container">
                        <h1>Đặt lại mật khẩu</h1>
                        <form onSubmit={handleSubmit} className="reset-form">
                            <div className="form-group">
                                <input
                                    type={showPasswords.password ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder='Mật khẩu hiện tại'
                                />
                                <button
                                    type="button"
                                    className="password-toggle-icon"
                                    onClick={() => togglePasswordVisibility('password')}
                                >
                                    <div className="reset-icon-fa"><FontAwesomeIcon icon={showPasswords.password ? faEyeSlash : faEye} /></div>
                                </button>
                            </div>
                            <div className="form-group">
                                <input
                                    type={showPasswords.newPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder='Mật khẩu mới'
                                />
                                <button
                                    type="button"
                                    className="password-toggle-icon"
                                    onClick={() => togglePasswordVisibility('newPassword')}
                                >
                                    <div className="reset-icon-fa"><FontAwesomeIcon icon={showPasswords.newPassword ? faEyeSlash : faEye} /></div>
                                </button>
                            </div>
                            <div className="form-group">
                                <input
                                    type={showPasswords.confirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder='Xác nhận mật khẩu mới'
                                />
                                <button
                                    type="button"
                                    className="password-toggle-icon"
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                >
                                    <div className="reset-icon-fa"><FontAwesomeIcon icon={showPasswords.confirmPassword ? faEyeSlash : faEye} /></div>
                                </button>
                            </div>
                            {error && (
                                <div className="error-message">
                                    <p>{error.response.data.message}</p>
                                </div>
                            )}
                            <button type="submit" className="reset-button">
                                Đặt lại mật khẩu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Reset;
