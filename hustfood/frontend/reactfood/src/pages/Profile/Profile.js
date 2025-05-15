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
        address: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        const fetchUserData = async () => {
            let token = localStorage.getItem('token');
            try {
                const user = await getUser(token);
                if (user && user.data) {
                    setFormData({
                    full_name: user.data.fullName,
                    phone: user.data.phone,
                    email: user.data.email,
                    gender: user.data.gender,
                    date: user.data.birthDate,
                    address: user.data.address,
                    });
                    console.log(user.data);
                }
                localStorage.setItem('nameUser', user.data.fullName);
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
            setError(null);
            if (!formData.full_name || !formData.phone) {
                setError({
                    response: {
                        data: {
                            message: 'Xin vui lòng điền đầy đủ các trường thông tin!'
                        }
                    }
                });
                return;
            }

            // Kiểm tra định dạng date
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (formData.date && !dateRegex.test(formData.date)) {
                setError({
                    response: {
                        data: {
                            message: 'Ngày sinh phải có định dạng YYYY-MM-DD!'
                        }
                    }
                });
                return;
            }

            let token = localStorage.getItem('token');
            const updatedData = {
                fullName: formData.full_name,
                phone: formData.phone,
                gender: formData.gender,
                birthDate: formData.date,
                address: formData.address,
            };
            try {
                const response = await updateUser(token, updatedData);
                window.location.reload();
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
        }

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
                            <div className="pro_form-group">
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
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
                                        <option value="MALE">Nam</option>
                                        <option value="FEMALE">Nữ</option>
                                        <option value="OTHER">Khác</option>
                                    </select>
                                </div>
                                <div className="pro_form-group">
                                    <label>Ngày sinh</label>
                                    <input
                                        type="text"
                                        placeholder="YYYY-MM-DD"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            {error && (
                                <div className="pro_error-message">
                                    <p>{error.response.data.message}</p>
                                </div>
                            )}
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