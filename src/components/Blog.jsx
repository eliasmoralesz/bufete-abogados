import React from 'react';
import { useTranslation } from 'react-i18next';
import './Blog.css';

const Blog = () => {
  const { t } = useTranslation();

  return (
    <section className="blog-section">
      <div className="blog-card" data-aos="fade-up">
        <h2 className="blog-title" data-aos="fade-up" data-aos-delay="100">Papeles en regla</h2>
        <p className="blog-description" data-aos="fade-up" data-aos-delay="200">
          Una columna escrita por el Lic. Daguer Hernández sobre derechos migratorios,
          publicada en el medio Confidencial.
        </p>
        <a
          href="https://confidencial.digital/migrantes/noticias/papeles-en-regla/"
          className="blog-button"
          target="_blank"
          rel="noopener noreferrer"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          Leer artículos
        </a>
      </div>
    </section>
  );
};

export default Blog;
