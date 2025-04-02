import React from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services">
      <h2>{t('services')}</h2>
      <ul>
        <li>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0A288D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20M4 8a8 8 0 0 0 16 0" />
          </svg>
          <h3>{t('civilLaw')}</h3>
          <p>{t('civilLaw_desc')}</p>
        </li>
        <li>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0A288D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M12 18v-6" />
          </svg>
          <h3>{t('criminalLaw')}</h3>
          <p>{t('criminalLaw_desc')}</p>
        </li>
        <li>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0A288D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 2v4h4V2" />
          </svg>
          <h3>{t('laborLaw')}</h3>
          <p>{t('laborLaw_desc')}</p>
        </li>
      </ul>
    </section>
  );
};

export default Services;