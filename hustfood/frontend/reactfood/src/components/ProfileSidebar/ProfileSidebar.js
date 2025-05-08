import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileSidebar.css';
import logo from '../../assets/images/img/logo.png';

const ProfileSidebar = () => {
    const [active, setActive] = useState('profile');
    useEffect(() => {
        setActive(window.location.pathname.split('/')[1]);
    },[]);

    const navigate = useNavigate();
    return (
        <div className="block-left">
            <div className="account-left">
                <div className="account-profile">
                    <div className="profile-info">
                        <h2>
                            Xin chào, <br />
                            Nguyễn!
                        </h2>
                        <p>
                            <a href="javascript:void(0);" className="logout-link">
                                Đăng xuất
                            </a>
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
