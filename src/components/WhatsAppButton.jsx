import React from 'react';
import { useTranslation } from 'react-i18next';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const { t } = useTranslation(); // Hook para acceder a las traducciones
  const whatsappUrl = 'https://wa.me/50687033868?text=Hola%20Daguer,%20quiero%20contactarte';

  return (
    <div className="whatsapp-container">
      <span className="whatsapp-text">{t('whatsapp_contact')}</span>
      <a href={whatsappUrl} className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;