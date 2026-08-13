#!/usr/bin/env node
// Prerenderizado post-build: genera un index.html estático por cada ruta del
// sitio (tomadas de public/sitemap.xml) para que los crawlers que NO ejecutan
// JavaScript (auditores SEO, bots de preview, etc.) vean el contenido real
// -- H1, texto, enlaces -- en vez del <div id="root"></div> vacío que sirve
// la SPA por defecto.
//
// Para los usuarios reales no cambia nada: src/index.jsx monta React con
// createRoot().render() (no hydrateRoot()), así que en cuanto carga el JS,
// React reemplaza el HTML prerenderizado por el render normal del cliente.
//
// Se ejecuta automáticamente como parte de `npm run build`. Si se agregan
// rutas nuevas, hay que agregarlas primero a public/sitemap.xml (como ya
// indica el comentario en src/seoConfig.js) -- este script simplemente sigue
// esa misma lista.
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BUILD_DIR = join(ROOT, 'build');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// El Chromium que descarga el paquete "puppeteer" normal funciona bien en
// Mac/Linux de escritorio, pero en el contenedor de build de Vercel truena
// con "error while loading shared libraries: libnspr4.so" -- esas librerías
// del sistema no están instaladas ahí y no se pueden agregar. La solución
// estándar es "@sparticuz/chromium": un build de Chromium empaquetado para
// correr en el entorno mínimo de Vercel/AWS Lambda, sin esa dependencia. Solo
// se usa cuando la variable VERCEL está presente (la pone Vercel automático
// en cada build); en local sigue usando el Chromium normal de "puppeteer".
async function getLaunchOptions() {
  if (!process.env.VERCEL) {
    return { headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] };
  }
  const { default: chromium } = await import('@sparticuz/chromium');
  return {
    headless: true,
    args: chromium.args,
    executablePath: await chromium.executablePath(),
  };
}

function getRoutesFromSitemap() {
  const xml = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf-8');
  const routes = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  if (routes.length === 0) {
    throw new Error('No se encontraron <loc> en public/sitemap.xml');
  }
  return routes;
}

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        // el server todavía no está listo, reintenta
      }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error('vite preview no respondió a tiempo'));
      }
      setTimeout(attempt, 300);
    };
    attempt();
  });
}

async function capturePage(browser, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 900 });

    // No usamos "networkidle": el iframe de Calendly y el video del Hero
    // mantienen conexiones abiertas y nunca lo dejarían resolver. En vez de
    // eso esperamos a que el <footer> exista -- se renderiza al final del
    // árbol de componentes en todas las páginas, así que su presencia indica
    // que React ya terminó de montar.
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('footer', { timeout: 15000 }).catch(() => {
      console.warn(`  ⚠ ${route}: no apareció <footer> a tiempo, se captura igual`);
    });
    // Helmet inyecta title/meta, y las animaciones de entrada de Framer
    // Motion (delays de hasta ~1.2s en el Hero) necesitan este margen para
    // terminar antes de capturar el DOM.
    await new Promise((r) => setTimeout(r, 1500));

    // AOS (data-aos="fade-up" etc.) solo revela un elemento cuando entra al
    // viewport por scroll real -- con once:false (ver App.jsx) además lo
    // vuelve a ocultar al salir, así que no hay forma de "scrollear todo a
    // la vista" y capturar un estado estable con todo visible a la vez. Para
    // el snapshot estático no nos interesa la animación, solo que el
    // contenido esté presente y no oculto: se fuerza su estado final por
    // CSS antes de capturar. Los usuarios reales nunca ven esto -- en
    // cuanto carga el JS, React vuelve a montar todo desde cero.
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.setAttribute('data-prerender-override', 'true');
      style.textContent = '[data-aos]{opacity:1 !important;transform:none !important;transition:none !important;}';
      document.head.appendChild(style);
    });

    return await page.content();
  } finally {
    await page.close();
  }
}

async function main() {
  const routes = getRoutesFromSitemap();
  console.log(`Prerenderizando ${routes.length} rutas desde sitemap.xml:\n  ${routes.join('\n  ')}`);

  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  preview.stderr.on('data', (d) => process.stderr.write(d));

  let browser;
  try {
    await waitForServer(BASE_URL);

    browser = await puppeteer.launch(await getLaunchOptions());

    // Se capturan todas las páginas en memoria ANTES de escribir nada a disco.
    // build/index.html sigue siendo el shell vacío original hasta el final,
    // así que las rutas que dependen del fallback de SPA (todas menos "/")
    // siguen arrancando React limpio durante la captura.
    const captured = new Map();
    for (const route of routes) {
      const html = await capturePage(browser, route);
      captured.set(route, html);
      console.log(`  ✓ ${route}`);
    }

    for (const [route, html] of captured) {
      const outPath = route === '/' ? join(BUILD_DIR, 'index.html') : join(BUILD_DIR, route.slice(1), 'index.html');
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html);
    }

    console.log(`\n${captured.size} páginas prerenderizadas en build/`);
  } finally {
    if (browser) await browser.close();
    preview.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
