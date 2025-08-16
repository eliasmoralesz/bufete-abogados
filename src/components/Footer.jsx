import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/Daguer Hernandez Abogado nombre dorado.png';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Daguer Hernandez" className="logo-image" />
        </div>

        <div className="footer-call">
          <h3>{t('call_me')}</h3>
          <a href="tel:+50687033868" className="phone-button">
            +506 8703-3868
          </a>
          <p className="highlight">{t('schedule')}</p>
        </div>

        <div className="footer-write">
          <h3>{t('write_me')}</h3>
          <div className="email-social-wrapper">
            <a href="mailto:daguerhernandezvasquez@gmail.com" className="email-button">
              daguerhernandezvasquez@gmail.com
            </a>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="tiktok-icon">
                <svg width="24" height="24" viewBox="0 0 256 256" fill="none" stroke="#d4af37" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M168 32c5.3 8.3 16 16 32 18v28c-18-2.5-34-11.5-44-24v90c0 39.8-33 72-74 72s-74-32.2-74-72 33-72 74-72c5 0 9.8.5 14.4 1.5v27.8c-4.7-1.1-9.4-1.7-14.4-1.7-24.3 0-44 19.4-44 43.4s19.7 43.4 44 43.4 44-19.4 44-43.4V32h32z"/>
                </svg>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="copyright">{t('copyright')}</p>
    </footer>
  );
};

export default Footer;
