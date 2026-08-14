import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
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
//
// Movimiento/interacción (spec original del wireframe E + ajustes de feedback real):
// 1) el titular entra letra por letra al cargar, a ritmo pausado (no instantáneo).
// 2) el RETRATO (no el contenedor que lo recorta) responde con un ligero paralaje
//    al mover el cursor, y se revela con un fundido tras el titular.
// 3) las stats reales (+12 años / 1000+ casos / 95% de éxito — las mismas que ya
//    existían en el sitio, no inventadas) cuentan hacia arriba al terminar la
//    entrada — reemplazan el contador 01-04 decorativo, que no representaba nada
//    real ("los números deberían hacer algo", feedback de Elias).
// 4) el trámite destacado (Residencia/Naturalización/DIMEX/Notarial) cambia según
//    el scroll dentro del hero, para que "deslice para ver los trámites" cumpla
//    lo que promete.

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.048 } },
};

const charVariants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const AnimatedLine = ({ text, className, delay = 0 }) => (
  <motion.span
    className={className}
    variants={lineVariants}
    initial="hidden"
    animate="visible"
    transition={{ delayChildren: delay }}
    aria-hidden="true"
  >
    {text.split('').map((char, i) => (
      <motion.span key={i} variants={charVariants} style={{ display: 'inline-block' }}>
        {/* Un espacio normal solo dentro de un inline-block se colapsa a 0 —
            se usa un espacio irrompible para que conserve su ancho. */}
        {char === ' ' ? ' ' : char}
      </motion.span>
    ))}
  </motion.span>
);

// Cuenta de 0 hasta `target` cuando `start` pasa a true. Formatea con
// prefijo/sufijo (+12, 1000+, 95%) sin tocar el valor numérico animado.
const useCountUp = (target, start, duration = 1.3) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, target, duration]);

  return value;
};

const HeroStat = ({ target, prefix = '', suffix = '', start, label, delay = 0 }) => {
  const value = useCountUp(target, start, 1.3 + delay);
  return (
    <div className="hero-stat">
      <span className="hero-stat-number">{prefix}{value}{suffix}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);

  const whatsappHref = 'https://wa.me/50689655582?text=Hola%20Daguer,%20quiero%20agendar%20una%20consulta';

  const pre = t('hero_ed_pre');
  const mid = `${t('hero_ed_wordA')}${t('hero_ed_wordB')}`;
  const post = t('hero_ed_post');
  const fullTitle = `${pre} ${mid}. ${post}`;
  const areas = t('hero_ed_areas').split(' · ');

  // --- Paralaje suave con el cursor: se mueve la FOTO, no el contenedor que la
  // recorta (ese quedaba fijo, alineado con el velo — mover el contenedor entero
  // desalineaba el recorte del degradado y el efecto no se notaba). ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 16, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 16, mass: 0.5 });
  const portraitX = useTransform(springX, [-0.5, 0.5], ['-22px', '22px']);
  const portraitY = useTransform(springY, [-0.5, 0.5], ['-16px', '16px']);

  useEffect(() => {
    const target = heroRef.current;
    if (!target) return undefined;

    const handleMove = (event) => {
      const rect = target.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    target.addEventListener('mousemove', handleMove);
    target.addEventListener('mouseleave', handleLeave);
    return () => {
      target.removeEventListener('mousemove', handleMove);
      target.removeEventListener('mouseleave', handleLeave);
    };
  }, [mouseX, mouseY]);

  // --- Trámite destacado según el scroll dentro del hero ---
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const areaIndexMV = useTransform(scrollYProgress, (v) => Math.min(areas.length - 1, Math.floor(v * areas.length)));
  const [activeArea, setActiveArea] = useState(0);
  useEffect(() => areaIndexMV.on('change', (v) => setActiveArea(v)), [areaIndexMV]);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true">
        <motion.img
          src={lawyerImage}
          alt=""
          loading="eager"
          style={{ x: portraitX, y: portraitY }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <h1 className="hero-headline" aria-label={fullTitle}>
          <AnimatedLine text={pre} className="hl-line" delay={0} />
          <AnimatedLine text={mid} className="hl-line" delay={pre.length * 0.048 + 0.25} />
          <AnimatedLine
            text={post}
            className="hl-line hl-dim"
            delay={(pre.length + mid.length) * 0.048 + 0.5}
          />
        </h1>

        <motion.div
          className="hero-foot"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setStatsStarted(true)}
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

          <div className="hero-stats">
            <HeroStat target={12} prefix="+" start={statsStarted} label={t('hero_stat_years')} delay={0} />
            <HeroStat target={1000} suffix="+" start={statsStarted} label={t('hero_stat_cases')} delay={0.15} />
            <HeroStat target={95} suffix="%" start={statsStarted} label={t('hero_stat_success')} delay={0.3} />
          </div>
        </motion.div>

        <div className="hero-bottom-bar">
          <span className="hero-scroll-hint">{t('hero_scroll_hint')}</span>
          <div className="hero-areas">
            {areas.map((area, i) => (
              <span key={area} className={i === activeArea ? 'active' : ''}>{area}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
