// Se usa para: canonical tags, Open Graph, Twitter Cards y JSON-LD.
// También hay que actualizar public/sitemap.xml y public/robots.txt (no pueden leer este archivo).
export const SITE_URL = 'https://daguerhernandez.com';
export const SITE_NAME = 'Daguer Hernández Abogado';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.webp`;
export const OG_IMAGE_EN = `${SITE_URL}/og-image-en.webp`;

// Devuelve la imagen Open Graph según el idioma (tarjeta con el texto en el idioma correcto).
export const ogImageForLang = (lang) => (lang === 'en' ? OG_IMAGE_EN : DEFAULT_OG_IMAGE);
