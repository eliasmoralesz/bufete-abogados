import React, { useRef, useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import heroVideo from '../assets/hero-justice.mp4';
import heroPoster from '../assets/hero-justice-poster.webp';
import './Hero.css';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const unsubscribe = scrollYProgress.onChange((progress) => {
      if (video.duration) {
        video.currentTime = progress * video.duration;
      }
    });

    return unsubscribe;
  }, [scrollYProgress]);

  const titlePre = t('hero_title_pre');
  const titlePost = t('hero_title_post');
  const heroWords = useMemo(() => [
    t('hero_title_word_migration'),
    t('hero_title_word_notarial'),
    t('hero_title_word_registral'),
  ], [i18n.language, t]);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState(heroWords[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setWordIndex(0);
    setDisplayWord(heroWords[0]);
    setIsDeleting(false);
  }, [heroWords, i18n.language]);

  useEffect(() => {
    const currentWord = heroWords[wordIndex] || heroWords[0];
    const isComplete = displayWord === currentWord;
    const isEmpty = displayWord === '';

    const delay = isComplete && !isDeleting ? 2400 : isDeleting ? 28 : 48;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % heroWords.length);
        return;
      }

      const nextLength = displayWord.length + (isDeleting ? -1 : 1);
      setDisplayWord(currentWord.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [displayWord, heroWords, isDeleting, wordIndex]);

  return (
    <section className="hero" ref={heroRef}>
      <motion.div className="hero-video-wrap" style={{ y: videoY }}>
        <video
          ref={videoRef}
          className="hero-video"
          muted
          playsInline
          preload="auto"
          poster={heroPoster}
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-text">
          <motion.div
            className="hero-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hero-kicker-line" aria-hidden="true" />
            <span>{t('hero_kicker')}</span>
          </motion.div>

          <motion.h1
            aria-label={t('hero_title')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {titlePre && <>{titlePre} </>}
            <em className="hero-typed-word" aria-hidden="true">
              <span>{displayWord}</span>
            </em>
            {titlePost && <> {titlePost}</>}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {t('hero_subtitle')}
          </motion.p>

          <motion.span
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('hero_tagline')}
          </motion.span>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a href="#appointment" className="btn btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              {t('cta_button')}
            </motion.a>
            <motion.a href="#services" className="btn btn-outline" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              {t('services')}
            </motion.a>
          </motion.div>
        </div>

        <div className="hero-stats">
          <motion.div className="hero-stat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <span className="hero-stat-number">+12</span>
            <span className="hero-stat-label">{t('hero_stat_years')}</span>
          </motion.div>
          <motion.div className="hero-stat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <span className="hero-stat-number">1000+</span>
            <span className="hero-stat-label">{t('hero_stat_cases')}</span>
          </motion.div>
          <motion.div className="hero-stat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
            <span className="hero-stat-number">95%</span>
            <span className="hero-stat-label">{t('hero_stat_success')}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
