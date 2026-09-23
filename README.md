# RHYON — Landing Page

Sitio web institucional de RHYON.

**Producción:** https://rhyon-team.github.io
**Sistema de diseño:** https://rhyon-team.github.io/styleguide

> **Estado:** boilerplate completo. La landing todavía no fue construida — la
> home es un marcador de posición.

---

## Stack

| Herramienta                                   | Rol                                                   |
| --------------------------------------------- | ----------------------------------------------------- |
| [Astro](https://astro.build) 7                | Framework. Genera HTML estático, sin JS por defecto.  |
| [Tailwind CSS](https://tailwindcss.com) 4     | Estilos por utilidades, sobre tokens propios.         |
| [React](https://react.dev) 19                 | Solo para componentes interactivos (islas).           |
| TypeScript                                    | Tipado en config, utilidades e islas.                 |
| ESLint + Prettier                             | Lint (con reglas de accesibilidad) y formato.         |
| GitHub Actions                                | CI en cada PR y deploy automático a Pages.            |

### Por qué Astro y no una SPA

La landing es mayormente contenido estático con interactividad puntual. Astro
entrega HTML plano y carga React únicamente en los componentes que lo piden:

- **Carga rápida:** el contenido se pinta sin esperar JavaScript.
- **Previews correctos al compartir:** WhatsApp, LinkedIn y X no ejecutan JS;
  leen el HTML inicial y sus meta tags.
- **Sin renuncias:** donde haga falta estado, se usa React normal.

---

## Empezar

Requiere **Node.js 22.12 o superior**.

```bash
npm install
npm run dev      # http://localhost:4321
```

### Comandos

| Comando                | Qué hace                                          |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo con recarga en caliente.   |
| `npm run build`        | Build de producción en `dist/`.                   |
| `npm run preview`      | Sirve el build local para revisarlo.              |
| `npm run check`        | Verifica tipos en `.astro`, `.ts` y `.tsx`.       |
| `npm run lint`         | ESLint, incluye reglas de accesibilidad.          |
| `npm run lint:fix`     | Corrige lo corregible automáticamente.            |
| `npm run format`       | Formatea con Prettier.                            |
| `npm run verify`       | Formato + lint + tipos + build. Lo mismo que CI.  |

Correr `npm run verify` antes de abrir un PR: si pasa local, pasa en CI.

---

## Sistema de diseño

### Paleta — Rojo Torino

El color de marca es el **granata del Torino FC**: un rojo profundo y cálido.
Está declarado como escala completa en `src/styles/tokens.css`.

| Token         | Hex       | Uso                                    |
| ------------- | --------- | -------------------------------------- |
| `brand-800`   | `#7c1d26` | **Color del logo.** Acciones primarias. |
| `brand-50…200`| claros    | Fondos teñidos, superficies suaves.    |
| `brand-300…600`| medios   | Estados hover, detalles, acentos.      |
| `brand-900…950`| oscuros  | Texto sobre fondo claro, sombras.      |

Los neutros son **grises cálidos** (`sand-*`) con base beige, más `cream` como
fondo de página. Un gris frío junto al granata se percibe apagado; el cálido lo
acompaña.

> El valor definitivo del logo está pendiente de confirmación. Al llegar, se
> cambia `--color-brand-800` y se reajusta la rampa alrededor.

### Tokens semánticos

Los componentes **no usan la paleta cruda**. Usan una capa semántica que se
adapta sola al tema:

| Token               | Significado                        |
| ------------------- | ---------------------------------- |
| `bg-surface`        | Fondo de página                    |
| `bg-surface-raised` | Tarjetas, elementos elevados       |
| `bg-surface-sunken` | Secciones alternas                 |
| `text-content`      | Texto principal                    |
| `text-content-muted`| Texto secundario                   |
| `bg-accent`         | Acción principal (el granata)      |
| `border-line`       | Bordes                             |

Hay modo oscuro preparado a nivel de tokens: sigue la preferencia del sistema y
puede forzarse con `data-theme="dark"` en `<html>`. El sitio nace en claro.

### Tipografía

- **Fraunces** (serif variable) para títulos — carácter editorial, acompaña al granata.
- **Inter** para texto — legible en tamaños chicos y párrafos largos.

Ambas se sirven desde el propio dominio vía `@fontsource`, no desde un CDN
externo: sin conexión a terceros y sin salto de fuente al cargar.

### Referencia viva

`/styleguide` muestra paleta, escala tipográfica, botones, sombras y radios,
generados desde los tokens reales. Nunca queda desactualizada. Está excluida de
buscadores y del sitemap.

---

## Estructura

```
.
├── .github/
│   ├── workflows/ci.yml        Formato, lint, tipos y build en cada PR
│   ├── workflows/deploy.yml    Deploy a GitHub Pages al mergear a main
│   └── pull_request_template.md
├── public/                     Servido tal cual (favicon, robots.txt, imágenes)
├── src/
│   ├── components/
│   │   ├── layout/             Header, Footer, MobileNav (isla React)
│   │   ├── primitives/         Button, Container, Section, Heading
│   │   └── seo/                SEO (meta tags + JSON-LD)
│   ├── layouts/BaseLayout.astro
│   ├── lib/
│   │   ├── cn.ts               Combina clases, resuelve conflictos de Tailwind
│   │   ├── site.ts             Config central: nombre, contacto, navegación
│   │   └── seo.ts              Datos estructurados y plantilla de título
│   ├── pages/                  Cada archivo es una ruta
│   └── styles/
│       ├── tokens.css          Paleta, tipografía, sombras, radios
│       └── global.css          Capa semántica, base, accesibilidad
├── astro.config.mjs
├── eslint.config.js
└── CONTRIBUTING.md             Flujo de branches y reglas del sistema
```

Los datos que se repiten entre páginas (nombre, contacto, navegación, redes)
viven en **`src/lib/site.ts`**, no escritos en el markup.

---

## Cómo trabajar

`main` siempre debe estar desplegable: cada commit que llega ahí se publica.
El desarrollo va en branches.

```bash
git switch -c feat/hero-section
# ... trabajar ...
npm run verify
git push -u origin feat/hero-section
gh pr create --fill
```

Las convenciones completas —nombres de rama, commits, cuándo usar React,
reglas del sistema de diseño— están en **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

---

## Deploy

Cada merge a `main` dispara el workflow, que construye y publica el sitio.

### Conectar un dominio propio

1. En el DNS del dominio:
   - Apex (`rhyon.com`): registros `A` a las IPs de GitHub Pages.
   - `www`: registro `CNAME` a `rhyon-team.github.io`.
2. En GitHub: **Settings → Pages → Custom domain**, escribir el dominio y guardar.
3. Activar **Enforce HTTPS** cuando el certificado se emita (puede tardar hasta 24 h).
4. Actualizar `site` en `astro.config.mjs` y `site.url` en `src/lib/site.ts`.

Las IPs vigentes están en la
[documentación de GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## Pendientes

- [ ] Confirmar el hex exacto del logo y ajustar `--color-brand-800`
- [ ] Completar `src/lib/site.ts`: descripción, contacto, redes, navegación
- [ ] Reemplazar `public/favicon.svg` por el logo definitivo
- [ ] Agregar `public/og-image.png` (1200×630) para los previews al compartir
- [ ] Construir la landing
- [ ] Conectar el dominio propio

---

&copy; RHYON. Todos los derechos reservados.
