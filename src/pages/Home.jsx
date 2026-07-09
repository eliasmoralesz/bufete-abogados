import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- IMPORTAR
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../seoConfig';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Appointment from '../components/Appointment';
import PapelesRegla from '../components/PapelesRegla';
import CTASection from '../components/CTASection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      {/* AÑADIR ESTE BLOQUE */}
      <Helmet>
        <title>Abogado Migratorio en Costa Rica | Immigration Attorney | Daguer Hernández</title>
        <meta
          name="description"
          content="Especialista en derecho migratorio y notarial en Costa Rica con más de 12 años de experiencia. Asesoría clara y resultados reales para sus trámites. Over 12 years of experience. Contact Immigration Attorney Daguer Hernández."
        />
        <link rel="canonical" href={`${SITE_URL}/`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content="Abogado Migratorio en Costa Rica | Daguer Hernández" />
        <meta property="og:description" content="Especialista en derecho migratorio y notarial en Costa Rica con más de 12 años de experiencia. Asesoría clara y resultados reales para sus trámites." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="es_CR" />
        <meta property="og:locale:alternate" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Abogado Migratorio en Costa Rica | Daguer Hernández" />
        <meta name="twitter:description" content="Especialista en derecho migratorio y notarial en Costa Rica con más de 12 años de experiencia." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Attorney',
            name: 'Daguer Hernández',
            image: DEFAULT_OG_IMAGE,
            url: `${SITE_URL}/`,
            telephone: '+506-8703-3868',
            email: 'consulta@daguerhernandez.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'San José',
              addressRegion: 'Barrio Luján',
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
            ],
          })}
        </script>
      </Helmet>

      <TopBar />
      <Header />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Appointment />
      <PapelesRegla />
      <CTASection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;