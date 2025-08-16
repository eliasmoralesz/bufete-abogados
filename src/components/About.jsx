import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import lawyerImage from '../assets/lawyer.png';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  const vantaRef = useRef(null);
  const sectionRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const waitForVanta = setInterval(() => {
      if (!vantaEffect && window.VANTA?.DOTS && vantaRef.current) {
        const effect = window.VANTA.DOTS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x0a1f44, // azul oscuro
          color: 0xd4af37,           // dorado
          color2: 0xffffff,          // blanco
          spacing: 50.0,
          showLines: false,
        });
        setVantaEffect(effect);
        clearInterval(waitForVanta);
      }
    }, 200);

    return () => {
      clearInterval(waitForVanta);
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

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
          <h2>{t('hero_aboutTitle')}</h2>
          <p className="subtitle">{t('hero_aboutSubtitle')}</p>
          <p className="description">
            {t('hero_aboutDescription', { name: 'Daguer Hernandez' })}
          </p>
          <Link to="/about-details" className="about-link">
            {t('moreAbout')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
