import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faFlagUsa, faFlag } from '@fortawesome/free-solid-svg-icons'; // Banderas
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false); // Cierra el menú después de cambiar el idioma
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Abre o cierra el menú
  };

  return (
    <header>
      <div className="logo">
        <a href="/">Logo del Bufete</a> {/* Logo como enlace a la página de inicio */}
      </div>
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul>
          <li><a href="#about">{t('about')}</a></li>
          <li><a href="#services">{t('services')}</a></li>
          <li><a href="#blog">{t('blog')}</a></li>
          <li><a href="#contact">{t('contact')}</a></li>
          <li className="language-buttons">
            <button onClick={() => changeLanguage('en')}>
              <FontAwesomeIcon icon={faFlagUsa} /> {/* Bandera de EE.UU. */}
            </button>
            <button onClick={() => changeLanguage('es')}>
              <FontAwesomeIcon icon={faFlag} /> {/* Bandera de España */}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;