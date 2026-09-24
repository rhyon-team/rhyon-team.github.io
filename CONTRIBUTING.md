# Guia de trabajo

## Flujo por branches

Hay dos ramas fijas, y ninguna acepta pushes directos:

- `main` es produccion: cada commit que llega ahi se publica automaticamente.
- `dev` es integracion: ahi se juntan los cambios antes de publicarlos.

```bash
git switch dev && git pull         # partir de dev actualizada
git switch -c feat/hero-section    # crear la rama
# ... trabajar ...
npm run verify                     # antes de pushear
git push -u origin feat/hero-section
gh pr create --fill --base dev     # abrir el PR hacia dev
```

El PR a `dev` se mergea con **squash**: cada rama queda como un commit.

Para publicar, se abre un PR de `dev` a `main` y se mergea con **merge
commit**. Nunca squash: `main` tendria commits que `dev` no tiene, y el
siguiente PR arrastraria cambios viejos o conflictos. CI rechaza cualquier PR
a `main` que no venga de `dev`.

### Nombres de rama

| Prefijo     | Para que                                  | Ejemplo                    |
| ----------- | ----------------------------------------- | -------------------------- |
| `feat/`     | Funcionalidad o seccion nueva             | `feat/hero-section`        |
| `fix/`      | Correccion de un problema                 | `fix/nav-mobile-overflow`  |
| `style/`    | Cambios visuales sin cambio de logica     | `style/ajuste-espaciados`  |
| `refactor/` | Reorganizacion sin cambio de resultado    | `refactor/extraer-card`    |
| `chore/`    | Dependencias, configuracion, tooling      | `chore/actualizar-astro`   |
| `docs/`     | Documentacion                             | `docs/guia-de-marca`       |

### Mensajes de commit

Formato [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agregar seccion de servicios
fix: corregir desborde del menu en iOS
chore: actualizar Astro a 7.4
```

Un commit por cambio con sentido propio. El mensaje explica **que** cambia y,
si no es evidente, **por que**.

## Antes de abrir un PR

```bash
npm run verify
```

Encadena formato, lint, tipos y build. Es exactamente lo que corre CI, asi que
si pasa local, pasa en el PR.

Para corregir automaticamente lo corregible:

```bash
npm run format
npm run lint:fix
```

## Sistema de diseño

Hay reglas que conviene no romper, porque son las que mantienen el sitio
coherente a medida que crece.

**Los colores salen de los tokens.** Nunca un hex suelto en un componente.

```astro
<!-- mal -->
<div class="bg-[#7c1d26]">

<!-- bien -->
<div class="bg-accent">
```

**Usar los tokens semanticos, no la paleta cruda.** `bg-surface` en vez de
`bg-cream`, `text-content` en vez de `text-sand-950`. Los semanticos se adaptan
solos al tema; los crudos no.

**Tailwind no resuelve clases armadas por interpolacion.** Analiza el codigo
como texto, asi que una clase construida en tiempo de ejecucion no se genera.

```jsx
// mal: la clase no existe en el CSS final
<div className={`bg-brand-${step}`} />

// bien: mapa de clases completas
const colores = { 800: 'bg-brand-800', 900: 'bg-brand-900' };
<div className={colores[step]} />
```

**El espaciado vertical va en `Section`.** No abrir secciones con `py-*` suelto:
rompe el ritmo del sitio.

**Para combinar clases, usar `cn()`.** Resuelve conflictos de Tailwind; una
concatenacion con template string no.

## Cuando usar React

Por defecto un componente es `.astro` y no envia JavaScript. Solo se pasa a
React (`.tsx`) cuando hace falta estado o eventos: carrusel, acordeon, menu,
formulario con validacion en vivo.

Al usar una isla, elegir la directiva segun cuando se necesita:

| Directiva             | Cuando hidrata                | Caso tipico                   |
| --------------------- | ----------------------------- | ----------------------------- |
| `client:load`         | Enseguida                     | Menu del header               |
| `client:visible`      | Al entrar en pantalla         | Carrusel abajo del fold       |
| `client:idle`         | Cuando el navegador se libera | Widget secundario             |
| `client:media="..."`  | Si matchea el media query     | Menu solo en mobile           |
| `client:only="react"` | Solo en cliente, sin SSR      | Componente que usa `window`   |

`client:visible` es el default razonable para casi todo lo que no esta en el
primer viewport.

## Estructura

```
src/
├── components/
│   ├── layout/       Header, Footer, MobileNav
│   ├── primitives/   Button, Card, Container, Eyebrow, Heading, Section
│   ├── secciones/    Hero, Servicios, Contacto
│   └── seo/          SEO
├── layouts/          BaseLayout
├── lib/              cn, site (config), seo
├── pages/            Cada archivo es una ruta
└── styles/           tokens.css (paleta), global.css (base y semantica)
```

Los datos que se repiten entre paginas (nombre, contacto, navegacion, redes)
viven en `src/lib/site.ts`, no escritos en el markup.

## Ver el sistema de diseño

```bash
npm run dev
```

`/styleguide` muestra la paleta, la escala tipografica y los componentes. Se
genera desde los tokens reales, asi que nunca queda desactualizada. Esta
excluida de buscadores y del sitemap.
