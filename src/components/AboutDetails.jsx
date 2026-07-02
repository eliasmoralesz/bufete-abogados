import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // Usaremos Link para la navegación
import { FaArrowLeft, FaGavel, FaBalanceScale, FaHandshake } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutDetails.css';

const AboutDetails = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Más sobre Daguer Hernández | Experiencia y Compromiso</title>
        <meta name="description" content="Conozca la trayectoria de Daguer Hernández, ex-Subdirector de Migración y especialista en Derecho Notarial con más de una década de experiencia." />
      </Helmet>

      <TopBar />
      <Header />

      <section className="about-details-section">
        <div className="about-details-overlay" />

        <div className="about-details-container" data-aos="fade-up">
          <h1 className="about-details-title">{t('aboutDetailsTitle')}</h1>

          {/* 👇 INICIO DE LA MODIFICACIÓN DEL LAYOUT */}
          <div className="details-layout-grid">
            
            {/* --- COLUMNA DE CONTENIDO PRINCIPAL --- */}
            <div className="main-content-column">
              <div className="profile-section" data-aos="fade-up">
                <h3>{t('introduction')}</h3>
                <p>{t('aboutDetailsText')}</p>
              </div>

              <div className="profile-section" data-aos="fade-up">
                <h3>{t('experience')}</h3>
                <p>{t('experienceText')}</p>
                <div className="profile-highlights">
                  <ul>
                    <li>{t('experienceHighlight1')}</li>
                    <li>{t('experienceHighlight2')}</li>
                    <li>{t('experienceHighlight3')}</li>
                  </ul>
                </div>
              </div>

              <div className="profile-section" data-aos="fade-up">
                <h3>{t('commitment')}</h3>
                <p>{t('commitmentText')}</p>
              </div>
            </div>

            {/* --- COLUMNA DE BARRA LATERAL (SIDEBAR) --- */}
            <aside className="sidebar-column" data-aos="fade-left">
              <div className="sidebar-widget">
                <h4 className="widget-title">{t('practiceAreasTitle')}</h4>
                <ul className="widget-list">
                  <li><Link to="/services/notarial"><FaGavel /> {t('area1Title')}</Link></li>
                  <li><Link to="/services/registral"><FaBalanceScale /> {t('area2Title')}</Link></li>
                  <li><Link to="/services/migratorio"><FaHandshake /> {t('area3Title')}</Link></li>
                  {/* Agrega más áreas de práctica aquí */}
                </ul>
              </div>
              
              <div className="sidebar-widget">
                 <h4 className="widget-title">{t('contactInfoTitle')}</h4>
                 <p>
                   <strong>Email:</strong> info@daguerhernandez.com<br/>
                   <strong>Teléfono:</strong> +506 8888-8888
                 </p>
                 <Link to="/#contact" className="widget-contact-button">{t('heroCTA')}</Link>
              </div>
            </aside>

          </div>
          {/* 👆 FIN DE LA MODIFICACIÓN DEL LAYOUT */}

          <div className="about-details-footer">
            <Link to="/#about" className="back-button">
              <FaArrowLeft style={{ marginRight: '8px' }} />
              {t('backToAbout')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutDetails;
