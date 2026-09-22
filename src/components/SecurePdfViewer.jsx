import React, { useEffect, useRef, useState } from 'react';
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
      const scale = Math.min(2, containerWidth / baseViewport.width);
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

  if (status === 'error') {
    return <p className="secure-pdf-error">No se pudo cargar el documento. Intente de nuevo más tarde.</p>;
  }

  return (
    <div className="secure-pdf-viewer">
      <div className="secure-pdf-canvas-wrap" onContextMenu={(e) => e.preventDefault()}>
        {status === 'loading' && <div className="secure-pdf-loading">Cargando documento…</div>}
        <canvas ref={canvasRef} className="secure-pdf-canvas" />
      </div>

      {numPages > 1 && (
        <div className="secure-pdf-nav">
          <button
            type="button"
            onClick={() => setPageNum((p) => Math.max(1, p - 1))}
            disabled={pageNum <= 1}
          >
            ← Anterior
          </button>
          <span>Página {pageNum} de {numPages}</span>
          <button
            type="button"
            onClick={() => setPageNum((p) => Math.min(numPages, p + 1))}
            disabled={pageNum >= numPages}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default SecurePdfViewer;
