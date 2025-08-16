import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutDetails.css';

const AboutDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 🔄 Inicializar AOS y forzar scroll al top
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,         // ✅ evita animaciones repetidas
      mirror: false       // ✅ evita reanimar al hacer scroll hacia arriba
    });
    window.scrollTo(0, 0); // fuerza inicio desde arriba
  }, []);
  

  const handleBackToAbout = () => {
    navigate('/#about');
  };

  return (
    <>
      <TopBar />
      <Header />

      <section className="about-details-section">
        <div className="about-details-overlay" />

        <div className="about-details-container" data-aos="fade-up">
          <h1 className="about-details-title" data-aos="fade-up">
            {t('aboutDetailsTitle')}
          </h1>

          <div className="about-details-content">
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

            <div className="profile-section">
              <h3>{t('commitment')}</h3>
              <p>{t('commitmentText')}</p>
            </div>
          </div>

          <div className="about-details-footer">
            <button className="back-button" onClick={handleBackToAbout}>
              <FaArrowLeft style={{ marginRight: '8px' }} />
              {t('backToAbout')}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutDetails;
