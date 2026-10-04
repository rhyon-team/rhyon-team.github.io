# Guía de placeholders

Lo que está en producción de forma provisoria hasta que llegue lo definitivo:
la identidad de marca (logo, tipografía, colores), los datos de contacto, el
producto propio y las imágenes.

**El seguimiento está en los issues de GitHub:** cada pendiente tiene uno, con
los pasos para reemplazarlo. Este archivo es la referencia rápida de qué se usa
mientras tanto y dónde vive en el código.

Al cerrar un issue, se borra su fila de acá. Cuando no quede ninguna, este
archivo se borra.

## Identidad de marca

El sitio usa aproximaciones tomadas del Instagram
([@whearerhyon](https://www.instagram.com/whearerhyon/)).

| Falta | Issue | Qué se usa mientras tanto | Dónde vive |
| --- | --- | --- | --- |
| **Tipografía** de títulos | [#13](https://github.com/rhyon-team/rhyon-team.github.io/issues/13) | Plus Jakarta Sans, la sans geométrica gratuita más parecida | `--font-display` en `tokens.css` y su `@import` en `global.css`, `og-image.png` |
| **Hex del rojo** | [#14](https://github.com/rhyon-team/rhyon-team.github.io/issues/14) | `#7c1d26`; la imagen del logo usa `#a12030`, más vivo | `--color-brand-800` y la rampa `brand-*` en `tokens.css`, `site.themeColor`, `favicon.svg`, `og-image.png` |
| **Hex del fondo oscuro** | [#14](https://github.com/rhyon-team/rhyon-team.github.io/issues/14) | `sand-950` (`#1a1613`) como `surface-inverse` | `--color-sand-950` o `--surface-inverse` en `global.css` |

## Datos de contacto

Se completan en `contact`, en `src/lib/site.ts`. Los vacíos no se renderizan:
Contacto muestra solo los canales con datos, y el primero queda como botón
principal (orden: WhatsApp, email, Instagram).

| Falta | Issue | Formato | Qué se ve mientras tanto |
| --- | --- | --- | --- |
| **WhatsApp** | [#11](https://github.com/rhyon-team/rhyon-team.github.io/issues/11) | Internacional, sin `+` ni espacios: `598XXXXXXXX` | Nada: Instagram queda como botón principal |
| **Email** | [#15](https://github.com/rhyon-team/rhyon-team.github.io/issues/15) | `hola@dominio.com` | Nada: no aparece en Contacto ni en el footer |

El mensaje que se abre ya escrito en WhatsApp está en
`contact.whatsappMessage`.

## Producto propio

| Falta | Issue | Qué se usa mientras tanto | Dónde vive |
| --- | --- | --- | --- |
| Nombre, descripción y enlace | [#16](https://github.com/rhyon-team/rhyon-team.github.io/issues/16) | "Producto propio · Próximamente", sin nombre | `src/components/secciones/Producto.astro` |

## Imágenes

Las dos ya llevan el logo, pero con el rojo y la tipografía provisorios: se
regeneran al cerrar [#13](https://github.com/rhyon-team/rhyon-team.github.io/issues/13)
y [#14](https://github.com/rhyon-team/rhyon-team.github.io/issues/14).

| Archivo | Dónde se usa | Formato | Contenido actual |
| --- | --- | --- | --- |
| `public/og-image.png` | Preview al compartir (WhatsApp, LinkedIn, X). `site.ogImage` en `src/lib/site.ts`. | PNG o JPG, **1200×630**, < 300 KB | Isotipo, "RHYON" y "Software · IA · Consultoría" sobre crema, con una barra roja abajo |
| `public/favicon.svg` | Pestaña del navegador y `logo` del JSON-LD (`src/lib/seo.ts`). | SVG cuadrado, legible a 16 px | Isotipo crema sobre un cuadrado rojo Torino |

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

Si algo tiene que salir provisorio (una imagen, un dato, un texto):

1. Crear el placeholder con el nombre y el tamaño que va a tener el
   definitivo. Así, al reemplazarlo no hay que tocar código.
2. Usar los colores de los tokens, no un gris genérico ni una imagen de stock.
3. Si es una imagen, darle un `alt` real desde el principio.
4. Abrir un issue con los pasos para reemplazarlo y agregar su fila acá, con
   el enlace al issue.
