import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProcessRoute.css';

// "La Ruta" — pulida sobre el patrón del wireframe F (hero-f-ruta-del-tramite,
// mismo proyecto de Figr). Antes tenía un selector de 7 pestañas (las mismas
// categorías de MigrationIntent) que en realidad NO cambiaba ningún
// contenido — los 5 pasos son el mismo procedimiento administrativo general
// (documentado en blogArticles.js) sin importar el trámite, así que las
// pestañas solo reanimaban el mismo texto. Elias lo notó ("¿la ruta está de
// más?") y confirmó quitar el selector, quedándose con la línea de tiempo
// fija de 5 pasos — el contenido real y único de esta sección (en especial
// el paso 3, "Prevención", que no está en ningún otro lado del sitio).
const steps = ['1', '2', '3', '4', '5'];

const ProcessRoute = () => {
  const { t } = useTranslation();

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
        <div className="route-steps">
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
        </div>

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
