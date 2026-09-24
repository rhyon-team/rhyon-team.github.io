# Guía de placeholders

Lo que está en producción de forma provisoria hasta que llegue lo definitivo:
la identidad de marca (logo, tipografía, colores) y las imágenes.

Al reemplazar algo, se borra su fila de las tablas. Cuando no quede ninguna,
este archivo se borra.

## TODO: identidad de marca

Falta el material de marca. Mientras tanto, el sitio usa aproximaciones
tomadas del Instagram ([@whearerhyon](https://www.instagram.com/whearerhyon/)).

| Falta                          | Qué se usa mientras tanto                                       | Dónde se cambia                                                             |
| ------------------------------ | --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Logo** en SVG: isotipo solo y con "RHYON" | El nombre escrito en texto (`site.name`) con la tipografía de títulos, en bold. Sin isotipo. | `Header.astro` y `Footer.astro` (hoy muestran texto), `favicon.svg`, `og-image.png`, `logo` en `src/lib/seo.ts` |
| **Tipografía** de títulos: nombre y licencia | Plus Jakarta Sans, la sans geométrica gratuita más parecida a la de los posts | `--font-display` en `src/styles/tokens.css` y su `@import` en `src/styles/global.css` |
| **Hex del rojo** de la marca   | `#7c1d26`. Las capturas del Instagram sugieren un rojo algo más vivo. | `--color-brand-800` en `tokens.css` (y reajustar la rampa `brand-*`), `site.themeColor` en `src/lib/site.ts`, `favicon.svg` |
| **Hex del fondo oscuro**       | `sand-950` (`#1a1613`) como `surface-inverse`                   | `--color-sand-950` o el token `--surface-inverse` en `global.css`            |

### Al llegar el material

1. **Tipografía.** Si es gratuita y está en `@fontsource`, instalar el paquete
   `@fontsource-variable/<nombre>` y reemplazar el de Plus Jakarta Sans. Si es
   paga, pedir los archivos `.woff2` y la licencia para web, y servirlos desde
   `public/fonts/`.
2. **Rojo.** Cambiar `--color-brand-800` y rehacer la rampa `brand-*` a su
   alrededor. Verificar contraste de texto sobre `accent` y de `accent` sobre
   crema (mínimo 4.5:1). Actualizar `site.themeColor`.
3. **Logo.** Guardar los SVG en `src/assets/` y reemplazar el texto de
   `Header` y `Footer` por el logo, con `aria-label` con el nombre. Rehacer el
   favicon con el isotipo.
4. Rehacer `og-image.png` con el logo y la tipografía reales.
5. Revisar el `/styleguide` completo: se genera desde los tokens, así que
   refleja todo el cambio.

## Imágenes

| Archivo              | Dónde se usa                                     | Formato                        | Placeholder actual                      |
| -------------------- | ------------------------------------------------ | ------------------------------ | --------------------------------------- |
| `public/og-image.png` | Preview al compartir (WhatsApp, LinkedIn, X). `site.ogImage` en `src/lib/site.ts`. | PNG o JPG, **1200×630**, < 300 KB | "RHYON" en Plus Jakarta Sans y "Software · IA · Consultoría" sobre crema, con una barra roja abajo |
| `public/favicon.svg` | Pestaña del navegador y `logo` del JSON-LD (`src/lib/seo.ts`). | SVG cuadrado, legible a 16 px | "R" crema en sans bold sobre un cuadrado rojo Torino |

### `og-image.png`

- Mantener 1200×630: es la proporción que usan todas las redes. Si cambia,
  actualizar `og:image:width` y `og:image:height` en
  `src/components/seo/SEO.astro`.
- Dejar el contenido importante lejos de los bordes: algunas apps recortan los
  costados.
- Verificar el resultado con el
  [inspector de LinkedIn](https://www.linkedin.com/post-inspector/) después
  del deploy. WhatsApp y LinkedIn cachean la imagen, así que puede tardar en
  actualizarse.

### `favicon.svg`

- Tiene que leerse a 16×16 px: el logo completo suele no entrar y conviene
  usar solo el isotipo.
- Los colores van escritos dentro del SVG: el favicon no lee los tokens CSS.
  Usar los mismos hex de `src/styles/tokens.css`.

## Agregar un placeholder nuevo

Si una sección necesita una imagen que todavía no existe:

1. Crear el placeholder en `public/` (o en `src/assets/` si pasa por
   `<Image />`) con el nombre y el tamaño que va a tener la definitiva. Así, al
   reemplazarlo no hay que tocar código.
2. Usar los colores de los tokens, no un gris genérico ni una imagen de stock.
3. Darle un `alt` real desde el principio, pensado para la imagen definitiva.
4. Agregar una fila a la tabla de imágenes.
