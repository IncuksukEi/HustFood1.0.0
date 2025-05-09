import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './Profile.css';

const Profile = () => {
    const [formData, setFormData] = useState({
            firstName: 'Nguyễn',
            lastName: 'Văn A',
            phone: '0123456789',
            email: 'example@gmail.com',
            gender: 'male',
            birthDate: '1990-01-01'
        });
    
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            // Handle update logic here
            console.log('Form submitted:', formData);
        };
    return (
        <>
        <Header />
        <div className="pro_profile-page">
            <ProfileSidebar />
            <div className="pro_profile-content">
                <div className="pro_detail-content">
                    <div className="pro_detail-container">
                        <h1>Chi tiết tài khoản</h1>
                        <form onSubmit={handleSubmit} className="pro_detail-form">
                            <div className="pro_form-group">
                                <label>Họ tên</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pro_form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pro_form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="pro_form-row">
                                <div className="pro_form-group">
                                    <label>Giới tính</label>
                                    <select 
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </div>
                                <div className="pro_form-group">
                                    <label>Ngày sinh</label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="pro_update-button">
                                Cập nhật tài khoản
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>    
    );
}
export default Profile;