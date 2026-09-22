# Documentos de la capacitación municipal

Esta carpeta guarda los PDF que se muestran en la página privada
`/capacitacion-municipal-2026`. Los archivos acá son públicos por URL
directa si alguien la adivina (no hay backend que verifique la contraseña
antes de servir el archivo) -- por eso:

1. Usa nombres de archivo NO obvios (evita "documento1.pdf"; algo como
   `guia-tramites-2026-xk4p.pdf` es mejor).
2. Súbelos acá.
3. Agrégalos a la lista `DOCUMENTS` en `src/pages/Capacitacion.jsx`
   con su título real:

   { title: 'Guía de trámites municipales', file: '/capacitacion/guia-tramites-2026-xk4p.pdf' }

4. `npm run build` para confirmar que no rompe nada antes de subir a main.
