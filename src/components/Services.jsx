import React from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';
import ServiceCard from '../components/ServiceCard'; // ✅ Con C mayúscula, y archivo renombrado igual

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services">
      <h2 data-aos="fade-up">{t('services')}</h2>
      <ul className="services-list">
                <ServiceCard
            icon={
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0A288D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20M4 8a8 8 0 0 0 16 0" />
              </svg>
            }
            title={t('civilLaw')}
            description={t('civilLaw_desc')}
            iconAnimation="fade-up"
            iconDelay={0}
            titleAnimation="flip-left"
            titleDelay={200}
            descAnimation="fade-up"
            descDelay={400}
          />

          <ServiceCard
            icon={
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0A288D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6" />
              </svg>
            }
            title={t('criminalLaw')}
            description={t('criminalLaw_desc')}
            iconAnimation="fade-up"
            iconDelay={100}
            titleAnimation="fade-right"
            titleDelay={300}
            descAnimation="fade-up"
            descDelay={500}
          />

          <ServiceCard
            icon={
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0A288D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 2v4h4V2" />
              </svg>
            }
            title={t('laborLaw')}
            description={t('laborLaw_desc')}
            iconAnimation="fade-up"
            iconDelay={200}
            titleAnimation="flip-right"
            titleDelay={400}
            descAnimation="fade-up"
            descDelay={600}
          />
      </ul>
    </section>
  );
};

export default Services;
