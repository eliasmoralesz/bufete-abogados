import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import './SecurePdfViewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Visor de PDF "solo lectura" para la página de capacitación municipal
// (Upala/La Cruz, ver src/pages/Capacitacion.jsx). Elias pidió explícitamente
// que la gente no pueda copiar/pegar el texto de los documentos — con un
// <a href="doc.pdf"> normal o un <iframe> del visor nativo del navegador
// eso no se puede evitar (ambos exponen el texto real, seleccionable y
// descargable). La única forma real de bloquear la selección de texto es
// dibujar cada página como imagen en un <canvas> (así renderiza pdf.js
// internamente) y NO agregar la "capa de texto" que normalmente se pone
// encima para que se pueda seleccionar/buscar. Un canvas es solo píxeles:
// no hay texto que copiar, ni "Guardar imagen como" (bloqueado con
// onContextMenu). Elias ya entiende y aceptó que esto no evita capturas de
// pantalla -- ese límite es inherente a cualquier cosa que se muestre en una
// pantalla, no algo que se pueda arreglar con código.
const SecurePdfViewer = ({ url }) => {
  const canvasRef = useRef(null);
  const touchStartRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setPdf(null);
    setPageNum(1);

    pdfjsLib.getDocument({ url }).promise.then(
      (doc) => {
        if (cancelled) return;
        setPdf(doc);
        setNumPages(doc.numPages);
        setStatus('ready');
      },
      () => {
        if (!cancelled) setStatus('error');
      }
    );

    return () => {
      cancelled = true;
    };
  }, [url]);

  useEffect(() => {
    if (!pdf) return;
    let cancelled = false;

    pdf.getPage(pageNum).then((page) => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const containerWidth = canvas.parentElement.clientWidth;
      const baseViewport = page.getViewport({ scale: 1 });
      // Se limita por ancho Y por alto: en documentos con páginas
      // verticales (carta/A4, como "Procedimientos Migratorios..." o
      // "Formularios") escalar solo por ancho dejaba el render más alto
      // que la pantalla, empujando los botones "Anterior/Siguiente" fuera
      // de vista hasta hacer scroll -- Elias lo reportó con captura, y
      // después de ver las páginas verticales muy grandes prefirió esto a
      // dejarlas creciendo sin tope. En páginas horizontales (como la guía
      // CETC, que son diapositivas) el límite de ancho ya gana primero, así
      // que quedan igual de grandes que antes -- ese era el único que le
      // preocupaba mantener grande.
      const availableHeight = Math.max(320, window.innerHeight * 0.6);
      const scaleByWidth = containerWidth / baseViewport.width;
      const scaleByHeight = availableHeight / baseViewport.height;
      const scale = Math.min(2, scaleByWidth, scaleByHeight);
      const viewport = page.getViewport({ scale });

      const context = canvas.getContext('2d');
      // devicePixelRatio: nitidez en pantallas retina/celulares, que es
      // exactamente el tipo de pantalla que van a usar los 40 asistentes.
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      page.render({ canvasContext: context, viewport });
    });

    return () => {
      cancelled = true;
    };
  }, [pdf, pageNum]);

  const goPrev = useCallback(() => {
    setPageNum((p) => Math.max(1, p - 1));
  }, []);

  const goNext = useCallback(() => {
    setPageNum((p) => Math.min(numPages, p + 1));
  }, [numPages]);

  // Flechas del teclado -- pedido explícito de Elias, igual que el deslizar
  // en mobile de abajo. Solo mientras haya más de una página; no interfiere
  // con otros campos porque esta página no tiene inputs además del candado
  // (que ya no está montado a esta altura).
  useEffect(() => {
    if (numPages <= 1) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numPages, goPrev, goNext]);

  // Deslizar en mobile -- mismo comportamiento que las flechas de teclado.
  // Umbral horizontal de 40px y se exige que el gesto sea más horizontal
  // que vertical, para no comerse el scroll normal de la página cuando
  // alguien simplemente quiere bajar/subir.
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e) => {
    const start = touchStartRef.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    touchStartRef.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  if (status === 'error') {
    return <p className="secure-pdf-error">No se pudo cargar el documento. Intente de nuevo más tarde.</p>;
  }

  return (
    <div className="secure-pdf-viewer">
      <div
        className="secure-pdf-canvas-wrap"
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {status === 'loading' && <div className="secure-pdf-loading">Cargando documento…</div>}
        <canvas ref={canvasRef} className="secure-pdf-canvas" />

        {numPages > 1 && status === 'ready' && (
          <>
            <button
              type="button"
              className="secure-pdf-side-arrow secure-pdf-side-arrow-left"
              onClick={goPrev}
              disabled={pageNum <= 1}
              aria-label="Página anterior"
            >
              ←
            </button>
            <button
              type="button"
              className="secure-pdf-side-arrow secure-pdf-side-arrow-right"
              onClick={goNext}
              disabled={pageNum >= numPages}
              aria-label="Página siguiente"
            >
              →
            </button>
          </>
        )}
      </div>

      {numPages > 1 && (
        <div className="secure-pdf-nav">
          <button type="button" onClick={goPrev} disabled={pageNum <= 1}>
            ← Anterior
          </button>
          <span>Página {pageNum} de {numPages}</span>
          <button type="button" onClick={goNext} disabled={pageNum >= numPages}>
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default SecurePdfViewer;
