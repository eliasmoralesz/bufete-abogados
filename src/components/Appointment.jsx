import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import './Appointment.css';

const Appointment = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </Helmet>
      <section id="appointment" className="appointment-section">
        <div className="appointment-container" data-aos="fade-up">
          <h2 className="appointment-title">{t('appointment_title')}</h2>
          <p className="appointment-subtitle">{t('appointment_subtitle')}</p>
          
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/daguerhernandezvasquez/30min"
            style={{ minWidth: '320px', height: '700px' }}
          >
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointment;