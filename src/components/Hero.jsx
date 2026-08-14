import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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
// Movimiento/interacción (spec original del wireframe E, implementados aquí):
// 1) el titular entra letra por letra al cargar.
// 2) el retrato responde con un ligero paralaje al mover el cursor.
// 3) el contador 01–04 avanza según el scroll dentro del hero.

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.018 } },
};

const charVariants = {
  hidden: { opacity: 0, y: '0.4em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Divide el texto en spans animados letra por letra. Los espacios se preservan
// con un carácter de espacio duro para que no colapsen entre spans inline-block.
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
      <motion.span
        key={i}
        variants={charVariants}
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? ' ' : char}
      </motion.span>
    ))}
  </motion.span>
);

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const portraitRef = useRef(null);

  const whatsappHref = 'https://wa.me/50689655582?text=Hola%20Daguer,%20quiero%20agendar%20una%20consulta';

  const pre = t('hero_ed_pre');
  const mid = `${t('hero_ed_wordA')}${t('hero_ed_wordB')}`;
  const post = t('hero_ed_post');
  const fullTitle = `${pre} ${mid}. ${post}`;

  // --- Paralaje suave con el cursor sobre el retrato ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.4 });
  const portraitX = useTransform(springX, [-0.5, 0.5], ['-14px', '14px']);
  const portraitY = useTransform(springY, [-0.5, 0.5], ['-10px', '10px']);

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

  // --- Contador 01–04 avanza con el scroll dentro del hero ---
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const counterProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const activeIndex = useTransform(scrollYProgress, (v) => Math.min(3, Math.floor(v * 4)));

  return (
    <section className="hero" ref={heroRef}>
      <motion.div
        className="hero-bg"
        aria-hidden="true"
        style={{ x: portraitX, y: portraitY }}
      >
        <img ref={portraitRef} src={lawyerImage} alt="" loading="eager" />
      </motion.div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <h1 className="hero-headline" aria-label={fullTitle}>
          <AnimatedLine text={pre} className="hl-line" delay={0} />
          <AnimatedLine text={mid} className="hl-line" delay={pre.length * 0.018 + 0.1} />
          <AnimatedLine text={post} className="hl-line hl-dim" delay={(pre.length + mid.length) * 0.018 + 0.2} />
        </h1>

        <motion.div
          className="hero-foot"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
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
            <HeroCounter activeIndex={activeIndex} />
            <div className="hc-track"><motion.span className="hc-fill" style={{ width: useTransform(counterProgress, (v) => `${25 + v * 0.75}%`) }} /></div>
            <div className="hc-label">{t('hero_ed_areas')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Componente aparte para poder suscribirse al motion value `activeIndex` sin
// re-renderizar todo el Hero en cada frame de scroll.
const HeroCounter = ({ activeIndex }) => {
  const [active, setActive] = React.useState(0);

  useEffect(() => activeIndex.on('change', (v) => setActive(v)), [activeIndex]);

  return (
    <div className="hc-nums">
      {['01', '02', '03', '04'].map((n, i) => (
        <span key={n} className={i === active ? 'active' : ''}>{n}</span>
      ))}
    </div>
  );
};

export default Hero;
