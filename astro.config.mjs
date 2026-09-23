// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio del sitio. Se usa para generar URLs absolutas (sitemap, Open Graph).
  // Cuando conectemos el dominio propio, cambiar por https://rhyon.com
  site: 'https://rhyon-team.github.io',

  // El repo se llama rhyon-team.github.io, por lo que el sitio se sirve desde
  // la raiz (/). No hace falta configurar `base`.

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
