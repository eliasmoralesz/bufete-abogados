import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, ogImageForLang } from '../seoConfig';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import MigrationIntent from '../components/MigrationIntent';
import Testimonials from '../components/Testimonials';
import Appointment from '../components/Appointment';
import PapelesRegla from '../components/PapelesRegla';
import CTASection from '../components/CTASection';
import Contact from '../components/Contact';
import LocationSection from '../components/LocationSection';
import Footer from '../components/Footer';

const Home = ({ lang = 'es' }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const path = lang === 'en' ? '/en' : '/';
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogLocale = lang === 'en' ? 'en_US' : 'es_CR';
  const ogLocaleAlternate = lang === 'en' ? 'es_CR' : 'en_US';
  const ogImage = ogImageForLang(lang);

  return (
    <div>
      <Helmet>
        <title>{t('meta_title')}</title>
        <meta name="description" content={t('meta_description')} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="es" href={`${SITE_URL}/`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={t('meta_title')} />
        <meta property="og:description" content={t('meta_description')} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:locale:alternate" content={ogLocaleAlternate} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta_title')} />
        <meta name="twitter:description" content={t('meta_description')} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: 'Daguer Hernández',
            image: DEFAULT_OG_IMAGE,
            url: canonicalUrl,
            telephone: '+506-8965-5582',
            email: 'consulta@daguerhernandez.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'San José',
              addressRegion: 'San Sebastián',
              addressCountry: 'CR',
            },
            areaServed: 'Costa Rica',
            openingHours: 'Mo-Fr 08:00-18:00',
            sameAs: [
              'https://cr.linkedin.com/in/daguerhernandezvasquez',
              'https://www.instagram.com/daguerhernandezcr/',
              'https://www.facebook.com/dauberth',
              'https://www.tiktok.com/@daguerhernandezcr',
            ],
            knowsAbout: [
              'Derecho Civil',
              'Derecho Penal',
              'Derecho Laboral',
              'Derecho Notarial',
              'Derecho Registral',
              'Derecho Migratorio',
              'Residencia en Costa Rica',
              'Naturalización costarricense',
              'Refugio en Costa Rica',
              'DIMEX',
              'Permisos migratorios',
              'Regularización migratoria',
            ],
          })}
        </script>
      </Helmet>

      <TopBar />
      <Header />
      <Hero />
      <About />
      <Services />
      <MigrationIntent />
      <Appointment />
      <CTASection />
      <Testimonials />
      <Contact />
      <LocationSection />
      <PapelesRegla />
      <Footer />
    </div>
  );
};

export default Home;
