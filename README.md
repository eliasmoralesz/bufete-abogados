# Bufete Daguer Hernández — sitio web

Sitio construido con [Vite](https://vitejs.dev/) + React 18. Bilingüe (ES/EN) vía `react-i18next`.

## Scripts disponibles

### `npm start` / `npm run dev`

Levanta el servidor de desarrollo en [http://localhost:3000](http://localhost:3000) con recarga en caliente.

### `npm test`

Corre la suite de pruebas con [Vitest](https://vitest.dev/).

### `npm run build`

Genera el build de producción en la carpeta `build/`.

### `npm run preview`

Sirve localmente el build de producción ya generado, para verificarlo antes de desplegar.

## Notas del proyecto

- El formulario de contacto usa [Formspree](https://formspree.io/).
- El agendamiento de citas usa un widget embebido de [Calendly](https://calendly.com/).
- El efecto de fondo animado en "Sobre Mí" usa Vanta.js + Three.js cargados por CDN (ver `index.html`), no como dependencias npm.
