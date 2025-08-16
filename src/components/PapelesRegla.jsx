import React from 'react';
import './PapelesRegla.css';

const PapelesRegla = () => {
  return (
    <section id="papeles" className="papeles-section">
      <h2>Papeles en Regla</h2>
      <p className="subtitle">Columna del Lic. Daguer Hernández en el medio Confidencial</p>

      <div className="articles-container">
        <div className="article-card">
          <h3>¿Trámites migratorios sin citas?</h3>
          <p>Una crítica directa a los obstáculos que enfrentan las personas migrantes para agendar citas en la Dirección General de Migración.</p>
          <a
            href="https://confidencial.digital/migrantes/noticias/papeles-en-regla/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leer artículo completo →
          </a>
        </div>

        <div className="article-card">
          <h3>El limbo de los solicitantes de refugio</h3>
          <p>Reflexión sobre la falta de respuesta del Estado costarricense ante miles de personas que esperan resolución migratoria.</p>
          <a
            href="https://confidencial.digital/migrantes/noticias/el-limbo-de-los-solicitantes-de-refugio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leer artículo completo →
          </a>
        </div>

        <div className="article-card">
          <h3>La irregularidad no es sinónimo de delito</h3>
          <p>Explicación jurídica sobre por qué la condición migratoria irregular no debería ser criminalizada ni estigmatizada.</p>
          <a
            href="https://confidencial.digital/migrantes/noticias/la-irregularidad-no-es-sinonimo-de-delito/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leer artículo completo →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PapelesRegla;
