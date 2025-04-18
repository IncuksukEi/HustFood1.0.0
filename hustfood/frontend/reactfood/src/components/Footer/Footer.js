import React from 'react';
import "Footer.css";
import "../../styles/base.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import googlePlay from './assets/img/google_play.png'; // Adjust path as needed
import appStore from './assets/img/app_store.png'; // Adjust path as needed
import './assets/css/base.css';
import './assets/css/main.css';

const Footer = () => {
  // Placeholder handlers (to be implemented by you)
  const handleLinkClick = (category, item) => {
    // Handle footer link clicks (e.g., customer service, about, categories, social media)
    console.log(`Clicked ${category}: ${item}`);
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
        { name: 'Youtube', id: 'youtube', icon: faYoutube },
      ],
    },
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
                    <a
                      href="#"
                      className="footer-item__link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(section.heading, item.name);
                      }}
                    >
                      {item.icon && (
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="footer-item__icon"
                        />
                      )}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
            <div className="footer__download">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleAppDownload('Google Play');
                }}
              >
                <img
                  src={googlePlay}
                  alt="Google Play"
                  className="footer__download-app-img"
                />
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleAppDownload('App Store');
                }}
              >
                <img
                  src={appStore}
                  alt="App Store"
                  className="footer__download-app-img"
                />
              </a>
            </div>
          </div>
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