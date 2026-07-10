import React from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';
import ServiceCard from '../components/ServiceCard'; // ✅ Con C mayúscula, y archivo renombrado igual

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services">
      <div className="services-header" data-aos="fade-up">
        <span className="services-eyebrow">{t('services_eyebrow')}</span>
        <h2>{t('services')}</h2>
        <span className="services-divider" aria-hidden="true" />
        <p className="services-subtitle">{t('services_subtitle')}</p>
      </div>

      <ul className="services-list">
          <ServiceCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="M6 16h6M13 8h5M13 12h5" />
              </svg>
            }
            title={t('migrationLaw')}
            description={t('migrationLaw_desc')}
            delay={0}
          />

          <ServiceCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M8.5 13 7 21l5-3 5 3-1.5-8" />
              </svg>
            }
            title={t('notarialLaw')}
            description={t('notarialLaw_desc')}
            delay={80}
          />

          <ServiceCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20M4 8a8 8 0 0 0 16 0" />
              </svg>
            }
            title={t('civilLaw')}
            description={t('civilLaw_desc')}
            delay={160}
          />

          <ServiceCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6" />
              </svg>
            }
            title={t('criminalLaw')}
            description={t('criminalLaw_desc')}
            delay={240}
          />

          <ServiceCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 2v4h4V2" />
              </svg>
            }
            title={t('laborLaw')}
            description={t('laborLaw_desc')}
            delay={320}
          />

          <ServiceCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 5c3-1.5 6-1.5 9 0v14c-3-1.5-6-1.5-9 0V5z" />
                <path d="M22 5c-3-1.5-6-1.5-9 0v14c3-1.5 6-1.5 9 0V5z" />
              </svg>
            }
            title={t('registralLaw')}
            description={t('registralLaw_desc')}
            delay={400}
          />
      </ul>
    </section>
  );
};

export default Services;
