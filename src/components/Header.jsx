import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Daguer Hernandez Abogado nombre negro.png'; // Nombre exacto del logo
import flagUsa from '../assets/flag-usa.svg'; // Icono SVG para inglés
import flagSpain from '../assets/flag-spain.svg'; // Icono SVG para español
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
        <a href="/">
          <img src={logo} alt="Logo del Bufete" className="logo-image" />
        </a>
      </div>
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul>
          <li><a href="#about">{t('about')}</a></li>
          <li><a href="#services">{t('services')}</a></li>
          <li><a href="#contact">{t('contact')}</a></li>
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