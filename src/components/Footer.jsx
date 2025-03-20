import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <p>{t('copyright')}</p>
    </footer>
  );
};

export default Footer;