import { useEffect, useRef, useState } from 'react';

// Para iframes pesados de terceros (Google Calendar, Google Maps): en vez
// de "loading='lazy'" (que espera a que la sección esté CASI en pantalla
// para siquiera empezar a pedir el iframe — Elias notó el retraso visible
// justo al llegar) o cargarlo directo desde el arranque de la página (que
// sí suma peso/requests al primer render y podría afectar Core Web Vitals,
// una señal real de SEO — Elias también preguntó por esto), este hook
// adelanta la carga por DOS caminos, lo que ocurra primero:
//
// 1) Scroll: un IntersectionObserver con un rootMargin grande — no se pide
//    nada hasta que el usuario ya viene bajando y la sección está a
//    `rootMargin` de distancia de la pantalla.
// 2) Respaldo por tiempo (`fallbackDelayMs`): Elias notó que el camino (1)
//    no cubre a alguien que hace clic en un botón "Agendar consulta" ARRIBA
//    de la página (Hero, header, etc. — hay 5 en el sitio) sin haber
//    scrolleado nada; ese clic salta directo a la sección con el
//    observer sin haber tenido chance de dispararse. Este timer arranca la
//    carga en segundo plano poco después de montar, sin esperar scroll —
//    igual de "en segundo plano" que el camino (1), solo que por tiempo en
//    vez de por posición. Se deja en 0/undefined para desactivarlo (caso
//    del mapa, que nadie salta a ver con un botón desde arriba).
export const useNearViewport = (rootMargin = '0px 0px 1500px 0px', preconnectOrigin, fallbackDelayMs) => {
  const ref = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (isNear) return undefined;
    const node = ref.current;
    if (!node || typeof IntersectionObserver !== 'function') {
      // Navegador sin soporte (muy poco probable hoy) — cargar directo en
      // vez de dejar la sección vacía para siempre.
      setIsNear(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isNear, rootMargin]);

  useEffect(() => {
    if (isNear || !fallbackDelayMs) return undefined;
    const id = window.setTimeout(() => setIsNear(true), fallbackDelayMs);
    return () => window.clearTimeout(id);
  }, [isNear, fallbackDelayMs]);

  useEffect(() => {
    if (!isNear || !preconnectOrigin) return;
    const already = document.head.querySelector(`link[rel="preconnect"][href="${preconnectOrigin}"]`);
    if (already) return;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = preconnectOrigin;
    document.head.appendChild(link);
  }, [isNear, preconnectOrigin]);

  return [ref, isNear];
};
