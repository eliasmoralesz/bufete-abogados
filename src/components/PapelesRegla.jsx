import React, { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './PapelesRegla.css';

const papelesReglaUrl = 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/';

const articles = [
  {
    title: 'Permanencia legal en Costa Rica: guía completa para turistas o extranjeros',
    description: 'Guía sobre la permanencia legal, la condición migratoria regular y los requisitos básicos para turistas o personas extranjeras en Costa Rica.',
    url: 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/permanencia-legal-en-costa-rica-guia-completa-para-turistas-o-extranjeros/',
    image: 'https://confidencial.digital/wp-content/uploads/2025/03/Aeropuerto-Liberia-Costa-Rica.jpg',
    imageAlt: 'Puesto migratorio en aeropuerto de Costa Rica',
  },
  {
    title: '¿Cómo regresar a Costa Rica tras migrar a Estados Unidos?',
    description: 'Consejos y reflexiones para personas migrantes que deben salir de Estados Unidos y valorar su retorno a Costa Rica.',
    url: 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/como-regresar-a-costa-rica-tras-migrar-a-estados-unidos/',
    image: 'https://confidencial.digital/wp-content/uploads/2025/02/aeropuerto-juan-santamaria.jpg',
    imageAlt: 'Aeropuerto Juan Santamaría en Costa Rica',
  },
  {
    title: 'El derecho de los solicitantes de refugio que quieren optar por naturalización en Costa Rica',
    description: 'Análisis sobre el tiempo de permanencia de solicitantes de refugio y su relación con procesos de naturalización.',
    url: 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/el-derecho-de-los-solicitantes-de-refugio-que-quieren-optar-por-naturalizacion-en-costa-rica/',
    image: 'https://confidencial.digital/wp-content/uploads/2025/02/DIMEX.jpg',
    imageAlt: 'Documento DIMEX de Costa Rica',
  },
];

const PapelesRegla = () => {
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
      <span className="papeles-eyebrow">Blog migratorio</span>
      <h2>Papeles en Regla</h2>
      <p className="subtitle">Columna del Lic. Daguer Hernández en el medio Confidencial</p>

      <div className="articles-carousel">
        <div
          className="articles-container"
          style={{ '--active-article': activeArticle }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {articles.map((article) => (
            <article className="article-card" key={article.url}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-image-link"
                aria-label={`Leer artículo: ${article.title}`}
              >
                <img src={article.image} alt={article.imageAlt} loading="lazy" />
              </a>
              <div className="article-card-content">
                <span className="article-source">Confidencial</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Leer artículo completo →
              </a>
            </article>
          ))}
        </div>

        <div className="article-carousel-controls" aria-label="Controles del blog">
          <button
            type="button"
            className="article-carousel-arrow"
            onClick={() => goToArticle(activeArticle - 1)}
            aria-label="Artículo anterior"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>

          <div className="article-carousel-dots" role="tablist" aria-label="Artículos destacados">
            {articles.map((article, index) => (
              <button
                type="button"
                key={article.url}
                className={`article-carousel-dot${activeArticle === index ? ' active' : ''}`}
                onClick={() => goToArticle(index)}
                aria-label={`Ver artículo ${index + 1}`}
                aria-selected={activeArticle === index}
              />
            ))}
          </div>

          <button
            type="button"
            className="article-carousel-arrow"
            onClick={() => goToArticle(activeArticle + 1)}
            aria-label="Artículo siguiente"
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
        Ver todos los artículos en Confidencial
      </a>
    </section>
  );
};

export default PapelesRegla;
