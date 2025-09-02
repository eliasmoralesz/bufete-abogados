import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- IMPORTAR

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Appointment from '../components/Appointment';
import Blog from '../components/Blog';
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
          content="Especialista en derecho migratorio y notarial en Costa Rica con más de 10 años de experiencia. Asesoría clara y resultados reales para sus trámites. Over 10 years of experience. Contact Immigration Attorney Daguer Hernández." 
        />
      </Helmet>
      
      <TopBar />
      <Header />
      <Hero />
      <About />
      <Services />
      <Appointment />
      <Blog />
      <CTASection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;