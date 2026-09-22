import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import SecurePdfViewer from '../components/SecurePdfViewer';
import './Capacitacion.css';

// Página privada para la capacitación de Daguer a funcionarios municipales
// de Upala y La Cruz (una sola página para ambas, mismo material -- Elias
// lo confirmó). NO está en el menú, NO está en public/sitemap.xml (así que
// scripts/prerender.mjs, que solo lee rutas de ese archivo, nunca la toca:
// no genera HTML estático para ella, se sirve 100% por JS) y lleva
// noindex/nofollow explícito más abajo -- tres capas para que Google jamás
// la liste. El acceso real es un usuario/contraseña COMPARTIDO entre los
// ~40 asistentes (no una cuenta por persona -- Elias lo pidió explícitamente
// así de simple: el sitio no tiene backend/base de datos, así que un login
// individual real requeriría construir esa infraestructura desde cero).
//
// El usuario y la contraseña de acá abajo son un valor de ejemplo/temporal
// -- Elias dijo "Usuario: Invitado, Contraseña: 12345678, por decir algo".
// CAMBIAR ambos por los reales antes de compartir el link/QR con los
// funcionarios. Se comparan como hash SHA-256 (Web Crypto API) en vez de
// texto plano -- no evita que alguien muy insistente los encuentre
// inspeccionando el bundle de JS (eso no tiene solución real en un sitio
// sin servidor), pero sí evita que estén ahí para leer a simple vista.
const CREDENTIALS_HASH = {
  // SHA-256 de "invitado" (usuario, en minúsculas) y "12345678" (contraseña)
  user: '75cee5b221098c39dc19feca49b7b7cfe46405057d0361b18726990a5f91bf25',
  pass: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
};

const SESSION_KEY = 'documento-capacitacion-acceso';

// Documentos de la capacitación -- se agregan acá según van llegando, todos
// bajo el mismo link/contraseña (ver conversación: un solo link con lista de
// documentos adentro, en vez de un sub-link por documento).
const DOCUMENTS = [
  { title: 'Categoría Especial Temporal Complementaria (CETC) — Guía práctica', file: '/capacitacion/cetc-guia-practica-k7m2.pdf' },
];

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const Capacitacion = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);

  // Recuerda el acceso solo dentro de esta pestaña/sesión del navegador
  // (sessionStorage, no localStorage) -- así no hay que reescribir la
  // contraseña en cada clic durante la capacitación, pero sí se vuelve a
  // pedir en una visita nueva/otro dispositivo.
  useEffect(() => {
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === 'true');
    setCheckingSession(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const [userHash, passHash] = await Promise.all([sha256Hex(userInput), sha256Hex(passInput)]);
    if (userHash === CREDENTIALS_HASH.user && passHash === CREDENTIALS_HASH.pass) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setUnlocked(true);
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
    setSubmitting(false);
  };

  if (checkingSession) return null;

  return (
    <>
      <Helmet>
        <title>Materiales de capacitación | Daguer Hernández Abogado</title>
        {/* Triple refuerzo anti-indexación: meta robots acá, sin ruta en
            sitemap.xml, y sin link desde ningún otro lado del sitio. */}
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Helmet>

      <main id="main-content" tabIndex={-1} className="capacitacion-section">
        <div className="capacitacion-container">
          {!unlocked ? (
            <div className="capacitacion-gate" data-aos="fade-up">
              <span className="capacitacion-eyebrow">Acceso privado</span>
              <h1>Materiales de la capacitación</h1>
              <p>Ingrese el usuario y la contraseña que se le compartieron para ver los documentos.</p>

              <form onSubmit={handleSubmit} className="capacitacion-form">
                <label>
                  Usuario
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </label>
                <label>
                  Contraseña
                  <input
                    type="password"
                    value={passInput}
                    onChange={(e) => setPassInput(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </label>
                {error && <p className="capacitacion-error">{error}</p>}
                <button type="submit" disabled={submitting}>
                  {submitting ? 'Verificando…' : 'Ingresar'}
                </button>
              </form>
            </div>
          ) : (
            <div className="capacitacion-content" data-aos="fade-up">
              <span className="capacitacion-eyebrow">Capacitación municipal</span>
              <h1>Materiales de la capacitación</h1>
              <p className="capacitacion-intro">
                Documentos preparados por el Lic. Daguer Hernández para la capacitación a funcionarios
                municipales. Solo se pueden ver en esta página, no se pueden descargar.
              </p>

              {DOCUMENTS.length === 0 ? (
                <p className="capacitacion-empty">Todavía no se han subido documentos. Vuelva a revisar más tarde.</p>
              ) : (
                <div className="capacitacion-layout">
                  <nav className="capacitacion-doc-list" aria-label="Documentos disponibles">
                    {DOCUMENTS.map((doc) => (
                      <button
                        key={doc.file}
                        type="button"
                        className={activeDoc === doc.file ? 'active' : ''}
                        onClick={() => setActiveDoc(doc.file)}
                      >
                        {doc.title}
                      </button>
                    ))}
                  </nav>

                  <div className="capacitacion-viewer">
                    {activeDoc ? (
                      <SecurePdfViewer url={activeDoc} />
                    ) : (
                      <p className="capacitacion-empty">Seleccione un documento de la lista para verlo.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Capacitacion;
