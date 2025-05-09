import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './Reset.css';

const Reset = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset logic here
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <Header />
            <div className="profile-page">
                <ProfileSidebar />
                <div className="reset-content">
                    <div className="reset-container">
                        <h1>Đặt lại mật khẩu</h1>
                        <form onSubmit={handleSubmit} className="reset-form">
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder='Mật khẩu hiện tại'
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder='Mật khẩu mới'
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder='Xác nhận mật khẩu mới'
                                />
                            </div>
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
