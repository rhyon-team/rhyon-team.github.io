// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio del sitio. Se usa para generar URLs absolutas en el sitemap y en
  // los meta de Open Graph. Al conectar el dominio propio, cambiar por
  // https://rhyon.com y actualizar tambien `site.url` en src/lib/site.ts.
  site: 'https://rhyon-team.github.io',

  // El repo se llama rhyon-team.github.io, por lo que el sitio se sirve desde
  // la raiz (/). No hace falta configurar `base`.

  integrations: [
    react(),
    sitemap({
      // El styleguide es documentacion interna: fuera del sitemap.
      filter: (page) => !page.includes('/styleguide'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    // Genera /pagina.html en vez de /pagina/index.html. GitHub Pages resuelve
    // ambas formas, pero esta produce URLs mas predecibles.
    format: 'file',
  },

  // Comprime el HTML de salida.
  compressHTML: true,

  prefetch: {
    // Precarga los enlaces al pasar el mouse: la navegacion se siente instantanea.
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
