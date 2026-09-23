---
paths:
  - 'src/**/*.astro'
  - 'src/**/*.tsx'
---

# Accesibilidad

No es una capa que se agrega después. Sale gratis si se usa HTML correcto, y
cuesta caro si hay que reparar una estructura mal armada.

## HTML semántico primero

El elemento correcto trae teclado, foco y lectores de pantalla ya resueltos.

```astro
<!-- mal: no es focusable, no responde a Enter, no se anuncia como botón -->
<div onclick="abrir()">Abrir</div>

<!-- bien -->
<button type="button" onclick="abrir()">Abrir</button>
```

`<button>` para acciones, `<a>` para navegación. Si al hacer click cambia la
URL, es un enlace; si no, es un botón.

Usar `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>` según corresponda.
Un `<div>` no aporta estructura a quien navega por landmarks.

## Jerarquía de títulos

Un solo `<h1>` por página. Los niveles bajan de a uno, sin saltos: después de
un `h2` viene `h3`, no `h5`.

El tamaño visual es independiente del nivel. Para un `h2` que se vea grande,
el componente `Heading` separa ambas cosas:

```astro
<Heading as="h2" size="lg">Servicios</Heading>
```

## Nombre accesible

Todo control interactivo tiene que anunciarse con algo.

```astro
<!-- mal: un lector de pantalla anuncia "botón", sin más -->
<button><svg>...</svg></button>

<!-- bien -->
<button aria-label="Cerrar menú">
  <svg aria-hidden="true">...</svg>
</button>
```

Los íconos decorativos llevan `aria-hidden="true"`: si el texto ya dice lo
mismo, el ícono repetido solo agrega ruido.

## Imágenes

Toda `<img>` lleva `alt`. Si es decorativa, `alt=""` — vacío, no ausente. Un
`alt` faltante hace que el lector lea el nombre del archivo.

El `alt` describe la función de la imagen en el contexto, no lo que se ve.

## Teclado

Todo lo que se puede hacer con mouse se tiene que poder hacer con teclado.

- Tab llega a todos los controles, en un orden que sigue la lectura.
- Enter y Espacio activan los botones (gratis si es un `<button>`).
- Escape cierra lo que se abre: menús, modales, desplegables.
- El foco no se pierde: al abrir un modal entra adentro, al cerrarlo vuelve al
  control que lo abrió.

Nunca `outline: none` sin reemplazo. El foco visible ya está definido en
`global.css`; no hace falta redefinirlo por componente.

Evitar `tabindex` positivo. Si el orden de tabulación está mal, el orden del
DOM está mal.

## Estado dinámico

Un control que abre o cierra algo declara su estado:

```tsx
<button aria-expanded={abierto} aria-controls="menu-movil">
```

Los cambios que ocurren sin interacción directa (un mensaje de éxito, un error
de validación) van en una región con `aria-live` para que se anuncien.

## Contraste

Texto normal: mínimo 4.5:1 contra su fondo. Texto grande (más de 24 px o 19 px
en negrita): 3:1.

Los tokens semánticos del sistema ya cumplen. Al combinar colores fuera de esos
pares, verificar el contraste antes de darlo por bueno.

El color nunca es el único indicador: un error en rojo también necesita texto
o ícono.

## Movimiento

`prefers-reduced-motion` ya está contemplado en `global.css`. No repetirlo por
componente, pero sí evitar animaciones que no se puedan desactivar por CSS
(por ejemplo, movimiento hecho con JavaScript sin chequear la preferencia).

## Verificación rápida

Antes de dar por terminada una sección:

1. Recorrerla entera con Tab. ¿Se llega a todo? ¿Se ve dónde está el foco?
2. ¿Los títulos bajan de nivel sin saltos?
3. ¿Las imágenes tienen `alt`?
4. ¿Los botones con solo ícono tienen `aria-label`?

`npm run lint` cubre parte de esto con las reglas de `jsx-a11y`, pero no
reemplaza recorrer la página con el teclado.
