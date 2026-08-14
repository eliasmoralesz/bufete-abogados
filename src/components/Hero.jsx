import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import lawyerImage from '../assets/lawyer.webp';
import './Hero.css';

// Rediseño "editorial oscuro" inspirado en el wireframe E de la auditoría en Figr,
// pero corrigiendo su placeholder: el retrato NO va incrustado como recuadro entre
// las letras (se veía como una estampilla) — va grande, desaturado y NÍTIDO (sin
// difuminar, se veía mal) detrás del titular, con un velo de gradiente para
// mantener el texto legible. La palabra "MIGRACIÓN" queda entera. "DIRIGÍ" (Elias
// confirmó, sabiendo que el cargo real fue Subdirector — ver hero_ed_lead abajo,
// que sí trae el título exacto) en vez del "CONOCÍ" más tibio de un primer intento.
const Hero = () => {
  const { t } = useTranslation();
  const whatsappHref = 'https://wa.me/50689655582?text=Hola%20Daguer,%20quiero%20agendar%20una%20consulta';

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <img src={lawyerImage} alt="" loading="eager" />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <motion.div
          className="hero-headline"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hl-line">{t('hero_ed_pre')}</span>
          <span className="hl-line">{t('hero_ed_wordA')}{t('hero_ed_wordB')}</span>
          <span className="hl-line hl-dim">{t('hero_ed_post')}</span>
        </motion.div>

        <motion.div
          className="hero-foot"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-lead">
            <p>{t('hero_ed_lead')}</p>
            <div className="hero-actions">
              <a href="#appointment" className="btn btn-primary">{t('hero_ed_cta')}</a>
              <a href={whatsappHref} className="btn btn-text" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="hero-counter" aria-hidden="true">
            <div className="hc-nums">
              <span className="active">01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
            </div>
            <div className="hc-track"><span className="hc-fill" /></div>
            <div className="hc-label">{t('hero_ed_areas')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
