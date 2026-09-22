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
//
// NOTA sobre zoom: se probó un zoom manual (botones +/-) y se quitó por
// completo -- en desktop Elias no lo quería (el tamaño ajustado ya sube lo
// suficiente, ver fitScale abajo) y en mobile, al acercar mucho (hasta
// 300%), el canvas terminaba tan grande en píxeles reales (ancho/alto ×
// devicePixelRatio) que superaba el límite de tamaño de canvas de Safari
// en iOS y el render salía corrupto -- Elias lo reportó con captura: la
// página entera se veía rota, con contenido de otra pestaña/la cámara
// metido en medio. El pellizcar-para-zoom NATIVO del navegador se sigue
// bloqueando (touch-action acá abajo + meta viewport y gesturestart en
// Capacitacion.jsx) porque ese es un problema aparte y real: sin
// bloquearlo, el gesto de pellizcar se confunde con el de deslizar para
// cambiar de página.
const SecurePdfViewer = ({ url }) => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const touchStartRef = useRef(null);
  // Referencia a la "render task" de pdf.js en curso (si hay alguna). Vive
  // en un ref, no en una variable local del efecto, porque .cancel() es
  // ASÍNCRONO en pdf.js ("no se cancela hasta que la renderización pausa
  // con un timeout" dice su propia documentación) -- así que antes de
  // arrancar cualquier render nuevo hay que cancelar Y ESPERAR a que el
  // anterior de verdad termine, sin importar de qué efecto/clic haya
  // venido. Sin esto, clics rápidos en Siguiente/Anterior podían solapar
  // dos render() en el mismo <canvas> y pdf.js tronaba con "Cannot use the
  // same canvas during multiple render() operations".
  const activeRenderRef = useRef(null);
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
      const dpr = window.devicePixelRatio || 1;
      // Tamaño "ajustado": se limita por ancho Y por alto, para que en
      // documentos con páginas verticales (carta/A4) el render no quede
      // más alto que la pantalla y tape los botones "Anterior/Siguiente"
      // -- Elias lo reportó con captura. En páginas horizontales (como la
      // guía CETC, diapositivas) el límite de ancho gana primero, así que
      // ese documento en particular casi no cambia (era el único que le
      // preocupaba mantener grande).
      // 0.70 (no 0.66) -- Elias pidió más tamaño en desktop; se sube en
      // pasos moderados sobre el mismo esquema centrado/contenido (no el
      // "más zoom" de antes, que rompía el layout).
      const availableHeight = Math.max(320, window.innerHeight * 0.7);
      const scaleByWidth = containerWidth / baseViewport.width;
      const scaleByHeight = availableHeight / baseViewport.height;
      let fitScale = Math.min(2, scaleByWidth, scaleByHeight);
      // En mobile (<=720px, mismo corte que el resto de la página) Elias
      // pidió más legibilidad y aceptó explícitamente que el documento se
      // salga del ancho de la pantalla, con scroll horizontal dentro del
      // recuadro -- 1.35x el ancho del contenedor en vez de ajustarse
      // exacto (el recuadro tiene overflow:auto, ver CSS, y
      // .capacitacion-viewer tiene min-width:0 para que ese ancho "de
      // más" no empuje toda la página -- ver Capacitacion.css). En
      // desktop esto NO aplica: ahí el documento nunca se sale del
      // contenedor, se queda centrado como hasta ahora.
      if (window.innerWidth <= 720) {
        fitScale = Math.min(2, scaleByWidth * 1.35, scaleByHeight);
      }
      // Tope de seguridad por ÁREA física del canvas (ancho × alto ×
      // devicePixelRatio al cuadrado): en vez de adivinar un porcentaje
      // de zoom "seguro", se calcula el área real en píxeles y, si se
      // pasa de un margen prudente, se reduce la escala lo justo para
      // volver a entrar. Se ajusta solo sin importar el dispositivo.
      const SAFE_CANVAS_AREA_PX = 15_000_000;
      const physicalArea = baseViewport.width * fitScale * dpr * (baseViewport.height * fitScale * dpr);
      if (physicalArea > SAFE_CANVAS_AREA_PX) {
        fitScale *= Math.sqrt(SAFE_CANVAS_AREA_PX / physicalArea);
      }
      const viewport = page.getViewport({ scale: fitScale });

      const context = canvas.getContext('2d');
      // devicePixelRatio: nitidez en pantallas retina/celulares, que es
      // exactamente el tipo de pantalla que van a usar los 40 asistentes.
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
  // En mobile el documento ahora puede ser más ancho que el recuadro (ver
  // fitScale en el efecto de arriba), así que un deslizar horizontal
  // puede significar dos cosas distintas: "recorrer el documento hacia el
  // lado" (scroll nativo del recuadro, vía touch-action:pan-x) o "quiero
  // la página siguiente". Se distinguen comparando el scrollLeft del
  // recuadro antes y después del gesto -- si el recuadro se movió, fue un
  // pan, no un cambio de página.
  const handleTouchStart = (e) => {
    if (e.touches.length > 1) {
      touchStartRef.current = null;
      return;
    }
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY, scrollLeft: wrapRef.current?.scrollLeft ?? 0 };
  };

  const handleTouchEnd = (e) => {
    const start = touchStartRef.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const scrollLeftMoved = Math.abs((wrapRef.current?.scrollLeft ?? 0) - start.scrollLeft) > 5;
    touchStartRef.current = null;
    if (scrollLeftMoved) return;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  // Bloquea el pellizcar-para-zoom nativo en iOS Safari a nivel de este
  // elemento, encima del meta viewport que ya lo bloquea a nivel de toda
  // la página (ver Capacitacion.jsx) y de touch-action (CSS).
  // "gesturestart" es un evento propio de WebKit que dispara ANTES que el
  // zoom nativo tome el gesto -- cancelarlo (con addEventListener
  // no-pasivo, no se puede con los props on* de React) es la forma más
  // confiable de asegurar que el pellizcar nunca zoomee la página, ni
  // siquiera en versiones viejas de Safari que no respeten bien el meta
  // viewport. Sigue haciendo falta aunque ya no haya zoom manual: sin
  // esto, pellizcar se confunde con deslizar para cambiar de página.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const preventGesture = (e) => e.preventDefault();
    el.addEventListener('gesturestart', preventGesture);
    el.addEventListener('gesturechange', preventGesture);
    return () => {
      el.removeEventListener('gesturestart', preventGesture);
      el.removeEventListener('gesturechange', preventGesture);
    };
  }, []);

  if (status === 'error') {
    return <p className="secure-pdf-error">No se pudo cargar el documento. Intente de nuevo más tarde.</p>;
  }

  return (
    <div className="secure-pdf-viewer">
      <div
        ref={wrapRef}
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
