import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNearViewport } from '../hooks/useNearViewport';
import './Appointment.css';

const BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3yJJTq77Zt8VTVr33bNCifcIWkcrO7Nji0Gcg59-PFvQiE7gCgrnLJ-BKF_LWxA2aA2M5jwTV7?gv=true';

const Appointment = () => {
  const { t } = useTranslation();
  // Antes tenía loading="lazy": el navegador esperaba a que la sección
  // estuviera CASI en pantalla para siquiera empezar a pedir el iframe, y
  // el widget de Google Calendar es pesado para inicializar — de ahí el
  // retraso visible que notó Elias justo al llegar. Cargarlo directo desde
  // el arranque tampoco era buena idea (peso/requests de más al primer
  // render, con posible impacto en Core Web Vitals — señal real de SEO).
  //
  // El respaldo de 1200ms es clave: Elias señaló que "Agendar consulta" se
  // puede pulsar directo desde el Hero o el header SIN scrollear nada — el
  // botón salta de una vez a esta sección, sin darle chance al scroll de
  // ir adelantando la carga. Con este timer el iframe ya arrancó a cargar
  // en segundo plano ~1.2s después de montar la página (tiempo de sobra
  // para no competir con lo crítico del primer render, pero mucho antes de
  // que una persona real alcance a leer la página y hacer clic) — así que
  // para cuando cualquiera de los 5 botones "Agendar consulta" del sitio
  // lo lleve hasta acá, el calendario ya está listo o casi. Ver
  // src/hooks/useNearViewport.js.
  const [nearRef, isNear] = useNearViewport('0px 0px 1500px 0px', 'https://calendar.google.com', 1200);

  return (
    <section id="appointment" className="appointment-section" ref={nearRef}>
      <div className="appointment-container" data-aos="fade-up">
        <h2 className="appointment-title">{t('appointment_title')}</h2>
        <p className="appointment-subtitle">{t('appointment_subtitle')}</p>

        <iframe
          src={isNear ? BOOKING_URL : undefined}
          title={t('appointment_title')}
          className="appointment-iframe"
        />
      </div>
    </section>
  );
};

export default Appointment;
