import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import logoBlack from '../assets/Daguer Hernandez Abogado nombre negro.webp';
import logoWhite from '../assets/Daguer Hernandez Abogado nombre blanco.webp';
import flagUsa from '../assets/flag-usa.svg';
import flagSpain from '../assets/flag-spain.svg';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollState, setScrollState] = useState('with-topbar');

  const prefix = i18n.language === 'en' ? '/en' : '';
  const homeHref = prefix || '/';

  // El overlay siempre está en el DOM (solo se traslada fuera de pantalla vía CSS),
  // así que quitar `.open` dispara la transición de salida — no hace falta un estado
  // de "cerrando" con setTimeout como con las keyframes anteriores.
  const closeMenu = () => setIsMenuOpen(false);

  // El switch de idioma navega a la ruta equivalente en el otro idioma
  // (/en, /en/about-details) en vez de solo cambiar el texto en la misma URL —
  // así Google puede indexar cada idioma por separado. Ver src/App.jsx.
  const switchLanguage = (lng) => {
    const isAbout = location.pathname.replace(/^\/en/, '') === '/about-details';
    const path = lng === 'en'
      ? (isAbout ? '/en/about-details' : '/en')
      : (isAbout ? '/about-details' : '/');
    i18n.changeLanguage(lng);
    navigate(path);
    closeMenu();
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  // Bloquea el scroll del body mientras el menú móvil (overlay de pantalla completa)
  // está abierto, para que la página de fondo no se desplace detrás.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    document.body.classList.toggle('mobile-menu-open', isMenuOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMenuOpen]);

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

  // Cuando el menú móvil está abierto, el header se vuelve transparente sobre el
  // overlay navy, así que el logo siempre debe ser el blanco (aunque estemos en
  // estado 'scrolled', donde normalmente se usa el negro).
  const useWhiteLogo = scrollState !== 'scrolled' || isMenuOpen;

  return (
    <header className={`${getHeaderClass()} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="logo">
        <a href={homeHref}>
          <img
            src={useWhiteLogo ? logoWhite : logoBlack}
            alt="Logo del Bufete"
            className="logo-image"
          />
        </a>
      </div>

      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul>
          <li><a href={`${prefix}/#about`} onClick={closeMenu}>{t('about')}</a></li>
          <li><a href={`${prefix}/#services`} onClick={closeMenu}>{t('services')}</a></li>
          <li><a href={`${prefix}/#contact`} onClick={closeMenu}>{t('contact')}</a></li>

          <li className="language-buttons">
            <button onClick={() => switchLanguage('en')}>
              <img src={flagUsa} alt="English" className="flag-icon" />
            </button>
            <button onClick={() => switchLanguage('es')}>
              <img src={flagSpain} alt="Español" className="flag-icon" />
            </button>
          </li>

          <li className="mobile-menu-footer">
            <a href="tel:+50687033868" className="mobile-menu-phone">
              <svg className="mobile-menu-phone-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21.17 2.83 13.93 2.83 5a1 1 0 011-1H7.3a1 1 0 011 1c0 1.35.26 2.67.76 3.88a1 1 0 01-.26 1.11l-2.18 2.2z"/>
              </svg>
              +506 8703-3868
            </a>
            <a href={`${prefix}/#appointment`} className="mobile-menu-cta" onClick={closeMenu}>
              {t('cta_button')}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
