import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBalanceScale } from 'react-icons/fa';
import lawyerPhoto from '../assets/lawyer.webp';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const moveX = useTransform(x, [0, windowSize.width], [-10, 10]);
  const moveY = useTransform(y, [0, windowSize.height], [-8, 8]);

  const handleMouseMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const titlePre = t('hero_title_pre');
  const titlePost = t('hero_title_post');

  return (
    <section className="hero" onMouseMove={handleMouseMove}>
      <div className="hero-bg" aria-hidden="true" />
      <span className="hero-watermark" aria-hidden="true">{t('hero_watermark')}</span>

      <div className="hero-content">
        <div className="hero-text">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaBalanceScale aria-hidden="true" />
            {t('hero_badge')}
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            {titlePre && <>{titlePre} </>}
            <em>{t('hero_title_highlight')}</em>
            {titlePost && <> {titlePost}</>}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            {t('hero_subtitle')}
          </motion.p>

          <motion.span
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {t('hero_tagline')}
          </motion.span>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <motion.a href="#appointment" className="btn btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              {t('cta_button')}
            </motion.a>
            <motion.a href="#services" className="btn btn-outline" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              {t('services')}
            </motion.a>
          </motion.div>
        </div>

        <div className="hero-visual">
          <div className="hero-arch" aria-hidden="true" />
          <motion.div
            className="hero-photo-frame"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <img src={lawyerPhoto} alt="Daguer Hernández, abogado" className="hero-photo" />
          </motion.div>

          <motion.a
            href="#testimonials"
            className="hero-review-badge"
            style={{ x: moveX, y: moveY }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="hero-review-stars">★★★★★</span>
            <span>5.0 · {t('hero_review_badge')}</span>
          </motion.a>
        </div>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <span className="hero-stat-number">+12</span>
          <span className="hero-stat-label">{t('hero_stat_years')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number">1000+</span>
          <span className="hero-stat-label">{t('hero_stat_cases')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-number">95%</span>
          <span className="hero-stat-label">{t('hero_stat_success')}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
