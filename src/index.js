import React from 'react';
import ReactDOM from 'react-dom/client'; // Usamos 'react-dom/client' para React 18+
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles.css'; // Importa los estilos globales
import './i18n';

// Crear la raíz de la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíalos a un endpoint de análisis. Más información: https://bit.ly/CRA-vitals
reportWebVitals();