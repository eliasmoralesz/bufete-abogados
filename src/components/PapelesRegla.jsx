import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './PapelesRegla.css';

const papelesReglaUrl = 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/';

// El título/descripción de cada artículo se traduce (ver i18n.js, papelesRegla_articleN_*)
// como copy de UI — el artículo en sí solo existe en español en Confidencial, el link
// siempre lleva ahí sin importar el idioma del sitio.
const articles = [
  {
    id: 1,
    url: 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/permanencia-legal-en-costa-rica-guia-completa-para-turistas-o-extranjeros/',
    image: 'https://confidencial.digital/wp-content/uploads/2025/03/Aeropuerto-Liberia-Costa-Rica.jpg',
  },
  {
    id: 2,
    url: 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/como-regresar-a-costa-rica-tras-migrar-a-estados-unidos/',
    image: 'https://confidencial.digital/wp-content/uploads/2025/02/aeropuerto-juan-santamaria.jpg',
  },
  {
    id: 3,
    url: 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/el-derecho-de-los-solicitantes-de-refugio-que-quieren-optar-por-naturalizacion-en-costa-rica/',
    image: 'https://confidencial.digital/wp-content/uploads/2025/02/DIMEX.jpg',
  },
];

const PapelesRegla = () => {
  const { t } = useTranslation();
  const [activeArticle, setActiveArticle] = useState(0);
  const touchStartX = useRef(null);

  const goToArticle = (index) => {
    const nextIndex = (index + articles.length) % articles.length;
    setActiveArticle(nextIndex);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const deltaX = touchStartX.current - event.changedTouches[0].clientX;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 42) return;
    goToArticle(activeArticle + (deltaX > 0 ? 1 : -1));
  };

  return (
    <section id="papeles" className="papeles-section">
      <span className="papeles-eyebrow">{t('papelesRegla_eyebrow')}</span>
      <h2>{t('papelesRegla_title')}</h2>
      <p className="subtitle">{t('papelesRegla_subtitle')}</p>

      <div className="articles-carousel">
        <div
          className="articles-container"
          style={{ '--active-article': activeArticle }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {articles.map((article) => {
            const title = t(`papelesRegla_article${article.id}_title`);

            return (
              <article className="article-card" key={article.url}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-image-link"
                  aria-label={t('papelesRegla_readArticle', { title })}
                >
                  <img src={article.image} alt={t(`papelesRegla_article${article.id}_imageAlt`)} loading="lazy" />
                </a>
                <div className="article-card-content">
                  <span className="article-source">{t('papelesRegla_source')}</span>
                  <h3>{title}</h3>
                  <p>{t(`papelesRegla_article${article.id}_desc`)}</p>
                </div>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {t('papelesRegla_readMore')}
                </a>
              </article>
            );
          })}
        </div>

        <div className="article-carousel-controls" aria-label={t('papelesRegla_controlsLabel')}>
          <button
            type="button"
            className="article-carousel-arrow"
            onClick={() => goToArticle(activeArticle - 1)}
            aria-label={t('papelesRegla_prevArticle')}
          >
            <FaChevronLeft aria-hidden="true" />
          </button>

          <div className="article-carousel-dots" role="tablist" aria-label={t('papelesRegla_dotsLabel')}>
            {articles.map((article, index) => (
              <button
                type="button"
                key={article.url}
                className={`article-carousel-dot${activeArticle === index ? ' active' : ''}`}
                onClick={() => goToArticle(index)}
                aria-label={t('papelesRegla_viewArticle', { n: index + 1 })}
                aria-selected={activeArticle === index}
              />
            ))}
          </div>

          <button
            type="button"
            className="article-carousel-arrow"
            onClick={() => goToArticle(activeArticle + 1)}
            aria-label={t('papelesRegla_nextArticle')}
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <a
        href={papelesReglaUrl}
        className="papeles-main-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('papelesRegla_viewAll')}
      </a>
    </section>
  );
};

export default PapelesRegla;
