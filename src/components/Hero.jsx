import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import portraitA from '../assets/hero-portrait-2.jpg';
import portraitB from '../assets/hero-portrait-1.JPG';
import './Hero.css';

// Las dos fotos reales de Daguer (tomadas de invitaciones a programas de TV)
// alternan lentamente de fondo — la 2 (perfil, traje navy, la que Elias
// eligió como principal) va primero y se queda más tiempo en pantalla; la 1
// (corbata roja, gesticulando) entra después como variación. Ambos elementos
// quedan siempre montados y solo se cruza la opacidad entre ellos — evita
// depender de AnimatePresence para el montaje/desmontaje.
const PORTRAITS = [portraitA, portraitB];
const PORTRAIT_INTERVAL_MS = 7000;

// Rediseño "editorial oscuro" inspirado en el wireframe E de la auditoría en Figr,
// pero corrigiendo su placeholder: el retrato NO va incrustado como recuadro entre
// las letras (se veía como una estampilla) — va grande, desaturado y NÍTIDO (sin
// difuminar, se veía mal) detrás del titular, con un velo de gradiente para
// mantener el texto legible. La palabra "MIGRACIÓN" queda entera. "DIRIGÍ" (Elias
// confirmó, sabiendo que el cargo real fue Subdirector — ver hero_ed_lead abajo,
// que sí trae el título exacto) en vez del "CONOCÍ" más tibio de un primer intento.
//
// Movimiento/interacción (spec original del wireframe E + varias rondas de
// feedback real de Elias):
// 1) el titular entra letra por letra al cargar, a ritmo pausado y cinematográfico.
// 2) el RETRATO (no el contenedor que lo recorta) responde con un ligero paralaje
//    al mover el cursor, y se revela con un fundido tras el titular.
// 3) las stats reales (+12 años / 1000+ casos / 95% de éxito) cuentan hacia arriba
//    al terminar la entrada del titular.
// 4) el trámite destacado (Residencia/Naturalización/DIMEX/Notarial) es un
//    selector CLICKEABLE (ya no cambia solo con el scroll — a Elias no le
//    gustaba que el scroll lo moviera solo) que muestra la descripción real de
//    ese trámite y es un link directo a esa sección.

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const charVariants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
};

// Titular animado letra por letra, pero agrupado por PALABRA: cada palabra es
// un bloque que nunca se parte a media letra al ajustar línea (bug real que
// reportó Elias en mobile — "AHORA LO P / REPARO" — porque antes cada letra
// era un inline-block suelto sin noción de a qué palabra pertenecía, así que
// el navegador cortaba donde fuera). Entre palabras va un espacio real, para
// que el ajuste de línea solo pueda pasar ahí, nunca dentro de una palabra.
const AnimatedLine = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
      aria-hidden="true"
    >
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          <span className="hl-word">
            {word.split('').map((char, ci) => (
              <motion.span key={ci} variants={charVariants} style={{ display: 'inline-block' }}>
                {char}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

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

// Trámite ↔ contenido real ya existente en el sitio (Asesoría migratoria /
// Servicios) y ancla a esa sección — no se inventa texto nuevo por trámite.
const AREA_META = [
  { descKey: 'migrationIntent_residency_text', anchor: '#migration-guidance' },
  { descKey: 'migrationIntent_naturalization_text', anchor: '#migration-guidance' },
  { descKey: 'migrationIntent_dimex_text', anchor: '#migration-guidance' },
  { descKey: 'notarialLaw_desc', anchor: '#services' },
];

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [activeArea, setActiveArea] = useState(0);
  const [activePortrait, setActivePortrait] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActivePortrait((i) => (i + 1) % PORTRAITS.length);
    }, PORTRAIT_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const whatsappHref = 'https://wa.me/50689655582?text=Hola%20Daguer,%20quiero%20agendar%20una%20consulta';

  const pre = t('hero_ed_pre');
  const mid = `${t('hero_ed_wordA')}${t('hero_ed_wordB')}`;
  const post = t('hero_ed_post');
  const fullTitle = `${pre} ${mid}. ${post}`;
  const areas = t('hero_ed_areas').split(' · ');
  const activeMeta = AREA_META[activeArea];

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

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true">
        {PORTRAITS.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            className="hero-bg-photo"
            style={{ x: portraitX, y: portraitY }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: i === activePortrait ? 1 : 0, scale: 1 }}
            transition={{
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
          />
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <h1 className="hero-headline" aria-label={fullTitle}>
          <AnimatedLine text={pre} className="hl-line" delay={0} />
          <AnimatedLine text={mid} className="hl-line" delay={pre.length * 0.07 + 0.26} />
          <AnimatedLine
            text={post}
            className="hl-line hl-dim"
            delay={(pre.length + mid.length) * 0.07 + 0.52}
          />
        </h1>

        <motion.div
          className="hero-foot"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.35, ease: [0.22, 1, 0.36, 1] }}
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

          <div className="hero-areas-nav">
            {areas.map((area, i) => (
              <button
                type="button"
                key={area}
                className={i === activeArea ? 'active' : ''}
                onClick={() => setActiveArea(i)}
              >
                {area}
              </button>
            ))}
          </div>

          <motion.a
            key={activeArea}
            href={activeMeta.anchor}
            className="hero-area-detail"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-area-detail-text">{t(activeMeta.descKey)}</span>
            <span className="hero-area-detail-arrow" aria-hidden="true">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
