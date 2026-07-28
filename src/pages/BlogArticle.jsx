import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';
import { SITE_URL, SITE_NAME, ogImageForLang } from '../seoConfig';
import { getArticleBySlug } from '../content/blogArticles';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Blog.css';

const BLOG_PUBLISH_DATE = '2026-07-27';

const BlogArticle = ({ lang = 'es' }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const prefix = lang === 'en' ? '/en' : '';
  const article = getArticleBySlug(lang, slug);

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    window.scrollTo(0, 0);
  }, [lang, i18n, slug]);

  useEffect(() => {
    if (!article) {
      navigate(`${prefix}/blog`, { replace: true });
    }
  }, [article, navigate, prefix]);

  if (!article) return null;

  const content = article[lang];
  const path = `${prefix}/blog/${article.slug[lang]}`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImage = ogImageForLang(lang);
  const sourceDate = lang === 'en' ? article.source.dateEn : article.source.dateEs;

  return (
    <>
      <Helmet>
        <title>{`${content.title} | ${SITE_NAME}`}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/blog/${article.slug.es}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/blog/${article.slug.en}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/blog/${article.slug.es}`} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={article.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.title} />
        <meta name="twitter:description" content={content.metaDescription} />
        <meta name="twitter:image" content={article.image} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: content.title,
            description: content.metaDescription,
            image: article.image,
            datePublished: BLOG_PUBLISH_DATE,
            dateModified: BLOG_PUBLISH_DATE,
            inLanguage: lang === 'en' ? 'en' : 'es',
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

      <section className="blog-article-section">
        <div className="blog-article-container" data-aos="fade-up">
          <Link to={`${prefix}/blog`} className="blog-back-link">
            <FaArrowLeft aria-hidden="true" /> {t('blog_backToBlog')}
          </Link>

          <h1 className="blog-article-title">{content.title}</h1>
          <p className="blog-article-dek">{content.dek}</p>

          <img
            src={article.image}
            alt={content.imageAlt}
            className="blog-article-image"
            loading="lazy"
          />

          <div className="blog-article-body">
            {content.body.map((block, index) => {
              if (block.type === 'h2') {
                return <h2 key={index}>{block.text}</h2>;
              }
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

          <p className="blog-article-source">
            <Trans i18nKey="blog_sourceAttribution" values={{ date: sourceDate }} />{' '}
            <a href={article.source.url} target="_blank" rel="noopener noreferrer">
              {t('blog_sourceLinkText')}
            </a>
          </p>

          <div className="blog-article-cta">
            <h3>{t('blog_ctaTitle')}</h3>
            <p>{t('blog_ctaText')}</p>
            <a href={`${prefix}/#appointment`} className="blog-article-cta-button">
              {t('blog_ctaButton')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogArticle;
