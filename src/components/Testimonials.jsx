import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Testimonials.css';

const reviews = [
  {
    name: 'Mari Vallejos',
    meta: '1 review',
    rating: 5,
    initials: 'MV',
    text: 'Excelente asesoria y abogado, super recomendado muy buen servicio.',
  },
  {
    name: 'José Manuel Terán Cordero',
    meta: '2 reviews',
    rating: 5,
    initials: 'JT',
    text: 'Muy buena atención y excelente abogado',
  },
  {
    name: 'Michael Wurm',
    meta: 'Local Guide · 272 reviews',
    rating: 5,
    initials: 'MW',
    text: 'He and his associates provide excellent services, not only as far as immigration services are concerned, but also for a multiplicity of other legal and notary services, such as representation of our corporation, and also my spouse and myself. […] He is a clear 10 out of 10 and I can totally second his work with a thumbs up for him and his team.',
  },
  {
    name: 'Alejandro Díaz Jiménez',
    meta: 'Local Guide · 106 reviews',
    rating: 5,
    initials: 'AD',
    text: 'Gracias por la colaboración y todo el apoyo. Recomiendo su trabajo.',
  },
];

const AUTO_ADVANCE_MS = 6000;
const SWIPE_THRESHOLD = 50;
const displayedReviews = [...reviews, ...reviews];
const googleReviewUrl = 'https://www.google.com/search?q=Daguer+Hernandez&ludocid=6725057967580669949#lrd=0x8fa0e36fe84dc86f:0x5d543497338e67fd,3';

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
            style={{ transform: `translateX(calc(-${index} * var(--testimonial-card-step)))` }}
          >
            {displayedReviews.map((review, i) => (
              <div
                className="testimonial-slide"
                key={`${review.name}-${i}`}
                aria-hidden={i >= reviews.length}
              >
                <div className="testimonial-card">
                  <div className="testimonial-rating" aria-label={`${review.rating} / 5`}>
                    <span className="testimonial-stars" aria-hidden="true">{'☆'.repeat(review.rating)}</span>
                    <span>{review.rating.toFixed(1)}</span>
                  </div>
                  <p className="testimonial-text">“{review.text}”</p>
                  <div className="testimonial-author">
                    <span className="testimonial-avatar" aria-hidden="true">{review.initials}</span>
                    <span>
                      <span className="testimonial-name">{review.name}</span>
                      <span className="testimonial-meta">{review.meta}</span>
                    </span>
                  </div>
                  <span className="testimonial-quote" aria-hidden="true">”</span>
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

      <div className="testimonials-review-actions">
        <p>{t('testimonials_review_prompt')}</p>
        <div className="testimonials-review-buttons">
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="testimonials-write-link"
          >
            {t('testimonials_write_review')}
          </a>
          <a
            href="https://maps.app.goo.gl/twiMemVxLYbTfmoMA"
            target="_blank"
            rel="noopener noreferrer"
            className="testimonials-google-link"
          >
            {t('testimonials_cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
