import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Services />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;