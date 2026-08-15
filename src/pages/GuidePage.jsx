import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';
import { SITE_URL, SITE_NAME } from '../seoConfig';
import { GUIDE_PATHS, guideContent } from '../content/migrationGuides';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Blog.css';
import './GuidePage.css';

// Página-guía genérica, reutilizada por las 4 guías de trámites (CETC,
// Residencia, Naturalización, Refugio) — antes cada una hubiera sido su
// propio componente casi idéntico. Contenido y rutas ES/EN viven en
// src/content/migrationGuides.js — ver ese archivo para el porqué de cada
// decisión de contenido (texto exacto de Daguer en español, traducción
// autorizada al inglés, por qué no vive en blogArticles.js).
const GuidePage = ({ guideKey, lang = 'es' }) => {
  const content = guideContent[guideKey][lang];
  const paths = GUIDE_PATHS[guideKey];
  const prefix = lang === 'en' ? '/en' : '';
  const canonicalUrl = `${SITE_URL}${paths[lang]}`;

  useEffect(() => {
    document.documentElement.lang = lang;
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <>
      <Helmet>
        <title>{`${content.seoTitle} | ${SITE_NAME}`}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}${paths.es}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}${paths.en}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${paths.es}`} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={content.seoTitle} />
        <meta name="twitter:description" content={content.seoDescription} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: content.pageTitle,
            description: content.seoDescription,
            inLanguage: lang,
            mainEntityOfPage: canonicalUrl,
            author: {
              '@type': 'Person',
              name: 'Daguer Hernández',
              url: `${SITE_URL}${prefix}/about-details`,
            },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/DH-favicon.png`,
              },
            },
          })}
        </script>
      </Helmet>

      <TopBar />
      <Header forceScrolled />

      <main id="main-content" tabIndex={-1} className="blog-article-section">
        <div className="blog-article-container" data-aos="fade-up">
          <Link to={prefix || '/'} className="blog-back-link">
            <FaArrowLeft aria-hidden="true" /> {content.backLabel}
          </Link>

          <h1 className="blog-article-title">{content.pageTitle}</h1>
          <p className="blog-article-dek">{content.seoDescription}</p>

          <div className="blog-article-body guide-body">
            {content.body.map((block, index) => {
              if (block.type === 'h2') return <h2 key={index}>{block.text}</h2>;
              if (block.type === 'h3') return <h3 key={index}>{block.text}</h3>;
              if (block.type === 'warning') return <p key={index} className="guide-warning">{block.text}</p>;
              if (block.type === 'quote') return <blockquote key={index} className="guide-quote">{block.text}</blockquote>;
              if (block.type === 'ul') {
                return (
                  <ul key={index}>
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{block.text}</p>;
            })}
          </div>

          <p className="blog-article-source guide-disclaimer">{content.disclaimer}</p>

          <div className="blog-article-cta">
            <h3>{content.ctaTitle}</h3>
            <p>{content.ctaText}</p>
            <a href={`${prefix}/#appointment`} className="blog-article-cta-button">
              {content.ctaButton}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GuidePage;
