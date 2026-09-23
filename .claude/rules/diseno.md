---
paths:
  - 'src/**/*.astro'
  - 'src/**/*.tsx'
  - 'src/**/*.css'
---

# Sistema de diseño

## Minimalismo con intención

Minimalista no significa vacío ni aburrido. Significa que **todo lo que está,
está por una razón**, y que la atención va donde tiene que ir.

En la práctica:

- **Espacio antes que líneas.** Separar secciones con aire, no con bordes.
  Un `<hr>` casi siempre indica que falta espaciado.
- **Una jerarquía por pantalla.** Un solo elemento dominante. Si todo grita,
  no se escucha nada.
- **El color acentúa, no decora.** El rojo Torino marca acciones y acentos. Como
  superficie grande abruma y pierde fuerza.
- **Máximo dos pesos tipográficos visibles** por sección.
- **Menos bordes, más contraste de superficie.** `bg-surface-sunken` separa
  mejor que una línea.

Antes de agregar un elemento decorativo, preguntarse qué comunica. Si no
comunica nada, no va.

## Interactividad

El sitio tiene que sentirse vivo al usarlo, sin distraer de la lectura.

- **Todo lo clickeable responde.** Hover, focus y active visibles. Un botón
  que no reacciona se siente roto.
- **Transiciones cortas:** 150–250 ms. Más lento se siente pesado; sin
  transición se siente brusco.
- **Animar solo `transform` y `opacity`.** Animar `width`, `height`, `top` o
  `margin` fuerza reflow y produce saltos.
- **Movimiento con dirección.** Entrar desde donde el contenido "viene", no
  aparecer desde cualquier lado.
- **La entrada por scroll es sutil:** un desplazamiento de 8–16 px y opacidad.
  Nada que obligue a esperar para leer.

Usar las curvas del sistema (`--ease-out-quint`, `--ease-out-expo`), que
arrancan rápido y frenan suave. `ease-in-out` se siente artificial en UI.

`prefers-reduced-motion` ya está contemplado en `global.css`. No hace falta
repetirlo por componente.

## Colores

Nunca un valor literal. Siempre un token.

```astro
<!-- mal -->
<div class="bg-[#7c1d26]">
<div class="text-red-800">

<!-- bien -->
<div class="bg-accent">
```

Usar la capa semántica, no la paleta cruda:

| Usar                 | En vez de       | Para                       |
| -------------------- | --------------- | -------------------------- |
| `bg-surface`         | `bg-cream`      | Fondo de página            |
| `bg-surface-raised`  | `bg-white`      | Tarjetas                   |
| `bg-surface-sunken`  | `bg-sand-100`   | Secciones alternas         |
| `text-content`       | `text-sand-950` | Texto principal            |
| `text-content-muted` | `text-sand-700` | Texto secundario           |
| `bg-accent`          | `bg-brand-800`  | Acciones y acentos         |
| `border-line`        | `border-sand-200` | Bordes                   |

Los semánticos se adaptan solos al tema; los crudos no. La paleta cruda
(`brand-*`, `sand-*`) se usa solo al definir tokens nuevos o en el styleguide.

Si hace falta un color que no existe, se agrega como token en `tokens.css`, no
como valor suelto en el componente.

## Espaciado

El ritmo vertical lo define `Section` con su prop `spacing`. No abrir una
sección con `py-*` suelto: rompe la consistencia entre secciones.

El ancho lo define `Container` con su prop `size`. No poner `max-w-*` a mano.

Dentro de un bloque, preferir `space-y-*` o `gap-*` sobre márgenes sueltos: el
espaciado queda declarado en el contenedor y no disperso en cada hijo.

## Tipografía

`font-display` (Fraunces) para títulos, `font-sans` (Inter) para el resto. No
mezclar.

Los tamaños de título salen de la escala `text-display-*` vía el componente
`Heading`. El tamaño visual es independiente del nivel semántico: un `h2` puede
verse grande sin romper la jerarquía del documento.

El texto largo va en `Container size="narrow"` para no pasar de unos 65
caracteres por línea.

## Combinar clases

Siempre con `cn()`. Resuelve los conflictos de Tailwind; una concatenación con
template string no.

```astro
<!-- mal: quedan las dos clases y gana la del CSS, no la intención -->
<div class={`px-4 ${className}`}>

<!-- bien -->
<div class={cn('px-4', className)}>
```

## Clases interpoladas

Tailwind analiza el código como texto. Una clase construida en tiempo de
ejecución no existe en el CSS final.

```tsx
// mal: no se genera ninguna clase
<div className={`bg-brand-${paso}`} />

// bien: mapa de clases completas
const fondos = { 800: 'bg-brand-800', 900: 'bg-brand-900' };
<div className={fondos[paso]} />
```

## Responsive

Mobile primero: las utilidades sin prefijo son el estado base, y los breakpoints
(`sm:`, `md:`, `lg:`) agregan desde ahí.

Probar siempre a 360 px de ancho. Es donde aparecen los desbordes.

## Después de un cambio visual

Si se agrega un primitivo o un token, reflejarlo en `/styleguide`. Esa página
es la referencia del sistema y pierde valor si queda desactualizada.
