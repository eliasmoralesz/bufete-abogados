import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logoBlack from '../assets/Daguer Hernandez Abogado nombre negro.png';
import logoWhite from '../assets/Daguer Hernandez Abogado nombre blanco.png';
import flagUsa from '../assets/flag-usa.svg';
import flagSpain from '../assets/flag-spain.svg';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // nuevo estado
  const [scrollState, setScrollState] = useState('with-topbar');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true); // activa clase 'closing'
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false); // remueve clase después de animación
      }, 200); // debe coincidir con duración de fadeOutMenu en CSS
    } else {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const hero = document.querySelector('.hero');
      const heroHeight = hero ? hero.offsetHeight : 400;

      if (scrollY < 20) {
        setScrollState('with-topbar');
      } else if (scrollY >= 20 && scrollY < heroHeight) {
        setScrollState('no-topbar');
      } else {
        setScrollState('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHeaderClass = () => {
    if (scrollState === 'scrolled') return 'scrolled no-topbar';
    if (scrollState === 'no-topbar') return 'no-topbar';
    return 'with-topbar';
  };

  return (
    <header className={getHeaderClass()}>
      <div className="logo">
        <a href="/">
          <img
            src={scrollState === 'scrolled' ? logoBlack : logoWhite}
            alt="Logo del Bufete"
            className="logo-image"
          />
        </a>
      </div>

      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}>
        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul>
          <li><a href="/#about">{t('about')}</a></li>
          <li><a href="/#services">{t('services')}</a></li>
          <li><a href="/#contact">{t('contact')}</a></li>

          <li className="language-buttons">
            <button onClick={() => changeLanguage('en')}>
              <img src={flagUsa} alt="English" className="flag-icon" />
            </button>
            <button onClick={() => changeLanguage('es')}>
              <img src={flagSpain} alt="Español" className="flag-icon" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
