# RHYON — Landing page

Sitio institucional estático. Astro 7 + Tailwind 4 + React 19 (solo islas).

## Comandos

```bash
npm run dev       # servidor local, http://localhost:4321
npm run verify    # formato + lint + tipos + build (lo mismo que corre CI)
```

Correr `npm run verify` antes de dar por terminado un cambio. Si falla, el
trabajo no está listo.

## Prioridades del proyecto

En este orden, cuando haya que elegir:

1. **Legibilidad.** El código se lee muchas más veces de las que se escribe.
2. **Mantenibilidad.** Preferir la solución que sea fácil de cambiar dentro de
   seis meses, no la más corta de escribir hoy.
3. **Rendimiento.** Es una landing: la primera impresión es cuánto tarda en
   aparecer.

Cuando una solución "inteligente" y una obvia hacen lo mismo, va la obvia.

## Dirección visual

Minimalismo con intención, no minimalismo por ausencia. Mucho espacio en
blanco, poca decoración, jerarquía tipográfica clara. La interactividad se
siente pero no se anuncia: transiciones cortas, movimiento con propósito,
nunca animación que retrase la lectura.

El color de marca es el **rojo Torino** (`brand-800`, `#7c1d26`). Se usa con
moderación: acentos y acciones, no superficies grandes.

## Reglas innegociables

- **Los colores salen de los tokens.** Nunca un hex ni un `bg-[#...]` en un
  componente. Los tokens viven en `src/styles/tokens.css`.
- **Los componentes usan tokens semánticos**, no la paleta cruda: `bg-surface`
  en vez de `bg-cream`, `text-content` en vez de `text-sand-950`.
- **Astro por defecto, React solo con estado.** Un componente es `.astro`
  salvo que necesite estado o eventos del navegador.
- **El espaciado vertical va en `Section`.** No abrir secciones con `py-*`.
- **Nada se mergea a `main` sin pasar `npm run verify`.**

## Dónde está cada cosa

| Ruta                  | Qué contiene                                  |
| --------------------- | --------------------------------------------- |
| `src/styles/tokens.css` | Paleta, tipografía, sombras, radios         |
| `src/styles/global.css` | Capa semántica, estilos base, accesibilidad |
| `src/components/primitives/` | Button, Container, Section, Heading    |
| `src/components/layout/` | Header, Footer, MobileNav              |
| `src/lib/site.ts`     | Nombre, contacto, navegación, redes           |
| `/styleguide`         | Referencia viva del sistema de diseño         |

Los datos que se repiten entre páginas van en `src/lib/site.ts`, nunca
escritos en el markup.

## Flujo de trabajo

`main` siempre desplegable. El desarrollo va en ramas (`feat/`, `fix/`,
`style/`, `refactor/`, `chore/`, `docs/`) y entra por PR.

Commits en formato Conventional Commits, en español:
`feat: agregar seccion de servicios`

## Antes de escribir código nuevo

Revisar si ya existe un primitivo que resuelva el caso. Si hace falta uno
nuevo, va en `src/components/primitives/` y se agrega al `/styleguide`.

Al proponer un cambio grande, explicar el enfoque antes de escribirlo.

## Detalles del entorno

- Windows. Node 22.12+. La shell es PowerShell, pero hay Bash disponible.
- Tailwind **no resuelve clases interpoladas**: `` `bg-brand-${n}` `` no genera
  CSS. Usar mapas de clases completas.
- `jq` no está instalado.

Las reglas detalladas de estilo, componentes, diseño y accesibilidad están en
`.claude/rules/` y se cargan solas según los archivos que se estén tocando.
