import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Testimonials.css';

const reviews = [
  {
    name: 'Mari Vallejos',
    meta: '1 review',
    rating: 5,
    text: 'Excelente asesoria y abogado, super recomendado muy buen servicio.',
  },
  {
    name: 'José Manuel Terán Cordero',
    meta: '2 reviews',
    rating: 5,
    text: 'Muy buena atención y excelente abogado',
  },
  {
    name: 'Michael Wurm',
    meta: 'Local Guide · 272 reviews',
    rating: 5,
    text: 'He and his associates provide excellent services, not only as far as immigration services are concerned, but also for a multiplicity of other legal and notary services, such as representation of our corporation, and also my spouse and myself. […] He is a clear 10 out of 10 and I can totally second his work with a thumbs up for him and his team.',
  },
  {
    name: 'Alejandro Díaz Jiménez',
    meta: 'Local Guide · 106 reviews',
    rating: 5,
    text: 'Gracias por la colaboración y todo el apoyo. Recomiendo su trabajo.',
  },
];

const AUTO_ADVANCE_MS = 6000;
const SWIPE_THRESHOLD = 50;

const Testimonials = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  const goTo = useCallback((i) => {
    setIndex(((i % reviews.length) + reviews.length) % reviews.length);
  }, []);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused) return undefined;
    // Depende de `index`: cada cambio (manual o automático) reinicia el
    // temporizador, dando siempre el intervalo completo de lectura.
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, index]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <h2 data-aos="fade-up">{t('testimonials')}</h2>
      <p className="testimonials-subtitle" data-aos="fade-up" data-aos-delay="100">
        {t('testimonials_subtitle')}
      </p>

      <div
        className="testimonials-viewport"
        data-aos="fade-up"
        data-aos-delay="150"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <button
          type="button"
          className="testimonials-arrow prev"
          aria-label="Reseña anterior"
          onClick={goPrev}
        >
          <FaChevronLeft aria-hidden="true" />
        </button>

        <div
          className="testimonials-carousel"
          aria-live="polite"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="testimonials-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {reviews.map((review) => (
              <div className="testimonial-slide" key={review.name}>
                <div className="testimonial-card">
                  <div className="testimonial-stars" aria-label={`${review.rating} / 5`}>
                    {'★'.repeat(review.rating)}
                  </div>
                  <p className="testimonial-text">“{review.text}”</p>
                  <div className="testimonial-author">
                    <span className="testimonial-name">{review.name}</span>
                    <span className="testimonial-meta">{review.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="testimonials-arrow next"
          aria-label="Reseña siguiente"
          onClick={goNext}
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="testimonials-dots" role="tablist" aria-label="Reseñas">
        {reviews.map((review, i) => (
          <button
            type="button"
            key={review.name}
            className={`testimonials-dot ${i === index ? 'active' : ''}`}
            aria-label={`Ver reseña ${i + 1}`}
            aria-selected={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <a
        href="https://maps.app.goo.gl/twiMemVxLYbTfmoMA"
        target="_blank"
        rel="noopener noreferrer"
        className="testimonials-google-link"
        data-aos="fade-up"
      >
        {t('testimonials_cta')}
      </a>
    </section>
  );
};

export default Testimonials;
