# RHYON — Landing Page

Sitio web institucional de RHYON.

> **Estado:** estructura base. La landing todavia no fue construida.

## Stack

| Herramienta | Rol |
|---|---|
| [Astro](https://astro.build) | Framework. Genera HTML estatico, sin JS por defecto. |
| [Tailwind CSS](https://tailwindcss.com) v4 | Estilos por utilidades. |
| [React](https://react.dev) | Solo para componentes interactivos (islas). |
| GitHub Pages | Hosting. Deploy automatico via GitHub Actions. |

### Por que Astro y no una SPA

La landing es mayormente contenido estatico con partes interactivas puntuales
(carruseles, modales, formularios). Astro entrega HTML plano y carga React
unicamente en los componentes que lo necesitan. Esto da:

- Carga inicial rapida: el contenido se pinta sin esperar JavaScript.
- Previews correctos al compartir el link. WhatsApp, LinkedIn y X no ejecutan
  JS; leen el HTML inicial y sus meta tags.
- Sin renuncias: donde haga falta estado, se usa React normal.

## Requisitos

- Node.js 20 o superior
- npm

## Uso

```bash
npm install      # instalar dependencias
npm run dev      # servidor local en http://localhost:4321
npm run build    # build de produccion en dist/
npm run preview  # previsualizar el build local
```

## Estructura

```
.
├── .github/workflows/deploy.yml   Deploy automatico a GitHub Pages
├── public/                        Archivos servidos tal cual (favicon, imagenes)
├── src/
│   ├── components/                Componentes (.astro estaticos, .jsx interactivos)
│   ├── layouts/                   Layouts. Layout.astro tiene el <head> y el SEO
│   ├── pages/                     Cada archivo aca es una ruta del sitio
│   └── styles/global.css          Import de Tailwind y tokens de marca
├── astro.config.mjs               Configuracion de Astro
└── tsconfig.json
```

### Islas de React

Un componente `.jsx` es estatico salvo que se le indique cuando hidratarse:

```astro
---
import Carrusel from '../components/Carrusel.jsx';
---
<Carrusel client:visible />
```

Directivas disponibles:

| Directiva | Cuando carga |
|---|---|
| `client:load` | Inmediatamente. Para lo visible al entrar (ej. menu). |
| `client:visible` | Al entrar en pantalla. Ideal para carruseles abajo del fold. |
| `client:idle` | Cuando el navegador esta desocupado. Para lo no urgente. |
| `client:only="react"` | Solo en cliente, sin render estatico. |

Sin directiva, el componente se renderiza a HTML y no envia JavaScript.

## Deploy

Cada push a `main` dispara el workflow, que construye el sitio y lo publica.

- URL actual: https://rhyon-team.github.io

### Conectar un dominio propio

1. En el DNS del dominio:
   - Apex (`rhyon.com`): registros `A` a las IPs de GitHub Pages.
   - `www`: registro `CNAME` a `rhyon-team.github.io`.
2. En GitHub: **Settings → Pages → Custom domain**, escribir el dominio y guardar.
   Esto crea el archivo `public/CNAME` en el repo.
3. Activar **Enforce HTTPS** una vez que el certificado se emita (puede tardar
   hasta 24 h).
4. Actualizar `site` en `astro.config.mjs` al dominio nuevo.

Las IPs vigentes estan en la
[documentacion de GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Pendientes

- [ ] Definir identidad visual y cargar tokens en `src/styles/global.css`
- [ ] Construir la landing
- [ ] Reemplazar `public/favicon.svg` por el logo definitivo
- [ ] Agregar `public/og-image.png` (1200x630) para los previews al compartir
- [ ] Completar la descripcion por defecto en `src/layouts/Layout.astro`
- [ ] Borrar `src/components/EjemploIsla.jsx` y su uso en `src/pages/index.astro`
- [ ] Conectar el dominio propio

---

&copy; RHYON. Todos los derechos reservados.
