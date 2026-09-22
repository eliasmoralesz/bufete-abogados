import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import './SecurePdfViewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

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
  // Referencia a la "render task" de pdf.js en curso (si hay alguna). Vive
  // en un ref, no en una variable local del efecto, porque .cancel() es
  // ASÍNCRONO en pdf.js ("no se cancela hasta que la renderización pausa
  // con un timeout" dice su propia documentación) -- así que antes de
  // arrancar cualquier render nuevo hay que cancelar Y ESPERAR a que el
  // anterior de verdad termine, sin importar de qué efecto/clic haya
  // venido. Sin esto, clics rápidos en zoom o en Siguiente/Anterior podían
  // solapar dos render() en el mismo <canvas> y pdf.js tronaba con
  // "Cannot use the same canvas during multiple render() operations".
  const activeRenderRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [status, setStatus] = useState('loading');
  // 1 = "ajustado a pantalla" (el tamaño de siempre). Multiplica ese tamaño
  // base -- controles propios (+ / − más abajo) en vez de dejar que la
  // gente use el pellizcar-para-zoom nativo del navegador: Elias probó eso
  // en el celular y, al mover los dedos, el gesto se interpretaba como un
  // deslizar y le cambiaba de diapositiva sin querer. Con touch-action
  // (ver SecurePdfViewer.css) se desactiva el zoom nativo del navegador en
  // el documento, así que estos botones son la única forma de acercar.
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setPdf(null);
    setPageNum(1);
    setZoom(1);

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

  // Vuelve a "ajustado a pantalla" cada vez que se cambia de página -- si
  // alguien hace zoom para leer algo en la página 3, no tiene sentido que
  // la página 4 abra ya acercada (y quizás con un documento distinto en
  // proporciones, el mismo nivel de zoom podría verse raro).
  useEffect(() => {
    setZoom(1);
  }, [pageNum]);

  useEffect(() => {
    if (!pdf) return;
    let cancelled = false;

    const run = async () => {
      // Si ya hay un render en curso (de un clic anterior muy seguido),
      // cancelarlo y ESPERAR a que de verdad termine antes de tocar el
      // canvas de nuevo -- ver el comentario de activeRenderRef arriba.
      if (activeRenderRef.current) {
        activeRenderRef.current.cancel();
        try {
          await activeRenderRef.current.promise;
        } catch {
          // esperado: se cancela a propósito.
        }
      }
      if (cancelled) return;

      const page = await pdf.getPage(pageNum);
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const containerWidth = canvas.parentElement.clientWidth;
      const baseViewport = page.getViewport({ scale: 1 });
      // Tamaño "ajustado": se limita por ancho Y por alto, para que en
      // documentos con páginas verticales (carta/A4) el render no quede
      // más alto que la pantalla y tape los botones "Anterior/Siguiente"
      // -- Elias lo reportó con captura. En páginas horizontales (como la
      // guía CETC, diapositivas) el límite de ancho gana primero, así que
      // ese documento en particular casi no cambia (era el único que le
      // preocupaba mantener grande). El zoom (botones +/- más abajo)
      // multiplica este tamaño base -- ahí sí se permite salir de esos
      // límites, porque el contenedor pasa a scrollear (overflow:auto en
      // vez de recortar u obligar a que quepa entero).
      const availableHeight = Math.max(320, window.innerHeight * 0.6);
      const scaleByWidth = containerWidth / baseViewport.width;
      const scaleByHeight = availableHeight / baseViewport.height;
      const fitScale = Math.min(2, scaleByWidth, scaleByHeight);
      const viewport = page.getViewport({ scale: fitScale * zoom });

      const context = canvas.getContext('2d');
      // devicePixelRatio: nitidez en pantallas retina/celulares, que es
      // exactamente el tipo de pantalla que van a usar los 40 asistentes.
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const renderTask = page.render({ canvasContext: context, viewport });
      activeRenderRef.current = renderTask;
      try {
        await renderTask.promise;
      } catch (err) {
        // RenderingCancelledException es esperable cuando cancelamos a
        // propósito (otro render empezó antes de que este terminara) --
        // no es un error real, no hace falta reportarlo.
        if (err?.name !== 'RenderingCancelledException') {
          console.error('SecurePdfViewer render error:', err);
        }
      } finally {
        if (activeRenderRef.current === renderTask) {
          activeRenderRef.current = null;
        }
      }
    };

    run();

    return () => {
      cancelled = true;
      // Si este efecto se desmonta/reemplaza mientras su propio render
      // sigue en curso, cancelarlo -- el chequeo de activeRenderRef al
      // inicio de run() ya cubre el caso de que OTRO efecto lo cancele
      // primero; esto cubre que nadie más lo haga (por ejemplo, si el
      // componente entero se desmonta).
      if (activeRenderRef.current) {
        activeRenderRef.current.cancel();
      }
    };
  }, [pdf, pageNum, zoom]);

  const goPrev = useCallback(() => {
    setPageNum((p) => Math.max(1, p - 1));
  }, []);

  const goNext = useCallback(() => {
    setPageNum((p) => Math.min(numPages, p + 1));
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)));
  }, []);

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

  // Deslizar en mobile -- mismo comportamiento que las flechas de teclado,
  // pero SOLO con el documento en tamaño "ajustado" (zoom === 1). Ya
  // acercado, un arrastre horizontal significa "quiero ver otra parte de
  // la página" (recorrerla con el dedo, gesto nativo del navegador vía
  // scroll -- ver overflow:auto en el CSS), no "quiero la página
  // siguiente". Mezclar los dos gestos en el mismo estado es justo lo que
  // causaba el problema que reportó Elias.
  const handleTouchStart = (e) => {
    if (zoom !== 1 || e.touches.length > 1) {
      touchStartRef.current = null;
      return;
    }
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
      {status === 'ready' && (
        <div className="secure-pdf-zoom-bar">
          <button type="button" onClick={zoomOut} disabled={zoom <= ZOOM_MIN} aria-label="Alejar">
            −
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={zoomIn} disabled={zoom >= ZOOM_MAX} aria-label="Acercar">
            +
          </button>
        </div>
      )}

      <div
        className="secure-pdf-canvas-wrap"
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {status === 'loading' && <div className="secure-pdf-loading">Cargando documento…</div>}
        <canvas ref={canvasRef} className="secure-pdf-canvas" />

        {numPages > 1 && status === 'ready' && zoom === 1 && (
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
