import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './Profile.css';
import { getUser } from '../../services/userService';
import { updateUser } from '../../services/userService';

const Profile = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        email: '',
        date: '',
    });
    let nameUser = formData.full_name;

    useEffect(() => {
        const fetchUserData = async () => {
            let token = localStorage.getItem('token');
            try {
                const user = await getUser(token);
                setFormData({
                    full_nameame: user.full_nameame,
                    phone: user.phone,
                    email: user.email,
                    gender: user.gender,
                    date: user.date
                });
                nameUser = user.full_name;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);
    
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            let token = localStorage.getItem('token');
            const updatedData = {
                full_nameame: formData.full_name,
                phone: formData.phone,
                gender: formData.gender,
                date: formData.date
            };
            try {
                const response = await updateUser(token, updatedData);
                if (response === 200) {
                    alert('Cập nhật tài khoản thành công');
                } else {
                    alert('Đã xảy ra lỗi khi cập nhật tài khoản. Vui lòng thử lại sau.');
                }
            } catch (error) {
                alert('Đã xảy ra lỗi khi cập nhật tài khoản. Vui lòng thử lại sau.');
            }
        }

    return (
        <>
        <Header />
        <div className="pro_profile-page">
            <ProfileSidebar nameUser={nameUser}/>
            <div className="pro_profile-content">
                <div className="pro_detail-content">
                    <div className="pro_detail-container">
                        <h1>Chi tiết tài khoản</h1>
                        <form onSubmit={handleSubmit} className="pro_detail-form">
                            <div className="pro_form-group">
                                <label>Họ tên</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
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
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="pro_update-button" onClick={handleSubmit}>
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