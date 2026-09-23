---
paths:
  - 'src/components/**'
  - 'src/layouts/**'
  - 'src/pages/**'
---

# Componentes

## Astro por defecto, React por excepción

Un componente es `.astro` salvo que necesite algo que solo existe en el
navegador: estado, eventos, timers, APIs del DOM.

| Necesidad                              | Solución            |
| -------------------------------------- | ------------------- |
| Mostrar contenido, layout, estilos     | `.astro`            |
| Hover, transiciones, animación         | CSS, `.astro`       |
| Acordeón, FAQ desplegable              | `<details>`, sin JS |
| Modal                                  | `<dialog>`, sin JS  |
| Carrusel simple                        | CSS `scroll-snap`   |
| Estado compartido, validación en vivo  | `.tsx` (isla React) |

Antes de crear una isla, verificar que el caso no se resuelva con HTML o CSS.
Cada isla suma JavaScript que el visitante descarga.

## Islas

Al usar un componente React desde un `.astro`, elegir la directiva según
cuándo se necesita realmente:

| Directiva             | Hidrata                        | Para                          |
| --------------------- | ------------------------------ | ----------------------------- |
| `client:load`         | Enseguida                      | Algo visible e inmediato      |
| `client:visible`      | Al entrar en pantalla          | Cualquier cosa bajo el fold   |
| `client:idle`         | Cuando el navegador se libera  | Secundario, no urgente        |
| `client:media="..."`  | Si matchea el media query      | Solo en un tamaño de pantalla |
| `client:only="react"` | Solo en cliente                | Si usa `window` al renderizar |

`client:visible` es el default razonable. `client:load` solo si el componente
está en el primer viewport y la interacción tiene que estar disponible ya.

Un componente React sin directiva se renderiza a HTML y no envía JavaScript:
es una forma válida de reusar un `.tsx` sin costo.

## Props

Siempre tipadas. Valores por defecto en la desestructuración, no con `||`
adentro del cuerpo.

```astro
---
interface Props {
  titulo: string;
  tono?: 'claro' | 'oscuro';
  class?: string;
}

const { titulo, tono = 'claro', class: className } = Astro.props;
---
```

Todo componente visual acepta `class` y la combina con `cn()`. Sin eso, quien
lo use no puede ajustar el espaciado desde afuera y termina envolviéndolo en un
`div` extra.

Para un tag dinámico (`as`), tipar con una unión de literales. Un `string`
suelto rompe el chequeo de tipos de Astro.

## Composición

Preferir `<slot />` sobre props que reciben markup. El consumidor arma el
contenido y el componente define la estructura.

```astro
<!-- mal: el texto llega como dato y no admite formato -->
<Tarjeta titulo="Servicios" descripcion="Texto largo..." />

<!-- bien: la tarjeta define la forma, el consumidor el contenido -->
<Tarjeta>
  <h3>Servicios</h3>
  <p>Texto largo con <strong>énfasis</strong>.</p>
</Tarjeta>
```

Para varias zonas, usar slots con nombre.

## Primitivos

`Button`, `Container`, `Section` y `Heading` son la base. Antes de escribir un
componente nuevo, revisar si alguno resuelve el caso.

Un primitivo nuevo va en `src/components/primitives/`, es genérico (no sabe
nada del contenido de la landing) y se agrega al `/styleguide`.

Los componentes con contenido específico de una sección van en
`src/components/` directamente, no en `primitives/`.

## Contenido

Nada de texto repetido entre páginas escrito a mano. Nombre de la empresa,
contacto, navegación y redes salen de `src/lib/site.ts`.

```astro
<!-- mal -->
<p>Escribinos a hola@rhyon.com</p>

<!-- bien -->
<p>Escribinos a {contact.email}</p>
```

## Páginas

Una página arma secciones; no define estilos propios ni lógica de
presentación. Si una página acumula markup, ese markup es un componente que
todavía no se extrajo.

Toda página usa `BaseLayout` y le pasa `title` y `description` propios. Sin
eso, hereda los genéricos y el preview al compartir queda igual en todas.
