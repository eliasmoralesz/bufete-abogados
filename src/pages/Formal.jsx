import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Formal = () => {
  return (
    <div className="formal-page">
      <header>
        <h1>Bufete de Abogados</h1>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/formal">Página Formal</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="formal-intro">
          <h2>Bienvenido a Nuestra Página Formal</h2>
          <p>
            Aquí encontrarás información detallada sobre nuestros servicios, equipo y casos de éxito.
          </p>
        </section>
        <section className="formal-services">
          <h3>Nuestros Servicios</h3>
          <ul>
            <li>Derecho Civil</li>
            <li>Derecho Penal</li>
            <li>Derecho Laboral</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Bufete de Abogados. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Formal;