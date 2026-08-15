import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';
import { SITE_URL, SITE_NAME, ogImageForLang } from '../seoConfig';
import { blogArticles } from '../content/blogArticles';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Blog.css';

const Blog = ({ lang = 'es' }) => {
  const { t, i18n } = useTranslation();
  const prefix = lang === 'en' ? '/en' : '';

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    window.scrollTo(0, 0);
  }, [lang, i18n]);

  const path = lang === 'en' ? '/en/blog' : '/blog';
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImage = ogImageForLang(lang);

  return (
    <>
      <Helmet>
        <title>{t('blog_metaTitle')}</title>
        <meta name="description" content={t('blog_metaDescription')} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/blog`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/blog`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/blog`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={t('blog_metaTitle')} />
        <meta property="og:description" content={t('blog_metaDescription')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('blog_metaTitle')} />
        <meta name="twitter:description" content={t('blog_metaDescription')} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <TopBar />
      <Header forceScrolled />

      <main id="main-content" tabIndex={-1} className="blog-index-section">
        <div className="blog-index-container" data-aos="fade-up">
          {/* Vuelve a la sección "Papeles en Regla" del Home, no al tope de
              la página — mismo criterio que ya se aplicó en GuidePage.jsx
              (Home.jsx hace scroll al elemento que coincide con el hash). */}
          <Link to={`${prefix}/#papeles`} className="blog-back-link">
            <FaArrowLeft aria-hidden="true" /> {t('blog_backToHome')}
          </Link>

          <span className="blog-eyebrow">{t('blog_eyebrow')}</span>
          <h1 className="blog-index-title">{t('blog_title')}</h1>
          <p className="blog-index-subtitle">{t('blog_subtitle')}</p>

          <div className="blog-index-grid">
            {blogArticles.map((article) => {
              const content = article[lang];
              const href = `${prefix}/blog/${article.slug[lang]}`;

              return (
                <article className="blog-index-card" key={article.id} data-aos="fade-up">
                  <Link to={href} className="blog-index-card-image">
                    <img src={article.image} alt={content.imageAlt} loading="lazy" />
                  </Link>
                  <div className="blog-index-card-body">
                    <h2>
                      <Link to={href}>{content.title}</Link>
                    </h2>
                    <p>{content.dek}</p>
                    <Link to={href} className="blog-index-card-link">
                      {t('blog_readMore')}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
