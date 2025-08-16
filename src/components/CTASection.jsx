import React from 'react';
import { useTranslation } from 'react-i18next';
import './CTASection.css';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="cta-section">
      <div className="cta-content" data-aos="fade-up">
        <h2>{t('cta_heading')}</h2>
        <p>{t('cta_text')}</p>
        <a href="#contact" className="cta-button" data-aos="zoom-in" data-aos-delay="300">
          {t('cta_button')}
        </a>
      </div>
    </section>
  );
};

export default CTASection;
