import React from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{t('welcome')}</h1>
        <p>{t('expert')}</p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-primary">{t('contact')}</a>
          <a href="#services" className="btn-secondary">{t('services')}</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;