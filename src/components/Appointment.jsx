import React from 'react';
import { useTranslation } from 'react-i18next';
import './Appointment.css';

const BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3yJJTq77Zt8VTVr33bNCifcIWkcrO7Nji0Gcg59-PFvQiE7gCgrnLJ-BKF_LWxA2aA2M5jwTV7?gv=true';

const Appointment = () => {
  const { t } = useTranslation();

  return (
    <section id="appointment" className="appointment-section">
      <div className="appointment-container" data-aos="fade-up">
        <h2 className="appointment-title">{t('appointment_title')}</h2>
        <p className="appointment-subtitle">{t('appointment_subtitle')}</p>

        <iframe
          src={BOOKING_URL}
          title={t('appointment_title')}
          className="appointment-iframe"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Appointment;
