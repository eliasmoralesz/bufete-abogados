import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutDetails from './components/AboutDetails'; // Ruta corregida
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import GuidePage from './pages/GuidePage';
import { GUIDE_PATHS } from './content/migrationGuides';
import WhatsAppButton from './components/WhatsAppButton';
import SkipLink from './components/SkipLink';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    // scripts/prerender.mjs inyecta este <style> en <head> para que los
    // crawlers sin JavaScript vean el contenido siempre visible (sin
    // animación) en el HTML estático. El problema: al vivir en <head> y no
    // dentro de #root, createRoot().render() nunca lo reemplaza -- se queda
    // pegado para siempre con !important, anulando TODAS las animaciones
    // AOS del sitio incluso para usuarios reales con JavaScript. Elias lo
    // notó ("las animaciones ya no existen mientras hago scroll") y esta es
    // la causa real: nada se borró, era este bug latente del prerender.
    // Quitarlo aquí, apenas monta React, restaura el comportamiento normal
    // para cualquiera con JS -- los crawlers sin JS siguen viendo el HTML
    // estático (con la etiqueta intacta) tal como antes.
    document.querySelector('style[data-prerender-override]')?.remove();

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
        <Route path={GUIDE_PATHS.cetc.es} element={<GuidePage guideKey="cetc" lang="es" />} />
        <Route path={GUIDE_PATHS.residency.es} element={<GuidePage guideKey="residency" lang="es" />} />
        <Route path={GUIDE_PATHS.naturalization.es} element={<GuidePage guideKey="naturalization" lang="es" />} />
        <Route path={GUIDE_PATHS.refuge.es} element={<GuidePage guideKey="refuge" lang="es" />} />
        <Route path="/en" element={<Home lang="en" />} />
        <Route path="/en/about-details" element={<AboutDetails lang="en" />} />
        <Route path="/en/blog" element={<Blog lang="en" />} />
        <Route path="/en/blog/:slug" element={<BlogArticle lang="en" />} />
        <Route path={GUIDE_PATHS.cetc.en} element={<GuidePage guideKey="cetc" lang="en" />} />
        <Route path={GUIDE_PATHS.residency.en} element={<GuidePage guideKey="residency" lang="en" />} />
        <Route path={GUIDE_PATHS.naturalization.en} element={<GuidePage guideKey="naturalization" lang="en" />} />
        <Route path={GUIDE_PATHS.refuge.en} element={<GuidePage guideKey="refuge" lang="en" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}

export default App;
