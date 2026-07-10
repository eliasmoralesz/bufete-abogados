import React from 'react';
import { useTranslation } from 'react-i18next';
import './ServiceCard.css';

const ServiceCard = ({ icon, title, description, delay = 0 }) => {
  const { t } = useTranslation();

  return (
    <li className="service-card" data-aos="fade-up" data-aos-delay={delay}>
      <div className="service-icon-circle">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#appointment" className="service-cta">
        {t('services_cta')} <span aria-hidden="true">→</span>
      </a>
    </li>
  );
};

export default ServiceCard;
