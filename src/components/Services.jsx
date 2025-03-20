import React from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services">
      <h2>{t('services')}</h2>
      <ul>
        <li>{t('civilLaw')}</li>
        <li>{t('criminalLaw')}</li>
        <li>{t('laborLaw')}</li>
      </ul>
    </section>
  );
};

export default Services;