import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import reportWebVitals from './reportWebVitals'; // Importación añadida
import './styles.css';
import './i18n';

// Crear la raíz de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación (solo una vez)
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíalos a un endpoint de análisis. Más información: https://bit.ly/CRA-vitals
reportWebVitals();