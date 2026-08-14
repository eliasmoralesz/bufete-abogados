import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import lawyerImage from '../assets/lawyer.webp';
import './About.css';

const About = () => {
  const { t, i18n } = useTranslation();
  const prefix = i18n.language === 'en' ? '/en' : '';
  const vantaRef = useRef(null);
  const sectionRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldStartVanta, setShouldStartVanta] = useState(false);

  useEffect(() => {
    if (!shouldStartVanta || vantaEffect) return undefined;

    let attempts = 0;
    const maxAttempts = 30;

    const waitForVanta = window.setInterval(() => {
      attempts += 1;

      if (window.VANTA?.DOTS && vantaRef.current) {
        const effect = window.VANTA.DOTS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x1a1a18,
          color: 0xf0ede6,           // crema — tema editorial oscuro, sin dorado
          color2: 0x4a4842,
          spacing: 50.0,
          showLines: false,
        });
        setVantaEffect(effect);
        window.clearInterval(waitForVanta);
      }

      if (attempts >= maxAttempts) {
        window.clearInterval(waitForVanta);
      }
    }, 200);

    return () => {
      window.clearInterval(waitForVanta);
    };
  }, [shouldStartVanta, vantaEffect]);

  useEffect(() => (
    () => {
      if (vantaEffect) vantaEffect.destroy();
    }
  ), [vantaEffect]);

  useEffect(() => {
    const target = vantaRef.current;
    if (!target || shouldStartVanta) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldStartVanta(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px', threshold: 0.12 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldStartVanta]);

  useEffect(() => {
    const target = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <section id="about" className="about-section" ref={vantaRef}>
      <motion.div
        className="about-content"
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="about-image">
          <img src={lawyerImage} alt="Perfil del Abogado" />
        </div>
        <div className="about-text">
          <span className="about-eyebrow">
            <span className="about-eyebrow-num">03</span> — {t('about')}
          </span>
          <h2>{t('hero_aboutTitle')}</h2>
          <p className="subtitle">{t('hero_aboutSubtitle')}</p>
          <p className="description">
            {t('hero_aboutDescription', { name: 'Daguer Hernandez' })}
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">+12</span>
              <span className="about-stat-label">{t('hero_stat_years')}</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">1000+</span>
              <span className="about-stat-label">{t('hero_stat_cases')}</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">95%</span>
              <span className="about-stat-label">{t('hero_stat_success')}</span>
            </div>
          </div>

          <Link to={`${prefix}/about-details`} className="about-link">
            {t('moreAbout')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
