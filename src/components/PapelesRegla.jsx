import React from 'react';
import './PapelesRegla.css';

const papelesReglaUrl = 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/';

const articles = [
  {
    title: 'Permanencia legal en Costa Rica: guía completa para turistas o extranjeros',
    description: 'Guía sobre la permanencia legal, la condición migratoria regular y los requisitos básicos para turistas o personas extranjeras en Costa Rica.',
    url: 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/permanencia-legal-en-costa-rica-guia-completa-para-turistas-o-extranjeros/',
  },
  {
    title: '¿Cómo regresar a Costa Rica tras migrar a Estados Unidos?',
    description: 'Consejos y reflexiones para personas migrantes que deben salir de Estados Unidos y valorar su retorno a Costa Rica.',
    url: 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/como-regresar-a-costa-rica-tras-migrar-a-estados-unidos/',
  },
  {
    title: 'El derecho de los solicitantes de refugio que quieren optar por naturalización en Costa Rica',
    description: 'Análisis sobre el tiempo de permanencia de solicitantes de refugio y su relación con procesos de naturalización.',
    url: 'https://confidencial.digital/migrantes/migrantes-noticias/papeles-en-regla/el-derecho-de-los-solicitantes-de-refugio-que-quieren-optar-por-naturalizacion-en-costa-rica/',
  },
];

const PapelesRegla = () => {
  return (
    <section id="papeles" className="papeles-section">
      <h2>Papeles en Regla</h2>
      <p className="subtitle">Columna del Lic. Daguer Hernández en el medio Confidencial</p>

      <div className="articles-container">
        {articles.map((article) => (
          <article className="article-card" key={article.url}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Leer artículo completo →
            </a>
          </article>
        ))}
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
