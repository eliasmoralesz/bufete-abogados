import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutDetails from './components/AboutDetails'; // Ruta corregida
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import WhatsAppButton from './components/WhatsAppButton';
import SkipLink from './components/SkipLink';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // duración de la animación en milisegundos
      once: false,    // ❗ hace que la animación se repita cada vez que entra en pantalla
    });
  }, []);

  return (
    <Router>
      <SkipLink />
      <Routes>
        <Route path="/" element={<Home lang="es" />} />
        <Route path="/about-details" element={<AboutDetails lang="es" />} />
        <Route path="/blog" element={<Blog lang="es" />} />
        <Route path="/blog/:slug" element={<BlogArticle lang="es" />} />
        <Route path="/en" element={<Home lang="en" />} />
        <Route path="/en/about-details" element={<AboutDetails lang="en" />} />
        <Route path="/en/blog" element={<Blog lang="en" />} />
        <Route path="/en/blog/:slug" element={<BlogArticle lang="en" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}

export default App;