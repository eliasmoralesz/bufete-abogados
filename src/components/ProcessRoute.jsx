import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './ProcessRoute.css';

// "La Ruta" — pulida sobre el patrón del wireframe F (hero-f-ruta-del-tramite,
// mismo proyecto de Figr). Las pestañas reusan las categorías reales de
// MigrationIntent (mismas claves i18n, no duplicadas) y solo cambian qué área
// queda resaltada — las 5 etapas del trámite son el mismo procedimiento
// administrativo general (documentado en blogArticles.js), no un set de
// contenido distinto inventado por categoría. A propósito NO se muestra una
// "duración típica" por trámite: no hay una cifra verificada por categoría y
// no queremos inventar una.
const steps = ['1', '2', '3', '4', '5'];
const areas = [
  // CETC va primera — Daguer pidió más visibilidad para este recurso.
  { key: 'cetc', label: 'migrationIntent_cetc_tab' },
  { key: 'residency', label: 'migrationIntent_residency_tab' },
  { key: 'naturalization', label: 'migrationIntent_naturalization_tab' },
  { key: 'refuge', label: 'migrationIntent_refuge_tab' },
  { key: 'dimex', label: 'migrationIntent_dimex_tab' },
  { key: 'permits', label: 'migrationIntent_permits_tab' },
  { key: 'return', label: 'migrationIntent_return_tab' },
];

const ProcessRoute = () => {
  const { t } = useTranslation();
  const [activeArea, setActiveArea] = useState(areas[0].key);

  const whatsappHref = 'https://wa.me/50689655582?text=Hola%20Daguer,%20quiero%20agendar%20una%20consulta';

  return (
    <section id="la-ruta" className="route-section">
      <div className="route-header" data-aos="fade-up">
        <div className="route-header-copy">
          <span className="route-eyebrow">{t('sectionEyebrow_route')}</span>
          <h2>{t('route_title')}</h2>
        </div>
        <div className="route-credential">
          <span className="route-credential-label">{t('route_credential_label')}</span>
          <span className="route-credential-value">{t('route_credential_value')}</span>
        </div>
      </div>

      <div className="route-panel" data-aos="fade-up" data-aos-delay="100">
        <div className="route-tabs">
          {areas.map((area) => (
            <button
              type="button"
              key={area.key}
              className={`route-tab ${activeArea === area.key ? 'active' : ''}`}
              onClick={() => setActiveArea(area.key)}
              aria-pressed={activeArea === area.key}
            >
              {t(area.label)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="route-steps"
            key={activeArea}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {steps.map((step) => (
              <div className={`route-step ${step === '3' ? 'route-step-highlight' : ''}`} key={step}>
                <div className="route-step-dot-row">
                  <span className="route-step-dot" aria-hidden="true" />
                  <span className="route-step-line" aria-hidden="true" />
                </div>
                <span className="route-step-label">{t(`route_step${step}_label`)}</span>
                <h3>{t(`route_step${step}_title`)}</h3>
                <p>{t(`route_step${step}_desc`)}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="route-footer">
          <span>{t('route_footer_prompt')}</span>
          <div className="route-footer-actions">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="route-footer-btn">
              WhatsApp
            </a>
            <a href="#appointment" className="route-footer-btn route-footer-btn-primary">
              {t('hero_ed_cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessRoute;
