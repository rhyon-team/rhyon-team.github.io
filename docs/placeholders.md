# Guía de placeholders

Imágenes provisorias que están en producción hasta que lleguen las
definitivas. Todas usan los colores de los tokens (rojo Torino sobre crema) para
que el sitio se vea coherente mientras tanto.

Al reemplazar una, se sobrescribe el archivo con el mismo nombre y se borra su
fila de esta tabla. Cuando la tabla quede vacía, este archivo se borra.

## Pendientes

| Archivo              | Dónde se usa                                     | Formato                        | Placeholder actual                      |
| -------------------- | ------------------------------------------------ | ------------------------------ | --------------------------------------- |
| `public/og-image.png` | Preview al compartir (WhatsApp, LinkedIn, X). `site.ogImage` en `src/lib/site.ts`. | PNG o JPG, **1200×630**, < 300 KB | "RHYON" en Fraunces sobre crema, barra roja abajo |
| `public/favicon.svg` | Pestaña del navegador y `logo` del JSON-LD (`src/lib/seo.ts`). | SVG cuadrado, legible a 16 px | "R" crema sobre cuadrado rojo Torino    |

## Cómo reemplazar cada una

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
- Si llega el logo definitivo, confirmar también el hex de
  `--color-brand-800` y de `site.themeColor` (ver README → Pendientes).

## Agregar un placeholder nuevo

Si una sección necesita una imagen que todavía no existe:

1. Crear el placeholder en `public/` (o en `src/assets/` si pasa por
   `<Image />`) con el nombre y el tamaño que va a tener la definitiva. Así, al
   reemplazarlo no hay que tocar código.
2. Usar los colores de los tokens, no un gris genérico ni una imagen de stock.
3. Darle un `alt` real desde el principio, pensado para la imagen definitiva.
4. Agregar una fila a la tabla de arriba.
