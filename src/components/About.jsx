import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about">
      <h2>{t('about')}</h2>
      <p>{t('aboutText')}</p>
      <p>{t('aboutText2')}</p>
    </section>
  );
};

export default About;