import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { blogArticles } from '../content/blogArticles';
import './PapelesRegla.css';

// Los 3 artículos ahora viven en el sitio (ver src/content/blogArticles.js), adaptados
// de la columna "Papeles en Regla" que Daguer escribe para Confidencial — antes esta
// sección solo enlazaba afuera; ahora enlaza a las páginas propias del blog.
const articles = blogArticles;

const PapelesRegla = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'es';
  const prefix = lang === 'en' ? '/en' : '';
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
            const href = `${prefix}/blog/${article.slug[lang]}`;

            return (
              <article className="article-card" key={article.id}>
                <Link
                  to={href}
                  className="article-image-link"
                  aria-label={t('papelesRegla_readArticle', { title })}
                >
                  <img src={article.image} alt={t(`papelesRegla_article${article.id}_imageAlt`)} loading="lazy" />
                </Link>
                <div className="article-card-content">
                  <span className="article-source">{t('papelesRegla_source')}</span>
                  <h3>{title}</h3>
                  <p>{t(`papelesRegla_article${article.id}_desc`)}</p>
                </div>
                <Link to={href}>{t('papelesRegla_readMore')}</Link>
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
                key={article.id}
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

      <Link to={`${prefix}/blog`} className="papeles-main-link">
        {t('papelesRegla_viewAll')}
      </Link>
    </section>
  );
};

export default PapelesRegla;
