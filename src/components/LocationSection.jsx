import React from 'react';
import { useTranslation } from 'react-i18next';
import sanJoseLocation from '../assets/sanjose-city.webp';
import './LocationSection.css';

const mapsEmbedUrl = 'https://www.google.com/maps?q=Daguer%20Hernandez%2C%20San%20Sebasti%C3%A1n%2C%20San%20Jos%C3%A9%2C%20Costa%20Rica&output=embed';

const LocationSection = () => {
  const { t } = useTranslation();

  return (
    <section id="ubicacion" className="location-section">
      <div className="location-intro">
        <h2>{t('location_title')}</h2>
        <p>{t('location_intro')}</p>
      </div>

      <div className="location-grid" data-aos="fade-up">
        <div className="location-photo-panel">
          <img
            src={sanJoseLocation}
            alt={t('location_photo_alt')}
            loading="lazy"
          />
          <div className="location-photo-content">
            <h3>{t('location_office_title')}</h3>

            <div className="location-details">
              <p>
                <span>{t('location_address')}</span>
              </p>
              <p>
                <a href="tel:+50687033868">
                  <strong>{t('location_phone_label')}</strong> {t('location_phone')}
                </a>
              </p>
              <p>
                <a href="mailto:consulta@daguerhernandez.com">
                  <strong>{t('location_email_label')}</strong> {t('location_email')}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="location-map" aria-label={t('location_map_label')}>
          <iframe
            src={mapsEmbedUrl}
            title={t('location_map_label')}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
