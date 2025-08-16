import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
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
      <TopBar />
      <Header />
      <Hero />
      <About />
      <Services />
      <Blog />
      <CTASection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
