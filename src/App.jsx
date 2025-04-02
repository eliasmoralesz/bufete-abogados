import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Formal from './pages/Formal';
import WhatsAppButton from './components/WhatsAppButton'; // Importamos el botón;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formal" element={<Formal />} />
      </Routes>
      <WhatsAppButton /> {/* Botón flotante visible en todas las rutas */}
    </Router>
  );
}

export default App;