import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProcessRoute.css';

// "La Ruta" — sección nueva del rediseño editorial (wireframe E, auditoría en Figr).
// Las 5 etapas son las del trámite migratorio real en Costa Rica (reunir documentos,
// cita, prevención/subsanación, resolución, DIMEX), ya documentadas en los artículos
// reales de src/content/blogArticles.js — no son estadísticas inventadas sobre el
// despacho, solo el procedimiento tal como está descrito ahí.
const steps = ['1', '2', '3', '4', '5'];

const ProcessRoute = () => {
  const { t } = useTranslation();

  return (
    <section id="la-ruta" className="route-section">
      <div className="route-header" data-aos="fade-up">
        <span className="route-eyebrow">
          <span className="route-eyebrow-num">02</span> — {t('sectionEyebrow_route')}
        </span>
        <h2>{t('route_title')}</h2>
        <p>{t('route_intro')}</p>
      </div>

      <div className="route-steps" data-aos="fade-up" data-aos-delay="100">
        {steps.map((step) => (
          <div className={`route-step ${step === '3' ? 'route-step-highlight' : ''}`} key={step}>
            <span className="route-step-label">{t(`route_step${step}_label`)}</span>
            <h3>{t(`route_step${step}_title`)}</h3>
            <p>{t(`route_step${step}_desc`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessRoute;
