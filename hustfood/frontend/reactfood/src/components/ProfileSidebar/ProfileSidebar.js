import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSidebar.css';
import { logoutUser } from '../../services/authService';

const ProfileSidebar = (nameUser) => {
    const [active, setActive] = useState('profile');
    useEffect(() => {
        setActive(window.location.pathname.split('/')[1]);
    },[]);

    const handleLogout = async () => {
        try {
            const response = await logoutUser();
            if (response === 200) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                alert('Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.');
            }
        }
        catch (error) {
            console.error('Error logging out:', error);
            alert('Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.');
        }
    }

    const navigate = useNavigate();
    return (
        <div className="block-left">
            <div className="account-left">
                <div className="account-profile">
                    <div className="profile-info">
                        <h2>
                            Xin chào, <br />
                            {/*nameUser*/}
                        </h2>
                        <p>
                            <div className="logout-link" onClick={handleLogout}>
                                Đăng xuất
                            </div>
                        </p>
                    </div>
                </div>
                <ul className="account-nav">
                    <li className={active === 'history' ? `active` : ''} onClick={() => {navigate('/history')}}>Đơn hàng đã đặt</li>
                    <li className={active === 'profile' ? `active` : ''} onClick={() => {navigate('/profile')}}>Chi tiết tài khoản</li>
                    <li className={active === 'reset-password' ? `active` : ''} onClick={() => {navigate('/reset-password')}}>Đặt lại mật khẩu</li>
                </ul>
            </div>
        </div>
    );
};

export default ProfileSidebar;
