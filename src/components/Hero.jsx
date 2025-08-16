import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [0, windowSize.height], [10, -10]);
  const rotateY = useTransform(x, [0, windowSize.width], [-10, 10]);

  const moveSmall = useTransform(x, [0, windowSize.width], [-10, 10]);
  const moveMedium = useTransform(x, [0, windowSize.width], [-20, 20]);
  const moveLarge = useTransform(x, [0, windowSize.width], [-30, 30]);

  const handleMouseMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="hero" onMouseMove={handleMouseMove}>
      <video autoPlay muted loop playsInline className="hero-video" aria-hidden="true">
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />

      <motion.div
        className="hero-card"
        drag
        dragElastic={0.08}
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        whileTap={{ scale: 0.98 }}
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
      >
        <motion.h1 style={{ x: moveLarge }}>{t('hero_title')}</motion.h1>
        <motion.p style={{ x: moveMedium }}>{t('hero_subtitle')}</motion.p>
        <motion.span className="tagline" style={{ x: moveSmall }}>
          {t('hero_tagline')}
        </motion.span>

        <motion.div className="hero-buttons" style={{ x: moveSmall }}>
          <motion.a
            href="#contact"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ir a sección de contacto"
          >
            {t('contact')}
          </motion.a>

          <motion.a
            href="#services"
            className="btn btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ir a sección de servicios"
          >
            {t('services')}
          </motion.a>
        </motion.div>
      </motion.div>

      <a href="#about" className="scroll-down" aria-label="Saltar a Sobre Mí">↓ {t('about')}</a>
    </section>
  );
};

export default Hero;
