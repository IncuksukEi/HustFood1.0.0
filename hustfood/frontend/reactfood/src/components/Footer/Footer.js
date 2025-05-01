import React from 'react';
import "./Footer.css";
import "../../styles/base.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
//import googlePlay from './assets/img/google_play.png'; // Adjust path as needed
//import appStore from './assets/img/app_store.png'; // Adjust path as needed
//import './assets/css/main.css';
import { getSocialMediaLinks } from '../../services/headerService';
import { useNavigate }  from 'react-router-dom';



const Footer = () => {
  const navigate = useNavigate();
  // Fetch social media links (if needed)
  const handleSocialClick = (platform) => {
    const links = getSocialMediaLinks();
    if (platform === 'facebook') {
      window.open(links.facebook, '_blank');
    } else if (platform === 'instagram') {
      window.open(links.instagram, '_blank');
    }
  }
  // Placeholder handlers (to be implemented by you)
  const handleLinkClick = (category, item) => {
    if (category === 'Chăm sóc khách hàng') {
      // Handle social media link clicks (Facebook, Instagram, Youtube)
      if (item === 'Trung tâm trợ giúp') {
        navigate('/help');
      }
      else if (item === "Hust'food mail") {
        navigate('/mail');
      }
      else{
        navigate('/guide');
      }
    }
    else if (category === 'Giới thiệu') {
      // Handle introduction link clicks (About, Careers, Terms)
      if (item === 'Giới thiệu') {
        navigate('/about');
      }
      else if (item === 'Tuyển dụng') {
        navigate('/careers');
      }
      else{
        navigate('/terms');
      }
    } 
    else if (category === 'Danh mục') {
      // Handle category link clicks (Snacks, Drinks, Sweets)
      if (item === 'Bim Bim') {
        navigate('/snacks');
      }
      else if (item === 'Nước ngọt') {
        navigate('/drinks');
      }
      else{
        navigate('/sweets');
      }
    } 
    else if (category === 'Theo dõi') {
      handleSocialClick(item.toLowerCase());
    } 
    else if (category === 'VÀO CỬA HÀNG TRÊN ỨNG DỤNG') {
      // Handle app download link clicks
      handleAppDownload(item);
    }
  };

  const handleAppDownload = (platform) => {
    // Handle app download link clicks (Google Play, App Store)
    console.log(`Downloading app for ${platform}`);
  };

  // Data for footer sections
  const footerSections = [
    {
      heading: 'Chăm sóc khách hàng',
      items: [
        { name: 'Trung tâm trợ giúp', id: 'help-center' },
        { name: "Hust'food mail", id: 'mail' },
        { name: 'Hướng dẫn mua hàng', id: 'guide' },
      ],
    },
    {
      heading: 'Giới thiệu',
      items: [
        { name: 'Giới thiệu', id: 'about' },
        { name: 'Tuyển dụng', id: 'careers' },
        { name: 'Điều khoản', id: 'terms' },
      ],
    },
    {
      heading: 'Danh mục',
      items: [
        { name: 'Bim Bim', id: 'snacks' },
        { name: 'Nước ngọt', id: 'drinks' },
        { name: 'Bánh kẹo', id: 'sweets' },
      ],
    },
    {
      heading: 'Theo dõi',
      items: [
        { name: 'Facebook', id: 'facebook', icon: faSquareFacebook },
        { name: 'Instagram', id: 'instagram', icon: faInstagram },
      ],
    },
    {
      heading: 'VÀO CỬA HÀNG TRÊN ỨNG DỤNG',
      items: [
        { name: 'Google Play', id: 'google-play', icon: null },
        { name: 'App Store', id: 'app-store', icon: null },
      ]
    }
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="grid">
        <div className="grid__row">
          {footerSections.map((section) => (
            <div key={section.heading} className="grid__column-2-4">
              <h3 className="footer__heading">{section.heading}</h3>
              <ul className="footer-list">
                {section.items.map((item) => (
                  <li key={item.id} className="footer-item">
                    <div
                      className="footer-item__link"
                      onClick={(e) => handleLinkClick(section.heading, item.name)}
                    >
                      {item.icon && (
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="footer-item__icon"
                        />
                      )}
                      {item.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer__bottom">
        <div className="grid">
          <p className="footer__text">Bản quyền thuộc về nhóm 24</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;