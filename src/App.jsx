import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Formal from './pages/Formal';
import AboutDetails from './components/AboutDetails'; // Ruta corregida
import WhatsAppButton from './components/WhatsAppButton';
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formal" element={<Formal />} />
        <Route path="/about-details" element={<AboutDetails />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}

export default App;